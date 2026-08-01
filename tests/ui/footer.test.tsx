import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Footer } from '@/ui/footer'

describe('Footer', () => {
  it('exposes the five contact destinations', () => {
    render(<Footer />)

    for (const label of [
      'LinkedIn',
      'GitHub',
      'Gitea',
      'MakerWorld',
      'E-mail',
    ]) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })

  it('links to the privacy policy', () => {
    render(<Footer />)

    expect(
      screen.getByRole('link', {
        name: 'Confidentialité & Mentions légales',
      }),
    ).toHaveAttribute('href', '/privacy')
  })

  it('tags each contact destination with an Umami click event', () => {
    render(<Footer />)

    const expectedChannels: Record<string, string> = {
      LinkedIn: 'linkedin',
      GitHub: 'github',
      Gitea: 'gitea',
      MakerWorld: 'makerworld',
      'E-mail': 'email',
    }

    for (const [label, channel] of Object.entries(expectedChannels)) {
      const link = screen.getByRole('link', { name: label })
      expect(link).toHaveAttribute('data-umami-event', 'social-link-click')
      expect(link).toHaveAttribute('data-umami-event-channel', channel)
      expect(link).toHaveAttribute('data-umami-event-location', 'footer')
    }
  })

  describe('e-mail destination routing', () => {
    const originalContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL

    afterEach(() => {
      if (originalContactEmail === undefined) {
        delete process.env.NEXT_PUBLIC_CONTACT_EMAIL
      } else {
        process.env.NEXT_PUBLIC_CONTACT_EMAIL = originalContactEmail
      }
      vi.resetModules()
    })

    it('renders an internal navigation link to /contact when no e-mail is configured', async () => {
      vi.resetModules()
      delete process.env.NEXT_PUBLIC_CONTACT_EMAIL
      const { Footer: FooterWithoutEmail } = await import('@/ui/footer')

      render(<FooterWithoutEmail />)

      expect(screen.getByRole('link', { name: 'E-mail' })).toHaveAttribute(
        'href',
        '/contact',
      )
    })

    it('renders a mailto link when an e-mail is configured', async () => {
      vi.resetModules()
      process.env.NEXT_PUBLIC_CONTACT_EMAIL = 'hello@example.com'
      const { Footer: FooterWithEmail } = await import('@/ui/footer')

      render(<FooterWithEmail />)

      expect(screen.getByRole('link', { name: 'E-mail' })).toHaveAttribute(
        'href',
        'mailto:hello@example.com',
      )
    })
  })
})
