import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import PrivacyPage, { metadata } from '@/app/privacy/page'

describe('PrivacyPage', () => {
  it('exposes canonical metadata matching the MDX frontmatter', () => {
    expect(metadata).toMatchObject({
      title: 'Politique de confidentialité',
      alternates: { canonical: '/privacy/' },
    })
  })

  it('renders the frontmatter title, the last update date and the MDX body', () => {
    render(<PrivacyPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Politique de confidentialité',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Dernière mise à jour/)).toBeInTheDocument()
    expect(screen.getByText(/3 min de lecture/)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: "03. Mesure d'audience",
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: '02. Hébergement' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/bureau d'enregistrement/)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'hello@quentinlecoq.fr' }),
    ).toHaveAttribute('href', 'mailto:hello@quentinlecoq.fr')
    expect(
      screen.getAllByText(/aucun identifiant persistant/).length,
    ).toBeGreaterThanOrEqual(1)
    expect(
      screen.getByRole('heading', { level: 2, name: '06. Contact' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'me contacter' })).toHaveAttribute(
      'href',
      '/contact',
    )
    const externalLink = screen.getByRole('link', {
      name: "Commission nationale de l'informatique et des libertés (CNIL)",
    })

    expect(externalLink).toHaveAttribute('href', 'https://www.cnil.fr')
  })
})
