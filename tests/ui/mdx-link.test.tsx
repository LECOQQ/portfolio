import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MdxLink } from '@/components/mdx/link'

describe('MdxLink', () => {
  it('uses the accent for its underline and interactive states', () => {
    render(<MdxLink href="https://example.com">Documentation</MdxLink>)

    const link = screen.getByRole('link', { name: 'Documentation' })

    expect(link).toHaveClass('decoration-site-accent/55')
    expect(link).toHaveClass('hover:text-site-accent')
    expect(link).toHaveClass('focus-visible:text-site-accent')
  })
})
