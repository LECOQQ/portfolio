import type { Metadata } from 'next'

export const siteConfig = {
  url: 'https://quentinlecoq.fr',
  name: 'Quentin Lecoq',
  description: 'Maker par goût, software par métier, self-hosted par principe.',
  jobTitle: 'Product & Platform builder',
  rssPath: '/blog/rss.xml',
  socialImage: {
    url: '/images/identity/quentin-lecoq.webp',
    width: 1200,
    height: 1200,
    alt: 'Quentin Lecoq',
  },
  profiles: {
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com',
    gitea: process.env.NEXT_PUBLIC_GITEA_URL || 'https://gitea.com',
    makerWorld:
      process.env.NEXT_PUBLIC_MAKERWORLD_URL || 'https://makerworld.com',
  },
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
} as const

export const configuredProfileUrls = [
  process.env.NEXT_PUBLIC_LINKEDIN_URL,
  process.env.NEXT_PUBLIC_GITHUB_URL,
  process.env.NEXT_PUBLIC_GITEA_URL,
  process.env.NEXT_PUBLIC_MAKERWORLD_URL,
].filter((url): url is string => Boolean(url))

type PageMetadataOptions = {
  title: string
  description: string
  canonical: string
  type?: 'website' | 'article'
  publishedTime?: string
  image?: {
    url: string
    alt: string
  }
}

export function createPageMetadata({
  title,
  description,
  canonical,
  type = 'website',
  publishedTime,
  image = siteConfig.socialImage,
}: PageMetadataOptions): Metadata {
  const socialTitle = `${title} - ${siteConfig.name}`
  const openGraph = {
    title: socialTitle,
    description,
    url: canonical,
    siteName: siteConfig.name,
    locale: 'fr_FR',
    images: [image],
    ...(type === 'article'
      ? {
          type: 'article' as const,
          authors: [siteConfig.name],
          ...(publishedTime ? { publishedTime } : {}),
        }
      : { type: 'website' as const }),
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      types: {
        'application/rss+xml': siteConfig.rssPath,
      },
    },
    openGraph,
    twitter: {
      card:
        image.url === siteConfig.socialImage.url
          ? 'summary'
          : 'summary_large_image',
      title: socialTitle,
      description,
      images: [image.url],
    },
  }
}
