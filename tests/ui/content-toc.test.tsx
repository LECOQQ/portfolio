import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContentToc } from '@/components/content-toc'

function ContentFixture() {
  return (
    <>
      <ContentToc containerId="content" />
      <div id="content">
        <h2 id="hosting">02. Hébergement</h2>
        <h2 id="cookies">04. Cookies</h2>
        <h2 id="rights">05. Vos droits</h2>
        <h2 id="changes">06. Modification de cette politique</h2>
      </div>
    </>
  )
}

function mockHeadingTops(tops: number[]) {
  const headings = document.querySelectorAll<HTMLElement>('#content h2')

  headings.forEach((heading, index) => {
    vi.spyOn(heading, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          top: (tops[index] ?? 0) - window.scrollY,
        }) as DOMRect,
    )
  })
}

describe('ContentToc', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('clamps long labels to two lines and makes inactive links visible', async () => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 0,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 3000,
    })

    render(<ContentFixture />)

    const longLabelLink = await screen.findByRole('link', {
      name: '06. Modification de cette politique',
    })
    const inactiveLink = screen.getByRole('link', { name: '05. Vos droits' })

    expect(inactiveLink).toHaveClass('text-site-foreground/45')
    expect(longLabelLink.firstElementChild?.nextElementSibling).toHaveClass(
      'line-clamp-2',
    )
    expect(screen.getByRole('navigation', { name: 'Sommaire' })).toHaveClass(
      'w-56',
    )
  })

  it('activates the final section when the viewport reaches the page bottom', async () => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 1200,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 2000,
    })

    render(<ContentFixture />)

    act(() => {
      fireEvent.scroll(window)
    })

    await waitFor(() => {
      expect(
        screen.getByRole('link', {
          name: '06. Modification de cette politique',
        }),
      ).toHaveAttribute('aria-current', 'location')
      expect(screen.getByTestId('reading-progress')).toHaveStyle({
        height: '100%',
      })
    })
  })

  it('activates an intermediate section as it crosses the viewport marker', async () => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 500,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 3000,
    })

    render(<ContentFixture />)
    mockHeadingTops([100, 600, 1000, 1400])

    act(() => {
      fireEvent.scroll(window)
    })

    await waitFor(() => {
      const activeLink = screen.getByRole('link', { name: '04. Cookies' })

      expect(activeLink).toHaveAttribute('aria-current', 'location')
      expect(activeLink).toHaveClass('text-site-accent')
    })
  })

  it('keeps the first section active when the page is shorter than the viewport', async () => {
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 800,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 0,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 600,
    })

    render(<ContentFixture />)
    mockHeadingTops([50, 300, 450, 550])

    act(() => {
      fireEvent.resize(window)
    })

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: '02. Hébergement' }),
      ).toHaveAttribute('aria-current', 'location')
    })
  })
})
