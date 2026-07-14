'use client'

import { useCallback, useEffect, useState } from 'react'

type TocItem = {
  id: string
  label: string
}

type ContentTocProps = {
  /** id of the element containing the headings to list (the MDX body). */
  containerId: string
}

const tocEase = 'ease-[cubic-bezier(0.22,1,0.36,1)]'
const tocTransition = `transition-all duration-500 ${tocEase}`
const scrollOffset = 112
const viewportActivationRatio = 0.3
const bottomThreshold = 2

function clampProgress(value: number): number {
  return Math.min(Math.max(value, 0), 1)
}

function stripHeadingSuffix(raw: string): string {
  return raw
    .replace(/#+$/, '')
    .replace(/^\d{2}\s*[-—]\s*/, '')
    .trim()
}

function getAbsoluteTop(element: HTMLElement): number {
  return element.getBoundingClientRect().top + window.scrollY
}

/**
 * Sticky in-page navigation for long-form content: lists the h2 sections
 * found in the MDX body and highlights the one currently in view. Reads the
 * DOM directly (ids come from rehype-slug) instead of duplicating the
 * heading list at build time, so it stays in sync with the content by
 * construction.
 */
export function ContentToc({ containerId }: ContentTocProps) {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [readingProgress, setReadingProgress] = useState(0)

  const scrollToHeading = useCallback((id: string) => {
    const heading = document.getElementById(id)
    if (!heading) return

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    heading.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    setActiveId(id)
    history.replaceState(null, '', `#${id}`)
  }, [])

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const headings = Array.from(
      container.querySelectorAll<HTMLElement>('h2[id]'),
    )

    setItems(
      headings.map((heading) => ({
        id: heading.id,
        // Strip the trailing "#" self-link glyph and optional "01 - " prefix.
        label: stripHeadingSuffix(heading.textContent ?? ''),
      })),
    )

    if (headings.length === 0) return

    const reduceMotion =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null
    let frame = 0

    const syncActiveHeading = () => {
      const viewportBottom = window.scrollY + window.innerHeight
      const documentBottom = document.documentElement.scrollHeight
      const isScrollable = documentBottom > window.innerHeight + bottomThreshold
      const activationOffset = Math.max(
        scrollOffset,
        window.innerHeight * viewportActivationRatio,
      )
      const marker = window.scrollY + activationOffset

      if (isScrollable && viewportBottom >= documentBottom - bottomThreshold) {
        const lastHeading = headings.at(-1)
        setActiveId(lastHeading?.id ?? null)
        setReadingProgress(1)
        return
      }

      const contentTop = getAbsoluteTop(container)
      const contentBottom =
        container.getBoundingClientRect().bottom + window.scrollY
      const readingEnd = Math.max(
        contentBottom - Math.min(window.innerHeight * 0.5, 400),
        contentTop + 1,
      )
      setReadingProgress(
        clampProgress((marker - contentTop) / (readingEnd - contentTop)),
      )
      let currentId = headings[0]?.id ?? null

      for (let index = 0; index < headings.length; index += 1) {
        const heading = headings[index]
        if (!heading) continue

        const sectionTop = getAbsoluteTop(heading)
        const nextHeading = headings[index + 1]
        const sectionBottom = nextHeading
          ? getAbsoluteTop(nextHeading)
          : document.documentElement.scrollHeight

        if (marker >= sectionTop && marker < sectionBottom) {
          currentId = heading.id
          break
        }
      }

      setActiveId((previous) => (previous === currentId ? previous : currentId))
    }

    const onScroll = () => {
      if (reduceMotion?.matches) {
        syncActiveHeading()
        return
      }

      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(syncActiveHeading)
    }

    syncActiveHeading()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    const initialHash = window.location.hash.slice(1)
    if (initialHash && headings.some((heading) => heading.id === initialHash)) {
      requestAnimationFrame(() => scrollToHeading(initialHash))
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [containerId, scrollToHeading])

  if (items.length < 2) return null

  return (
    <nav
      data-particle-foreground
      aria-label="Sommaire"
      className="fixed top-28 z-40 hidden w-56 xl:left-[max(1.5rem,calc(50%-40rem))] xl:block"
    >
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px bg-white/10"
        />
        <span
          data-testid="reading-progress"
          aria-hidden="true"
          className="bg-site-accent/75 absolute top-0 left-0 w-px transition-[height] duration-300 ease-out motion-reduce:transition-none"
          style={{ height: `${readingProgress * 100}%` }}
        />
        <span
          data-testid="reading-progress-marker"
          aria-hidden="true"
          className="bg-site-accent absolute left-px size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_3px_rgb(166_173_120/0.12)] transition-[top] duration-300 ease-out motion-reduce:transition-none"
          style={{ top: `${readingProgress * 100}%` }}
        />
        <ul className="flex flex-col gap-2.5 pl-4">
          {items.map((item) => {
            const isActive = item.id === activeId

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToHeading(item.id)
                  }}
                  className={`flex items-baseline gap-2 text-xs ${tocTransition} ${
                    isActive
                      ? 'text-site-accent font-medium'
                      : 'text-site-foreground/45 hover:text-site-foreground/85 hover:translate-x-1'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-flex shrink-0 overflow-hidden ${tocTransition} ${
                      isActive ? 'max-w-4 opacity-100' : 'max-w-0 opacity-0'
                    }`}
                  >
                    <span className="pr-1">—</span>
                  </span>
                  <span className="line-clamp-2 leading-snug">
                    {item.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
