'use client'

import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type FocusEvent } from 'react'
import { resumeConfig } from '@/lib/resume-config'

const navigationItems = [
  { label: 'Projets', href: '/projects' },
  { label: 'Écrits', href: '/blog' },
  { label: 'À propos', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const linkClassName =
  'relative isolate flex items-center justify-center gap-0.5 rounded-xl py-1.5 font-identity text-xs font-medium transition-colors duration-300 hover:text-site-foreground focus-visible:text-site-foreground focus-visible:ring-2 focus-visible:ring-site-accent/60 focus-visible:outline-none sm:text-sm'
const resumeTooltipId = 'resume-download-tooltip'

function Highlight() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.span
      layoutId="topbar-highlight"
      data-testid="topbar-highlight"
      className="bg-site-accent/10 absolute inset-x-0.5 inset-y-0.5 z-0 rounded-xl"
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 280, damping: 30, mass: 0.8 }
      }
    />
  )
}

export function Topbar() {
  const pathname = usePathname()
  const currentPath = pathname === '/' ? pathname : pathname.replace(/\/$/, '')
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const cvMenuRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const highlightedPath = hoveredPath ?? currentPath

  useEffect(() => {
    if (!isMenuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      )
        setIsMenuOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isCvMenuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !cvMenuRef.current?.contains(event.target)
      )
        setIsCvMenuOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsCvMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCvMenuOpen])

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHoveredPath(null)
  }

  return (
    <header className="fixed top-[max(1rem,env(safe-area-inset-top))] right-0 left-0 z-50 flex justify-center px-4">
      <nav
        ref={navRef}
        data-particle-foreground
        aria-label="Navigation principale"
        className="relative rounded-[1.1rem] border border-white/7 bg-white/4.5 p-0.5 shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg"
        onPointerLeave={() => setHoveredPath(null)}
        onBlur={handleBlur}
      >
        <ul className="flex items-center">
          <li>
            <Link
              href="/"
              aria-label="Accueil"
              aria-current={currentPath === '/' ? 'page' : undefined}
              onPointerEnter={() => setHoveredPath('/')}
              onFocus={() => setHoveredPath('/')}
              className={`${linkClassName} flex w-8 justify-center px-0 ${
                currentPath === '/'
                  ? 'text-site-accent font-semibold'
                  : 'text-site-foreground/45'
              }`}
            >
              {highlightedPath === '/' && <Highlight />}
              <span
                aria-hidden="true"
                className="font-identity relative z-10 flex items-baseline gap-px"
              >
                <span className="text-sm sm:text-base">Q</span>
                <span>L</span>
              </span>
            </Link>
          </li>

          <li
            aria-hidden="true"
            className="text-site-foreground/20 select-none"
          >
            |
          </li>

          {navigationItems.map((item) => (
            <li key={item.href} className="hidden sm:block">
              <Link
                href={item.href}
                aria-current={currentPath === item.href ? 'page' : undefined}
                onPointerEnter={() => setHoveredPath(item.href)}
                onFocus={() => setHoveredPath(item.href)}
                className={`${linkClassName} w-[clamp(3.5rem,15vw,5.25rem)] px-1.5 text-center whitespace-nowrap sm:px-2 ${
                  currentPath === item.href
                    ? 'text-site-accent font-semibold'
                    : 'text-site-foreground/45'
                }`}
              >
                {highlightedPath === item.href && <Highlight />}
                <span className="relative z-10">{item.label}</span>
              </Link>
            </li>
          ))}

          <li className="sm:hidden">
            <button
              type="button"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="text-site-foreground/60 hover:text-site-foreground focus-visible:text-site-accent focus-visible:ring-site-accent/60 flex size-8 items-center justify-center rounded-xl transition-colors duration-300 hover:bg-white/9 focus-visible:ring-2 focus-visible:outline-none"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            >
              {isMenuOpen ? (
                <X aria-hidden="true" size={16} strokeWidth={1.8} />
              ) : (
                <Menu aria-hidden="true" size={16} strokeWidth={1.8} />
              )}
            </button>
          </li>
        </ul>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-navigation"
              data-testid="mobile-navigation"
              className="bg-site-background/95 absolute top-[calc(100%+0.5rem)] left-1/2 w-44 -translate-x-1/2 rounded-[1.1rem] border border-white/[0.07] p-1.5 shadow-[0_16px_40px_rgb(0_0_0/0.22)] backdrop-blur-xl sm:hidden"
              initial={
                reduceMotion ? false : { opacity: 0, y: -6, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -4, scale: 0.98 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            >
              <ul className="grid gap-0.5">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={
                        currentPath === item.href ? 'page' : undefined
                      }
                      className={`hover:text-site-foreground font-identity focus-visible:ring-site-accent/60 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/9 focus-visible:ring-2 focus-visible:outline-none ${
                        currentPath === item.href
                          ? 'text-site-accent bg-site-accent/10 font-semibold'
                          : 'text-site-foreground/48'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                      <ChevronRight
                        aria-hidden="true"
                        className={
                          currentPath === item.href
                            ? 'text-site-accent/65'
                            : 'text-site-foreground/35'
                        }
                        size={14}
                        strokeWidth={1.8}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div
        ref={cvMenuRef}
        data-particle-foreground
        className="group absolute right-[max(1rem,env(safe-area-inset-right))]"
      >
        <button
          type="button"
          aria-label="Mon CV"
          aria-describedby={resumeTooltipId}
          aria-haspopup="menu"
          aria-expanded={isCvMenuOpen}
          aria-controls="cv-menu"
          onClick={() => setIsCvMenuOpen((isOpen) => !isOpen)}
          className="text-site-foreground/70 hover:text-site-foreground font-identity focus-visible:border-site-accent/40 focus-visible:ring-site-accent/30 flex h-9 cursor-pointer items-center gap-1.5 rounded-[1.1rem] border border-white/7 bg-white/4.5 px-3 text-xs font-medium shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg transition-colors duration-300 hover:bg-white/9 focus-visible:ring-2 focus-visible:outline-none sm:text-sm"
        >
          <span>CV</span>
          <ChevronDown
            aria-hidden="true"
            className={`text-site-accent/65 group-hover:text-site-accent group-focus-within:text-site-accent transition-transform duration-200 ${isCvMenuOpen ? 'rotate-180' : ''}`}
            size={15}
            strokeWidth={1.8}
          />
        </button>

        <div
          id={resumeTooltipId}
          role="tooltip"
          className={`bg-site-background/80 pointer-events-none absolute top-[calc(100%+0.6rem)] right-0 w-max max-w-[calc(100vw-2rem)] origin-top-right translate-y-1.5 scale-95 rounded-xl border border-white/7 px-3 py-2 text-right opacity-0 shadow-[0_12px_36px_rgb(0_0_0/0.18)] backdrop-blur-xl transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            isCvMenuOpen
              ? ''
              : 'group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100'
          }`}
        >
          <p className="font-identity text-site-foreground/50 text-xs tracking-[0.08em] [font-variant-caps:small-caps]">
            Mis à jour le {resumeConfig.updatedAtLabel}
          </p>
        </div>

        <AnimatePresence>
          {isCvMenuOpen && (
            <motion.ul
              id="cv-menu"
              role="menu"
              aria-label="Mon CV"
              className="bg-site-background/95 absolute top-[calc(100%+0.5rem)] right-0 w-44 rounded-[1.1rem] border border-white/[0.07] p-1 shadow-[0_16px_40px_rgb(0_0_0/0.22)] backdrop-blur-xl"
              initial={
                reduceMotion ? false : { opacity: 0, y: -6, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -4, scale: 0.98 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            >
              <li role="none">
                <a
                  role="menuitem"
                  href="/cv"
                  onClick={() => setIsCvMenuOpen(false)}
                  className="text-site-foreground/70 hover:text-site-foreground font-identity focus-visible:ring-site-accent/30 flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/9 focus-visible:ring-2 focus-visible:outline-none"
                  data-umami-event="cv-view-click"
                  data-umami-event-location="topbar"
                >
                  Consulter
                </a>
              </li>
              <li role="none">
                <a
                  role="menuitem"
                  href={resumeConfig.href}
                  download={resumeConfig.filename}
                  onClick={() => setIsCvMenuOpen(false)}
                  className="text-site-foreground/70 hover:text-site-foreground font-identity focus-visible:ring-site-accent/30 flex cursor-pointer items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-white/9 focus-visible:ring-2 focus-visible:outline-none"
                  data-umami-event="cv-download-click"
                  data-umami-event-location="topbar"
                >
                  Télécharger
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
