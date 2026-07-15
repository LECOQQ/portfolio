import { afterEach, describe, expect, it } from 'vitest'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { getBlogFeed } from '@/features/blog/application/feed'
import { getBlogPosts } from '@/features/blog/application/posts'
import { getProjects } from '@/features/projects/application/projects'
import { createPageMetadata } from '@/lib/site-config'

describe('SEO metadata routes', () => {
  const originalLastmod = process.env.SITEMAP_LASTMOD_JSON

  afterEach(() => {
    if (originalLastmod === undefined) {
      delete process.env.SITEMAP_LASTMOD_JSON
    } else {
      process.env.SITEMAP_LASTMOD_JSON = originalLastmod
    }
  })

  it('allows indexing and advertises the sitemap', () => {
    expect(robots()).toMatchObject({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://quentinlecoq.fr/sitemap.xml',
    })
  })

  it('uses a natural RSS title without an em dash', () => {
    const rss = getBlogFeed().rss2()

    expect(rss).toContain('<title>Écrits de Quentin Lecoq</title>')
    expect(rss).not.toContain('<title>Quentin Lecoq — Écrits</title>')
  })

  it('keeps canonical, RSS and social metadata aligned per page', () => {
    const metadata = createPageMetadata({
      title: 'Page test',
      description: 'Description test',
      canonical: '/page-test/',
    })

    expect(metadata).toMatchObject({
      alternates: {
        canonical: '/page-test/',
        types: { 'application/rss+xml': '/blog/rss.xml' },
      },
      openGraph: {
        title: 'Page test - Quentin Lecoq',
        description: 'Description test',
        url: '/page-test/',
      },
      twitter: {
        title: 'Page test - Quentin Lecoq',
        description: 'Description test',
      },
    })
  })

  it('lists every public page with canonical URLs', () => {
    const entries = sitemap()

    expect(entries.map(({ url }) => url)).toEqual([
      'https://quentinlecoq.fr/',
      'https://quentinlecoq.fr/about/',
      'https://quentinlecoq.fr/projects/',
      'https://quentinlecoq.fr/blog/',
      'https://quentinlecoq.fr/contact/',
      'https://quentinlecoq.fr/privacy/',
      ...getBlogPosts().map(
        ({ slug }) => `https://quentinlecoq.fr/blog/${slug}/`,
      ),
      ...getProjects().map(
        ({ slug }) => `https://quentinlecoq.fr/projects/${slug}/`,
      ),
    ])
    expect(
      entries.every(({ lastModified }) => lastModified !== undefined),
    ).toBe(true)
  })

  it('rejects incomplete generated modification dates', () => {
    process.env.SITEMAP_LASTMOD_JSON = '{}'

    expect(() => sitemap()).toThrow(
      'Missing or invalid sitemap lastmod value for /.',
    )
  })
})
