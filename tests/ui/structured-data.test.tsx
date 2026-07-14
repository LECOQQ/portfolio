import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StructuredData } from '@/ui/structured-data'

describe('StructuredData', () => {
  it('describes the person and website entities', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script?.textContent ?? '{}') as {
      '@graph'?: Array<Record<string, unknown>>
    }

    expect(data['@graph']).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          '@type': 'Person',
          name: 'Quentin Lecoq',
          url: 'https://quentinlecoq.fr',
          image: 'https://quentinlecoq.fr/images/identity/quentin-lecoq.webp',
          jobTitle: 'Product & Platform builder',
        }),
        expect.objectContaining({
          '@type': 'WebSite',
          url: 'https://quentinlecoq.fr',
        }),
      ]),
    )
  })
})
