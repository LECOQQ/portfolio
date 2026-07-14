import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type EndCtaProps = {
  /** Short accent line above the body, e.g. "La suite est en cours". */
  eyebrow: string
  /** One line per sentence, kept tight (no paragraph-style leading). */
  body: string[]
  /** Space above the divider. Defaults to `mt-10` (2.5rem), matching the
   * homepage's `gap-10` between sections — the reference spacing every page
   * with an EndCta should match. Pages that already space their sections via
   * a flex/grid `gap` (e.g. the homepage itself) should pass `""` so the two
   * don't add up. */
  topSpacingClassName?: string
}

/**
 * Closing band for content index pages (projects today, writings later):
 * an accent divider plus a short pitch nudging the reader toward /contact.
 * Sits between the page's content and the site footer. The CTA mirrors the
 * dashboard cards' link style (underline-on-hover, no filled button) so it
 * doesn't outweigh the rest of the page.
 */
export function EndCta({
  eyebrow,
  body,
  topSpacingClassName = 'mt-10',
}: EndCtaProps) {
  return (
    <section
      data-particle-muted
      aria-label="Contact"
      className={topSpacingClassName}
    >
      <div
        aria-hidden="true"
        className="via-site-accent/40 mb-8 h-px bg-linear-to-r from-transparent to-transparent"
      />
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:text-left">
        <div className="max-w-xl">
          <p className="font-identity text-site-accent text-sm font-semibold tracking-widest uppercase">
            {eyebrow}
          </p>
          <div className="text-site-foreground/60 mt-2">
            {body.map((line) => (
              <p key={line} className="leading-snug">
                {line}
              </p>
            ))}
          </div>
        </div>

        <Link
          href="/contact"
          className="group/cta font-identity text-site-accent/75 hover:text-site-accent inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors duration-300"
        >
          <span className="relative">
            Me contacter
            <span
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/cta:scale-x-100"
            />
          </span>
          <ArrowRight aria-hidden="true" size={15} strokeWidth={2} />
        </Link>
      </div>
    </section>
  )
}
