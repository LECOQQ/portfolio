import { render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Analytics } from '@/ui/analytics'

describe('Analytics', () => {
  const originalScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL
  const originalWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

  afterEach(() => {
    if (originalScriptUrl === undefined) {
      delete process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL
    } else {
      process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL = originalScriptUrl
    }

    if (originalWebsiteId === undefined) {
      delete process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
    } else {
      process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID = originalWebsiteId
    }
  })

  it('renders nothing when the Umami configuration is missing', () => {
    delete process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL
    delete process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

    const { container } = render(<Analytics />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when only the website id is configured', () => {
    delete process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL
    process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID = 'website-id'

    const { container } = render(<Analytics />)

    expect(container).toBeEmptyDOMElement()
  })

  it('loads the Umami script when both variables are configured', () => {
    process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL =
      'https://analytics.example.com/script.js'
    process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID = 'website-id'

    render(<Analytics />)
    const script = document.querySelector(
      'script[src="https://analytics.example.com/script.js"]',
    )

    expect(script).toHaveAttribute('data-website-id', 'website-id')
  })
})
