import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroSection } from '@/features/home/ui/hero-section'

describe('HeroSection', () => {
  it('renders the identity card next to the name and tagline', () => {
    render(<HeroSection />)

    const heading = screen.getByRole('heading', { name: /quentin\s+lecoq/i })
    const portrait = screen.getByAltText('Portrait de Quentin Lecoq')

    expect(heading).toBeInTheDocument()
    expect(heading.closest('[data-particle-muted]')).toBeInTheDocument()
    expect(portrait).toBeInTheDocument()
    expect(portrait.closest('[data-particle-muted]')).toBeNull()
  })

  it('exposes the eyebrow and the shortcut links to key pages', () => {
    render(<HeroSection />)

    expect(screen.getByText('software eats complexity')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /voir les projets/i }),
    ).toHaveAttribute('href', '/projects')
    expect(
      screen.getByRole('link', { name: /lire les écrits/i }),
    ).toHaveAttribute('href', '/blog')
    expect(
      screen.getByRole('link', { name: /en apprendre plus sur moi/i }),
    ).toHaveAttribute('href', '/about')
  })
})
