import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { dashboard } from '@/features/home/application/dashboard'
import { RecentExperiences } from '@/features/home/ui/recent-experiences'
import { RecentPosts } from '@/features/blog/ui/recent-posts'
import { RecentProjects } from '@/features/projects/ui/recent-projects'

const columnSpanByVariant = {
  experiences: 'md:col-span-2',
  projects: 'md:col-span-3',
  writings: 'md:col-span-5',
} as const

// Experiences and projects share a grid row: this floor keeps their combined
// row as tall as it was in production.
const minHeightByVariant = {
  experiences: 'min-h-[34.5rem]',
  projects: 'min-h-[34.5rem]',
  writings: 'min-h-36',
} as const

/**
 * Entry cards for the main sections highlighted below the home hero. Each
 * card's width and body are driven by its `variant`, not its position, so
 * reordering or removing a card can't silently break another one's layout.
 */
export function DashboardOverview() {
  return (
    <section
      aria-label="Aperçu du portfolio"
      className="z-10 grid w-full max-w-5xl gap-4 md:grid-cols-5"
    >
      {dashboard.overview.map((card) => {
        const hasHeaderCta =
          card.variant === 'projects' || card.variant === 'writings'

        return (
          <article
            key={card.title}
            data-particle-foreground
            className={`flex ${minHeightByVariant[card.variant]} flex-col gap-8 rounded-[1.4rem] border border-white/7 bg-white/4.5 p-5 shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg ${columnSpanByVariant[card.variant]}`}
          >
            <div
              className={
                hasHeaderCta
                  ? 'flex items-center justify-between gap-4'
                  : undefined
              }
            >
              <h2 className="font-identity text-site-foreground/75 text-lg font-semibold tracking-widest [font-variant-caps:small-caps] sm:text-xl">
                {card.title}
              </h2>
              {hasHeaderCta && (
                <Link
                  href={card.cta.href}
                  className="group/cta font-identity text-site-accent/75 hover:text-site-accent inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors duration-300"
                >
                  <span className="relative">
                    {card.cta.label}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/cta:scale-x-100"
                    />
                  </span>
                  <ArrowRight aria-hidden="true" size={15} strokeWidth={2} />
                </Link>
              )}
            </div>

            <div className="flex flex-1 flex-col">
              {card.variant === 'experiences' && <RecentExperiences />}
              {card.variant === 'projects' && <RecentProjects limit={2} />}
              {card.variant === 'writings' && <RecentPosts />}

              {!hasHeaderCta && (
                <div className="mt-auto flex justify-end border-t border-white/7 pt-4">
                  <Link
                    href={card.cta.href}
                    className="group/cta font-identity text-site-accent/75 hover:text-site-accent inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300"
                  >
                    <span className="relative">
                      {card.cta.label}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/cta:scale-x-100"
                      />
                    </span>
                    <ArrowRight aria-hidden="true" size={15} strokeWidth={2} />
                  </Link>
                </div>
              )}
            </div>
          </article>
        )
      })}
    </section>
  )
}
