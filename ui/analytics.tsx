import Script from 'next/script'

/**
 * Loads the self-hosted Umami tracking script when both the script URL and
 * the website id are configured via environment variables. Analytics stay
 * disabled otherwise, e.g. in local development or when the variables are not
 * set for a given build.
 */
export function Analytics() {
  const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

  if (!scriptUrl || !websiteId) {
    return null
  }

  return (
    <Script
      src={scriptUrl}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  )
}
