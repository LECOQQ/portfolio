import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse as parseYaml } from 'yaml'
import {
  projectFrontmatterSchema,
  parseFrontmatter,
  type CoverFocus,
  type ProjectStatus,
  type ProjectType,
} from '@/lib/content-frontmatter'
import { prepareProjectStack } from '@/features/projects/application/tech-catalog'
import { PROJECT_TYPE_LABELS } from '@/features/projects/application/project-types'

const CONTENT_DIR = join(process.cwd(), 'content/projects')

export type Project = {
  slug: string
  title: string
  description: string
  cover?: string | undefined
  coverAlt?: string | undefined
  coverFocus?: CoverFocus | undefined
  publishedAt: string
  publishedAtLabel: string
  stack: string[]
  type: ProjectType
  typeLabel: string
  status: ProjectStatus
  statusLabel?: string | undefined
  featured: boolean
  spotlight: boolean
  link?: string | undefined
}

export function getProjects(): Project[] {
  let files: string[]
  try {
    files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'))
  } catch {
    return []
  }

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const source = readFileSync(join(CONTENT_DIR, file), 'utf8')
      const yamlBlock = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
      const rawFrontmatter = parseYaml(yamlBlock)
      const frontmatter = parseFrontmatter(
        projectFrontmatterSchema,
        rawFrontmatter,
        `content/projects/${file}`,
      )
      const dateLabel = new Date(frontmatter.publishedAt).toLocaleDateString(
        'fr-FR',
        { month: 'long', year: 'numeric', timeZone: 'UTC' },
      )

      return {
        slug,
        title: frontmatter.title,
        description: frontmatter.description,
        cover: frontmatter.cover,
        coverAlt: frontmatter.coverAlt,
        coverFocus: frontmatter.coverFocus,
        publishedAt: frontmatter.publishedAt,
        publishedAtLabel: dateLabel,
        stack: prepareProjectStack(
          frontmatter.stack,
          `content/projects/${file}`,
        ),
        type: frontmatter.type,
        typeLabel: PROJECT_TYPE_LABELS[frontmatter.type],
        status: frontmatter.status,
        statusLabel: frontmatter.statusLabel,
        featured: frontmatter.featured,
        spotlight: frontmatter.spotlight,
        link: frontmatter.link,
      }
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug)
}

/**
 * Projects to highlight on the home dashboard. Curated via `featured` in
 * frontmatter rather than recency, so an older project can stay pinned
 * while newer, less noteworthy ones don't bump it off the card.
 */
export function getFeaturedProjects(limit = 2): Project[] {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, limit)
}
