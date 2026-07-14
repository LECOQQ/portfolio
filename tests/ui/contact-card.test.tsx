import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactCard } from '@/features/contact/ui/contact-card'

const contact = {
  eyebrow: 'Rester en contact',
  title: 'Une idée, un projet, une conversation ?',
  description: 'Description',
  shortPitch: 'Pitch court',
  location: 'Basé à Rambouillet · Île-de-France · France · À distance',
  availabilityStatus: 'Disponible pour échanger',
  email: 'hello@quentinlecoq.fr',
  socials: [],
  faq: [],
}

describe('ContactCard', () => {
  const writeText = vi.fn()
  const execCommand = vi.fn()

  beforeEach(() => {
    writeText.mockReset()
    execCommand.mockReset()
    Object.assign(navigator, { clipboard: { writeText } })
    document.execCommand = execCommand
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('copies the email address and marks the button as active', async () => {
    writeText.mockResolvedValueOnce(undefined)
    render(<ContactCard contact={contact} />)

    const copyButton = screen.getByRole('button', {
      name: /Copier l’adresse e-mail/,
    })
    fireEvent.click(copyButton)

    expect(writeText).toHaveBeenCalledWith('hello@quentinlecoq.fr')
    expect(
      await screen.findByText('Adresse copiée dans le presse-papiers.'),
    ).toBeInTheDocument()
    expect(copyButton).toHaveClass('text-site-accent')
  })

  it('falls back to execCommand when the clipboard API rejects', async () => {
    writeText.mockRejectedValueOnce(new Error('denied'))
    execCommand.mockReturnValueOnce(true)
    render(<ContactCard contact={contact} />)

    fireEvent.click(
      screen.getByRole('button', { name: /Copier l’adresse e-mail/ }),
    )

    expect(
      await screen.findByText('Adresse copiée dans le presse-papiers.'),
    ).toBeInTheDocument()
    expect(execCommand).toHaveBeenCalledWith('copy')
  })

  it('shows an error message when both the clipboard API and the fallback fail', async () => {
    writeText.mockRejectedValueOnce(new Error('denied'))
    execCommand.mockReturnValueOnce(false)
    render(<ContactCard contact={contact} />)

    fireEvent.click(
      screen.getByRole('button', { name: /Copier l’adresse e-mail/ }),
    )

    expect(
      await screen.findByText(
        'Copie impossible, sélectionnez l’adresse manuellement.',
      ),
    ).toBeInTheDocument()
  })
})
