import type { Metadata } from 'next'
import { Fira_Code, Inter, Montserrat } from 'next/font/google'
import type { ReactNode } from 'react'
import { Analytics } from '@/ui/analytics'
import { Footer } from '@/ui/footer'
import { ParticleField } from '@/ui/particle-field'
import { StructuredData } from '@/ui/structured-data'
import { Topbar } from '@/ui/topbar'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name}'s Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': siteConfig.rssPath,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      {
        url: '/favicons/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicons/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.ico',
    apple: [
      {
        url: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        ...siteConfig.socialImage,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.socialImage.url],
  },
}

/**
 * Root layout — wraps every route in the app.
 * Add global providers (theme, auth, query client) here.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${montserrat.variable} ${firaCode.variable} min-h-full scheme-dark`}
    >
      <body className="bg-site-background text-site-foreground relative isolate flex min-h-svh flex-col font-sans antialiased">
        <StructuredData />
        <Analytics />
        <ParticleField />
        <Topbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
