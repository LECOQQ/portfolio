#!/usr/bin/env node

import path from 'node:path'
import { mkdir, readdir, rm, stat } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'
import {
  responsiveImageConfig,
  responsiveImageWidths,
} from '../config/responsive-images.mjs'

const RASTER_EXTENSIONS = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp'])

async function findRasterImages(directory, excludedDirectory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const images = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      if (path.resolve(entryPath) !== path.resolve(excludedDirectory)) {
        images.push(...(await findRasterImages(entryPath, excludedDirectory)))
      }
      continue
    }

    if (RASTER_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      images.push(entryPath)
    }
  }

  return images.sort()
}

function getVariantPath(sourcePath, sourceRoot, outputRoot, width) {
  const relativeSourcePath = path.relative(sourceRoot, sourcePath)
  const parsedPath = path.parse(relativeSourcePath)

  return path.join(
    outputRoot,
    parsedPath.dir,
    `${parsedPath.name}-w${width}.webp`,
  )
}

function validateOptions({ widths, quality, maxVariantBytes }) {
  if (
    widths.length === 0 ||
    widths.some((width) => !Number.isInteger(width) || width <= 0)
  ) {
    throw new Error('Responsive image widths must be positive integers.')
  }

  if (!Number.isInteger(quality) || quality < 1 || quality > 100) {
    throw new Error(
      'Responsive image quality must be an integer from 1 to 100.',
    )
  }

  if (!Number.isInteger(maxVariantBytes) || maxVariantBytes <= 0) {
    throw new Error('Responsive image byte budget must be a positive integer.')
  }
}

export async function generateResponsiveImages({
  sourceRoot,
  outputRoot,
  widths,
  quality,
  maxVariantBytes,
}) {
  validateOptions({ widths, quality, maxVariantBytes })

  await rm(outputRoot, { recursive: true, force: true })

  let sources
  try {
    sources = await findRasterImages(sourceRoot, outputRoot)
  } catch (error) {
    throw new Error(
      `Unable to read responsive image sources from ${sourceRoot}.`,
      { cause: error },
    )
  }

  if (sources.length === 0) {
    throw new Error(`No raster image found in ${sourceRoot}.`)
  }

  const generatedPaths = new Set()
  let generatedCount = 0

  for (const sourcePath of sources) {
    let metadata
    try {
      metadata = await sharp(sourcePath).metadata()
    } catch (error) {
      throw new Error(
        `Unable to inspect responsive image source ${sourcePath}.`,
        {
          cause: error,
        },
      )
    }

    if (!metadata.width || !metadata.height) {
      throw new Error(
        `Responsive image source has no dimensions: ${sourcePath}.`,
      )
    }

    for (const width of widths) {
      const variantPath = getVariantPath(
        sourcePath,
        sourceRoot,
        outputRoot,
        width,
      )

      if (generatedPaths.has(variantPath)) {
        throw new Error(
          `Responsive image output collision detected: ${variantPath}.`,
        )
      }
      generatedPaths.add(variantPath)

      await mkdir(path.dirname(variantPath), { recursive: true })

      try {
        await sharp(sourcePath)
          .resize({ width })
          .webp({ quality, effort: 4, smartSubsample: true })
          .toFile(variantPath)
      } catch (error) {
        throw new Error(
          `Unable to generate ${width}px responsive variant for ${sourcePath}.`,
          { cause: error },
        )
      }

      const variantStats = await stat(variantPath)
      if (variantStats.size > maxVariantBytes) {
        throw new Error(
          `Responsive image exceeds the ${maxVariantBytes}-byte budget: ${variantPath} (${variantStats.size} bytes).`,
        )
      }

      generatedCount += 1
    }
  }

  return { sourceCount: sources.length, generatedCount }
}

async function main() {
  const projectRoot = process.cwd()
  const sourceRoot = path.resolve(
    projectRoot,
    responsiveImageConfig.sourceDirectory,
  )
  const outputRoot = path.resolve(
    projectRoot,
    responsiveImageConfig.outputDirectory,
  )
  const result = await generateResponsiveImages({
    sourceRoot,
    outputRoot,
    widths: responsiveImageWidths,
    quality: responsiveImageConfig.quality,
    maxVariantBytes: responsiveImageConfig.maxVariantBytes,
  })

  process.stdout.write(
    `Generated ${result.generatedCount} responsive variants from ${result.sourceCount} images (${responsiveImageWidths.join(', ')}px).\n`,
  )
}

const isExecutedDirectly =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href

if (isExecutedDirectly) {
  main().catch((error) => {
    const message = error instanceof Error ? error.message : String(error)
    process.stderr.write(`Responsive image generation failed: ${message}\n`)
    process.exitCode = 1
  })
}
