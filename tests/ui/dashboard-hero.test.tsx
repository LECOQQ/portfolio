import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DashboardHeroCard } from '@/features/home/ui/dashboard-hero'

describe('DashboardHeroCard', () => {
  it('shows the portrait, status and location facts', () => {
    render(<DashboardHeroCard />)

    const portrait = screen.getByAltText('Portrait de Quentin Lecoq')

    expect(portrait).toBeInTheDocument()
    expect(portrait).toHaveAttribute('fetchpriority', 'high')
    expect(screen.getByText("En train d'écrire la suite.")).toBeInTheDocument()
    expect(screen.getByText('France')).toBeInTheDocument()
    expect(screen.getByText('Europe/Paris')).toBeInTheDocument()
  })

  it('lists the professional focus and playgrounds tag groups', () => {
    render(<DashboardHeroCard />)

    expect(screen.getByText('New Defense · Hacker culture')).toBeInTheDocument()
    expect(
      screen.getByText('Maker · Software · Self-hosted'),
    ).toBeInTheDocument()
  })

  it('exposes the quick contact shortcuts', () => {
    render(<DashboardHeroCard />)

    for (const label of ['GitHub', 'LinkedIn', 'MakerWorld', 'E-mail']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })

  it('tags each quick contact shortcut with an Umami click event', () => {
    render(<DashboardHeroCard />)

    const expectedChannels: Record<string, string> = {
      GitHub: 'github',
      LinkedIn: 'linkedin',
      MakerWorld: 'makerworld',
      'E-mail': 'email',
    }

    for (const [label, channel] of Object.entries(expectedChannels)) {
      const link = screen.getByRole('link', { name: label })
      expect(link).toHaveAttribute('data-umami-event', 'social-link-click')
      expect(link).toHaveAttribute('data-umami-event-channel', channel)
      expect(link).toHaveAttribute('data-umami-event-location', 'hero')
    }
  })

  describe('e-mail shortcut routing', () => {
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
      const { DashboardHeroCard: CardWithoutEmail } =
        await import('@/features/home/ui/dashboard-hero')

      render(<CardWithoutEmail />)

      expect(screen.getByRole('link', { name: 'E-mail' })).toHaveAttribute(
        'href',
        '/contact',
      )
    })

    it('renders a mailto link when an e-mail is configured', async () => {
      vi.resetModules()
      process.env.NEXT_PUBLIC_CONTACT_EMAIL = 'hello@example.com'
      const { DashboardHeroCard: CardWithEmail } =
        await import('@/features/home/ui/dashboard-hero')

      render(<CardWithEmail />)

      expect(screen.getByRole('link', { name: 'E-mail' })).toHaveAttribute(
        'href',
        'mailto:hello@example.com',
      )
    })
  })
})
