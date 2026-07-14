import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse as parseYaml } from 'yaml'
import {
  blogFrontmatterSchema,
  parseFrontmatter,
  type BlogPostType,
  type CoverFocus,
} from '@/lib/content-frontmatter'
import { estimateReadingTime } from '@/lib/reading-time'
import { BLOG_POST_TYPE_LABELS } from '@/features/blog/application/post-types'

const CONTENT_DIR = join(process.cwd(), 'content/blog')

export type BlogPost = {
  slug: string
  type: BlogPostType
  typeLabel: string
  title: string
  description: string
  cover?: string | undefined
  coverAlt?: string | undefined
  coverFocus?: CoverFocus | undefined
  publishedAt: string
  publishedAtLabel: string
  readingTimeLabel: string
  tags: string[]
  meta: string
}

export function getBlogPosts(): BlogPost[] {
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
        blogFrontmatterSchema,
        rawFrontmatter,
        `content/blog/${file}`,
      )
      const readingTime = estimateReadingTime(source)
      const dateLabel = new Date(frontmatter.publishedAt).toLocaleDateString(
        'fr-FR',
        { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' },
      )

      return {
        slug,
        type: frontmatter.type,
        typeLabel: BLOG_POST_TYPE_LABELS[frontmatter.type],
        title: frontmatter.title,
        description: frontmatter.description,
        cover: frontmatter.cover,
        coverAlt: frontmatter.coverAlt,
        coverFocus: frontmatter.coverFocus,
        publishedAt: frontmatter.publishedAt,
        publishedAtLabel: dateLabel,
        readingTimeLabel: readingTime.label,
        tags: frontmatter.tags,
        meta: `${dateLabel} · ${readingTime.minutes} min`,
      }
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug)
}

export function getAdjacentBlogPosts(slug: string): {
  previous: BlogPost | undefined
  next: BlogPost | undefined
} {
  const posts = getBlogPosts()
  const currentIndex = posts.findIndex((post) => post.slug === slug)

  if (currentIndex === -1) {
    return { previous: undefined, next: undefined }
  }

  return {
    // Posts are sorted from newest to oldest: the older post follows the
    // current one in the collection, while the newer post precedes it.
    previous: posts[currentIndex + 1],
    next: posts[currentIndex - 1],
  }
}

export function getRecentPostPreviews(limit = 3): BlogPost[] {
  return getBlogPosts().slice(0, limit)
}
