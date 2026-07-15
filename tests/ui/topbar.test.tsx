import { fireEvent, render, screen, within } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Topbar } from '@/ui/topbar'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

describe('Topbar', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/')
  })

  it('marks the home link as current on the home page', () => {
    render(<Topbar />)

    expect(screen.getByRole('link', { name: 'Accueil' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Accueil' })).toHaveClass(
      'text-site-accent',
    )
    expect(screen.getByRole('link', { name: 'À propos' })).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('marks the matching page as current with a trailing slash', () => {
    vi.mocked(usePathname).mockReturnValue('/about/')

    render(<Topbar />)

    expect(screen.getByRole('link', { name: 'À propos' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('moves the highlight on hover and restores the current page', () => {
    render(<Topbar />)
    const homeLink = screen.getByRole('link', { name: 'Accueil' })
    const aboutLink = screen.getByRole('link', { name: 'À propos' })

    fireEvent.pointerEnter(aboutLink)
    expect(within(aboutLink).getByTestId('topbar-highlight')).toBeVisible()

    fireEvent.pointerLeave(screen.getByRole('navigation'))
    expect(within(homeLink).getByTestId('topbar-highlight')).toBeVisible()
  })

  it('opens and closes the mobile navigation', () => {
    vi.mocked(usePathname).mockReturnValue('/about')
    render(<Topbar />)

    fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le menu' }))
    const mobileNavigation = screen.getByTestId('mobile-navigation')
    expect(
      within(mobileNavigation).getByRole('link', { name: 'Écrits' }),
    ).toBeInTheDocument()
    expect(
      within(mobileNavigation).getByRole('link', { name: 'À propos' }),
    ).toHaveClass('text-site-accent')

    fireEvent.click(screen.getByRole('button', { name: 'Fermer le menu' }))
    expect(
      screen.getByRole('button', { name: 'Ouvrir le menu' }),
    ).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens the private resume request form', () => {
    render(<Topbar />)

    const cvButton = screen.getByRole('button', {
      name: 'Demander le CV complet',
    })
    expect(cvButton).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(cvButton)
    expect(cvButton).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('dialog', { name: 'Recevoir le CV complet' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail de réponse *')).toHaveFocus()
    expect(screen.queryByRole('link', { name: /Télécharger/i })).toBeNull()
  })
})
