import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/features/blog/application/posts'
import { getProjects } from '@/features/projects/application/projects'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

const routes = [
  { path: '/', changeFrequency: 'monthly', priority: 1 },
  { path: '/about/', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/projects/', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/blog/', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/contact/', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/cv', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy/', changeFrequency: 'yearly', priority: 0.3 },
  ...getBlogPosts().map(({ slug }) => ({
    path: `/blog/${slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })),
  ...getProjects().map(({ slug }) => ({
    path: `/projects/${slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })),
] as const

type SitemapPath = string

function getLastModifiedByPath(): Record<SitemapPath, string> {
  const value = process.env.SITEMAP_LASTMOD_JSON

  if (!value) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'SITEMAP_LASTMOD_JSON is required for a production sitemap build.',
      )
    }

    const now = new Date().toISOString()
    return Object.fromEntries(routes.map(({ path }) => [path, now])) as Record<
      SitemapPath,
      string
    >
  }

  const parsed = JSON.parse(value) as Partial<Record<SitemapPath, unknown>>

  return Object.fromEntries(
    routes.map(({ path }) => {
      const lastModified = parsed[path]
      if (
        typeof lastModified !== 'string' ||
        Number.isNaN(Date.parse(lastModified))
      ) {
        throw new Error(`Missing or invalid sitemap lastmod value for ${path}.`)
      }
      return [path, lastModified]
    }),
  ) as Record<SitemapPath, string>
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModifiedByPath = getLastModifiedByPath()

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: lastModifiedByPath[path],
    changeFrequency,
    priority,
  }))
}
