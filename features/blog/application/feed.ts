import { Feed } from 'feed'
import { getBlogPosts } from '@/features/blog/application/posts'
import { siteConfig } from '@/lib/site-config'

export const BLOG_RSS_PATH = siteConfig.rssPath

export function getBlogFeed(): Feed {
  const posts = getBlogPosts()
  const title = `Écrits de ${siteConfig.name}`
  const description =
    "Réflexions personnelles sur l'actualité, les projets et les expériences."

  const feed = new Feed({
    title,
    description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'fr',
    favicon: new URL('/favicon.ico', siteConfig.url).toString(),
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    feedLinks: {
      rss: new URL(BLOG_RSS_PATH, siteConfig.url).toString(),
    },
    author: {
      name: siteConfig.name,
      link: siteConfig.url,
    },
  })

  for (const post of posts) {
    const link = new URL(`/blog/${post.slug}/`, siteConfig.url).toString()

    feed.addItem({
      title: post.title,
      id: link,
      link,
      description: post.description,
      date: new Date(post.publishedAt),
      ...(post.cover
        ? { image: new URL(post.cover, siteConfig.url).toString() }
        : {}),
    })
  }

  return feed
}
