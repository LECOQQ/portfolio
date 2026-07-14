import path from 'node:path'
import { mkdtemp, mkdir, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import sharp from 'sharp'
import { afterEach, describe, expect, it } from 'vitest'
import responsiveImageLoader from '@/lib/responsive-image-loader'
import { generateResponsiveImages } from '../../scripts/generate-responsive-images.mjs'

const temporaryDirectories = []

async function createFixture() {
  const fixtureRoot = await mkdtemp(path.join(tmpdir(), 'portfolio-images-'))
  temporaryDirectories.push(fixtureRoot)

  const sourceRoot = path.join(fixtureRoot, 'sources')
  const outputRoot = path.join(sourceRoot, 'generated')
  const sourcePath = path.join(sourceRoot, 'articles', 'cover.webp')
  await mkdir(path.dirname(sourcePath), { recursive: true })
  await sharp({
    create: {
      width: 1000,
      height: 500,
      channels: 3,
      background: '#20231f',
    },
  })
    .webp()
    .toFile(sourcePath)

  return { sourceRoot, outputRoot }
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  )
})

describe('responsive images', () => {
  it('generates the configured local WebP variants', async () => {
    const { sourceRoot, outputRoot } = await createFixture()

    await expect(
      generateResponsiveImages({
        sourceRoot,
        outputRoot,
        widths: [384, 640, 960],
        quality: 80,
        maxVariantBytes: 120 * 1024,
      }),
    ).resolves.toEqual({ sourceCount: 1, generatedCount: 3 })

    for (const width of [384, 640, 960]) {
      const variantPath = path.join(
        outputRoot,
        'articles',
        `cover-w${width}.webp`,
      )
      const metadata = await sharp(variantPath).metadata()
      expect(metadata.width).toBe(width)
      await expect(stat(variantPath)).resolves.toBeDefined()
    }
  })

  it('fails with an actionable error when a variant exceeds its budget', async () => {
    const { sourceRoot, outputRoot } = await createFixture()

    await expect(
      generateResponsiveImages({
        sourceRoot,
        outputRoot,
        widths: [384],
        quality: 80,
        maxVariantBytes: 1,
      }),
    ).rejects.toThrow('Responsive image exceeds the 1-byte budget')
  })

  it('maps only local raster sources to generated variants', () => {
    expect(
      responsiveImageLoader({
        src: '/images/projects/homelab/homelab.webp',
        width: 640,
        quality: 80,
      }),
    ).toBe('/images/generated/projects/homelab/homelab-w640.webp')
    expect(
      responsiveImageLoader({
        src: '/images/about/mesh-balise.svg',
        width: 640,
        quality: 80,
      }),
    ).toBe('/images/about/mesh-balise.svg')
    expect(
      responsiveImageLoader({
        src: 'https://example.com/cover.webp',
        width: 640,
        quality: 80,
      }),
    ).toBe('https://example.com/cover.webp')
  })
})
