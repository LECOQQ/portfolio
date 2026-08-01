import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AboutPage, { metadata } from '@/app/about/page'

describe('AboutPage', () => {
  it('exposes canonical metadata', () => {
    expect(metadata).toMatchObject({
      title: 'À propos',
      alternates: {
        canonical: '/about/',
        types: { 'application/rss+xml': '/blog/rss.xml' },
      },
      openGraph: {
        title: 'À propos - Quentin Lecoq',
        url: '/about/',
      },
      twitter: { title: 'À propos - Quentin Lecoq' },
    })
  })

  it('renders the hero header, achievements and traits', () => {
    render(<AboutPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Des idées aux produits',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('list', { name: 'Distinctions et chiffres clés' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Inventions déclarées/)).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Ce qui me définit' })).toHaveClass(
      'grid-cols-2',
      'lg:flex',
    )
    expect(screen.getByText('product builder')).toBeInTheDocument()
  })

  it('renders the journey highlights section', () => {
    render(<AboutPage />)

    expect(
      screen.getByRole('list', {
        name: 'Trois chapitres du parcours professionnel',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Du système au produit')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Demander le CV complet' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /CV complet/i })).toBeNull()
  })

  it('renders the skills playground section', () => {
    render(<AboutPage />)

    expect(screen.getByText('Du concept au système')).toBeInTheDocument()
    expect(
      screen.getByText(/Je relie stratégie produit, logiciel/),
    ).toBeInTheDocument()
    const domains = screen.getByRole('list', {
      name: 'Domaines de compétences',
    })
    expect(within(domains).getByText('01').parentElement).toHaveClass(
      'flex-col',
      'items-center',
      'sm:flex-row',
    )
    expect(within(domains).getAllByRole('heading', { level: 3 })).toHaveLength(
      4,
    )
    expect(screen.getByText('Produit & Stratégie')).toBeInTheDocument()
    expect(
      screen.getByText(/Donner une direction au produit/),
    ).toBeInTheDocument()
    expect(
      within(domains).getByRole('heading', { name: 'Systèmes embarqués' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Alignement des parties prenantes'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Workflows modernes : développement assisté par IA, CI/CD et automatisation.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('Langage & Frameworks')).toBeInTheDocument()
    expect(screen.getByText('Workflows')).toBeInTheDocument()
    expect(within(domains).getByText('Codex')).toBeInTheDocument()
    expect(within(domains).getByText('Claude Code')).toBeInTheDocument()
    expect(screen.getByText('macOS')).toBeInTheDocument()
    expect(within(domains).getByText('Linux')).toBeInTheDocument()
    expect(screen.getByText('Go-to-market & partenariats')).toBeInTheDocument()
    expect(screen.getByText('3D Printing')).toBeInTheDocument()
  })

  it('renders education, recent publications and interests as landmarks', () => {
    render(<AboutPage />)

    expect(screen.getByText('repères')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Quelques repères pour comprendre ce qui nourrit ma manière de construire.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('list', { name: 'Diplômes principaux' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Formation complémentaire')).toBeInTheDocument()
    expect(
      screen.getByRole('list', { name: 'Trois dernières publications' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Explorer les publications')).toBeInTheDocument()
    expect(
      screen.getByText(
        /Facilitating Advanced Real-Time Data Processing Through Auto-Coding/,
      ),
    ).toHaveClass('line-clamp-2')
    expect(
      screen.queryByText('European Test and Telemetry Conference'),
    ).not.toBeInTheDocument()
    expect(
      screen.getByText(/Low-Carbon Aircraft: Impacts on Instrumentation/),
    ).toBeInTheDocument()
    const landmarksSection = screen.getByRole('region', { name: 'repères' })
    expect(
      landmarksSection.querySelectorAll('[data-landmark-separator]'),
    ).toHaveLength(2)
    for (const separator of landmarksSection.querySelectorAll(
      '[data-landmark-separator]',
    )) {
      expect(separator).toHaveClass('lg:hidden')
    }
    expect(
      within(landmarksSection).getByRole('list', {
        name: 'Centres d’intérêt',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Jeux de stratégie')).toBeInTheDocument()
    expect(screen.getByText('4X, Grande Stratégie, RTS.')).toBeInTheDocument()
    expect(screen.queryByText('Atelier')).not.toBeInTheDocument()
  })
})
