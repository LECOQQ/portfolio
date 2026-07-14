import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ErrorPage from '@/app/error'
import NotFound, { metadata as notFoundMetadata } from '@/app/not-found'

describe('status pages', () => {
  it('offers a path home from the not-found page', () => {
    render(<NotFound />)

    expect(
      screen.getByRole('heading', { name: 'Hors des cartes' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Retour à l’accueil' }),
    ).toHaveAttribute('href', '/')
  })

  it('keeps the not-found page out of search indexes', () => {
    expect(notFoundMetadata).toMatchObject({
      title: 'Page introuvable',
      robots: null,
      alternates: {},
      openGraph: null,
      twitter: null,
    })
  })

  it('lets the visitor retry after an unexpected error', () => {
    const reset = vi.fn()

    render(<ErrorPage error={new Error('failure')} reset={reset} />)
    fireEvent.click(screen.getByRole('button', { name: 'Réessayer' }))

    expect(reset).toHaveBeenCalledOnce()
  })
})
