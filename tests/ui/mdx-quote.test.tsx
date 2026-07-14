import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Quote } from '@/components/mdx/quote'
import { useMDXComponents } from '@/mdx-components'

describe('Quote', () => {
  it('renders a semantic quotation with an attributed author', () => {
    render(
      <Quote author="Napoléon Bonaparte">
        Dieu est du côté de la meilleure artillerie.
      </Quote>,
    )

    const quote = screen.getByRole('blockquote')

    expect(quote).toHaveTextContent(
      'Dieu est du côté de la meilleure artillerie.',
    )
    expect(quote).toHaveStyle({ borderInlineStartWidth: 0 })
    expect(quote.firstElementChild).toHaveClass('bg-[#7f8848]/80')
    expect(screen.getByText('Napoléon Bonaparte').tagName).toBe('CITE')
  })

  it('is available to authored MDX without a local import', () => {
    expect(useMDXComponents({}).Quote).toBe(Quote)
  })
})
