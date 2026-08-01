import { Mail, Rss } from 'lucide-react'
import Link from 'next/link'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { SiGitea } from 'react-icons/si'
import { BLOG_RSS_PATH } from '@/features/blog/application/feed'
import { siteConfig } from '@/lib/site-config'
import { MakerWorldIcon } from '@/ui/maker-world-icon'

const linkClassName =
  'text-site-foreground/75 hover:text-site-accent flex size-9 items-center justify-center rounded-xl transition-colors duration-300 hover:bg-white/9 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'

// Right-anchored (not centered) so the tooltip never extends past the
// viewport's right edge for icons sitting near it — the RSS icon here is
// close enough to the right side that centering pushed the tooltip off
// screen and forced a horizontal scrollbar.
const tooltipClassName =
  'bg-site-background/80 pointer-events-none absolute right-0 bottom-[calc(100%+0.6rem)] hidden w-max max-w-[calc(100vw-2rem)] rounded-xl border border-white/7 px-3 py-2 text-right shadow-[0_12px_36px_rgb(0_0_0/0.18)] backdrop-blur-xl group-hover:block group-focus-within:block'

const privacyLinkClassName =
  'font-identity text-site-foreground/60 hover:text-site-foreground group inline-flex text-xs font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'

const footerLinks = [
  {
    label: 'LinkedIn',
    href: siteConfig.profiles.linkedin,
    icon: FaLinkedinIn,
    external: true,
    analyticsChannel: 'linkedin',
  },
  {
    label: 'GitHub',
    href: siteConfig.profiles.github,
    icon: FaGithub,
    external: true,
    analyticsChannel: 'github',
  },
  {
    label: 'Gitea',
    href: siteConfig.profiles.gitea,
    icon: SiGitea,
    // At 18px its finer strokes (the mug handle / tea-bag string) get lost
    // to anti-aliasing — 16px, what the hero/contact cards already use,
    // keeps the detail legible.
    size: 16,
    external: true,
    analyticsChannel: 'gitea',
  },
  {
    label: 'MakerWorld',
    href: siteConfig.profiles.makerWorld,
    icon: MakerWorldIcon,
    external: true,
    analyticsChannel: 'makerworld',
  },
  {
    label: 'Flux RSS',
    href: BLOG_RSS_PATH,
    icon: Rss,
    strokeWidth: 1.7,
    external: false,
    analyticsChannel: 'rss',
    tooltip: 'Suivre les nouveaux articles par flux RSS',
  },
  {
    label: 'E-mail',
    href: siteConfig.contactEmail
      ? `mailto:${siteConfig.contactEmail}`
      : '/contact',
    icon: Mail,
    strokeWidth: 1.7,
    external: false,
    analyticsChannel: 'email',
  },
]

export function Footer() {
  return (
    <footer className="text-site-foreground/45 px-4 pb-6 text-xs sm:px-[clamp(1.5rem,5vw,5rem)]">
      {/* Line */}
      <div
        aria-hidden="true"
        className="mb-6 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
      />
      {/* Content */}
      <div className="relative flex flex-col items-center gap-4 px-4 sm:min-h-9 sm:flex-row sm:items-center sm:justify-between sm:px-0">
        <div className="order-1 text-center sm:order-0 sm:text-left">
          <p className="sm:hidden">
            Next.js &middot; MDX &middot; TailwindCSS &middot; Self-hosted
          </p>
          <div className="hidden sm:block">
            <p>Designé &amp; développé par Quentin Lecoq, 2026.</p>
            <p>Construit avec Next.js, MDX &amp; TailwindCSS. Self-hosted.</p>
          </div>
        </div>

        <nav
          aria-label="Informations légales"
          className="order-2 flex justify-center sm:pointer-events-none sm:absolute sm:top-1/2 sm:left-1/2 sm:order-0 sm:-translate-x-1/2 sm:-translate-y-1/2"
        >
          <Link
            href="/privacy"
            className={`${privacyLinkClassName} pointer-events-auto`}
          >
            <span className="relative">
              Confidentialité &amp; Mentions légales
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </span>
          </Link>
        </nav>

        <nav
          data-particle-foreground
          aria-label="Liens externes"
          className="order-3 flex justify-center sm:order-0 sm:justify-end"
        >
          <ul className="flex items-center gap-1">
            {footerLinks.map((link) => {
              const Icon = link.icon
              const icon = (
                <Icon
                  aria-hidden="true"
                  size={link.size ?? 18}
                  strokeWidth={link.strokeWidth ?? 0}
                />
              )
              const isInternalRoute = link.href.startsWith('/')
              const tooltipId = link.tooltip
                ? `${link.analyticsChannel}-tooltip`
                : undefined

              return (
                <li
                  key={link.label}
                  className={tooltipId ? 'group relative' : undefined}
                >
                  {isInternalRoute ? (
                    <Link
                      href={link.href}
                      aria-label={link.label}
                      aria-describedby={tooltipId}
                      className={linkClassName}
                      data-umami-event="social-link-click"
                      data-umami-event-channel={link.analyticsChannel}
                      data-umami-event-location="footer"
                    >
                      {icon}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      aria-label={link.label}
                      aria-describedby={tooltipId}
                      className={linkClassName}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                      data-umami-event="social-link-click"
                      data-umami-event-channel={link.analyticsChannel}
                      data-umami-event-location="footer"
                    >
                      {icon}
                    </a>
                  )}
                  {link.tooltip ? (
                    <div
                      id={tooltipId}
                      role="tooltip"
                      className={tooltipClassName}
                    >
                      <p className="font-identity text-site-foreground/50 text-xs tracking-[0.08em] whitespace-nowrap [font-variant-caps:small-caps]">
                        {link.tooltip}
                      </p>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
