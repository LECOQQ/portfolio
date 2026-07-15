import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ResumeRequestDialog } from '@/features/contact/ui/resume-request-dialog'

vi.mock('@/lib/site-config', () => ({
  siteConfig: { contactEmail: 'hello@example.com' },
}))

describe('ResumeRequestDialog', () => {
  it('reports actionable validation errors without opening a mail draft', () => {
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined)
    render(<ResumeRequestDialog analyticsLocation="topbar" />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Demander le CV complet' }),
    )
    const dialog = screen.getByRole('dialog', {
      name: 'Recevoir le CV complet',
    })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveClass('m-auto')
    expect(document.body).toHaveStyle({ overflow: 'hidden' })
    fireEvent.click(screen.getByRole('button', { name: 'Préparer la demande' }))

    expect(screen.getByText(/adresse e-mail de réponse/)).toBeInTheDocument()
    expect(screen.getByText(/au moins 20 caractères/)).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(
      'Corrigez les champs indiqués',
    )
    expect(click).not.toHaveBeenCalled()
  })

  it('prepares a contextualized mail draft after validation', () => {
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined)
    render(<ResumeRequestDialog analyticsLocation="topbar" />)

    fireEvent.click(
      screen.getByRole('button', { name: 'Demander le CV complet' }),
    )
    fireEvent.change(
      screen.getByLabelText('Nom ou organisation (facultatif)'),
      {
        target: { value: 'Example Corp' },
      },
    )
    fireEvent.change(screen.getByLabelText('E-mail de réponse *'), {
      target: { value: 'recruiter@example.com' },
    })
    fireEvent.change(
      screen.getByLabelText('Pourquoi souhaitez-vous le recevoir ? *'),
      {
        target: {
          value: 'Je souhaite discuter d’une mission de plateforme logicielle.',
        },
      },
    )
    fireEvent.click(screen.getByRole('button', { name: 'Préparer la demande' }))

    expect(click).toHaveBeenCalledOnce()
    expect(screen.getByRole('status')).toHaveTextContent(
      'Votre messagerie va s’ouvrir',
    )
  })

  it('closes on cancel and returns focus to either trigger variant', () => {
    render(<ResumeRequestDialog analyticsLocation="topbar" variant="topbar" />)
    const trigger = screen.getByRole('button', {
      name: 'Demander le CV complet',
    })

    fireEvent.click(trigger)
    const dialog = screen.getByRole('dialog', {
      name: 'Recevoir le CV complet',
    })
    fireEvent(dialog, new Event('cancel', { cancelable: true }))

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveFocus()
    expect(
      screen.queryByRole('dialog', { name: 'Recevoir le CV complet' }),
    ).toBeNull()
    expect(document.body).not.toHaveStyle({ overflow: 'hidden' })
  })
})
