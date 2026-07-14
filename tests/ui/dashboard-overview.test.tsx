import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DashboardOverview } from '@/features/home/ui/dashboard-overview'

describe('DashboardOverview', () => {
  it('renders the three highlighted portfolio sections', () => {
    render(<DashboardOverview />)

    const overview = screen.getByRole('region', {
      name: 'Aperçu du portfolio',
    })

    for (const title of [
      'expériences récentes',
      'projets sélectionnés',
      'derniers écrits',
    ]) {
      expect(
        within(overview).getByRole('heading', { name: title }),
      ).toBeInTheDocument()
    }
  })

  it('links each card to its complete section', () => {
    render(<DashboardOverview />)

    expect(
      screen.getByRole('link', { name: /voir le parcours complet/i }),
    ).toHaveAttribute('href', '/about')
    expect(
      screen.getByRole('link', { name: /tous les projets/i }),
    ).toHaveAttribute('href', '/projects')
    expect(
      screen.getByRole('link', { name: /tous les écrits/i }),
    ).toHaveAttribute('href', '/blog')
  })

  it('shows the three most recent experiences as a career timeline', () => {
    render(<DashboardOverview />)

    const timeline = screen.getByRole('list', {
      name: 'Trois expériences professionnelles récentes',
    })
    const experiences = within(timeline).getAllByRole('listitem')

    expect(experiences).toHaveLength(3)
    expect(within(timeline).getByText('depuis mars 2026')).toBeVisible()
    expect(within(timeline).getByText('2022 - 2026')).toBeVisible()
    expect(within(timeline).getAllByText('ACTUEL')).toHaveLength(1)
    expect(
      within(timeline).getByText('Intrapreneur - Product & Platform Lead'),
    ).toBeVisible()
    expect(within(timeline).getByText('Mesh · Safran')).toBeVisible()
    expect(
      within(timeline).getByText('Lauréat du concours We Love Intrapreneurs'),
    ).toBeVisible()
    expect(
      within(timeline).queryByText(/Programme We Love Intrapreneurs/),
    ).not.toBeInTheDocument()
    expect(within(timeline).getByText('Ingénieur Innovation')).toBeVisible()
    expect(
      within(timeline).getByText('Stagiaire Ingénieur Innovation'),
    ).toBeVisible()
  })
})
