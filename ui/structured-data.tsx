import { configuredProfileUrls, siteConfig } from '@/lib/site-config'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: `${siteConfig.url}/images/identity/quentin-lecoq.webp`,
      jobTitle: siteConfig.jobTitle,
      sameAs: configuredProfileUrls,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: 'fr-FR',
      publisher: {
        '@id': `${siteConfig.url}/#person`,
      },
    },
  ],
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
      }}
    />
  )
}
