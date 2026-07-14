import { journeyChapters } from '@/features/resume/application/journey'
import type { JourneyDotTone } from '@/features/resume/application/journey'

const dotClassByTone: Record<JourneyDotTone, string> = {
  live: 'bg-site-accent shadow-[0_0_6px_rgb(166_173_120/0.45)]',
  accent: 'bg-[#7d8259]',
  muted: 'bg-[#8f938f]',
}

/**
 * Three-chapter narrative timeline for the About page's "temps forts"
 * section, open vertical line with a node per chapter. A thin separator
 * sits between chapters, echoing the hero/parcours divider.
 */
export function AboutRecentExperiences() {
  return (
    <ol
      aria-label="Trois chapitres du parcours professionnel"
      className="relative grid before:absolute before:top-1 before:-bottom-1 before:left-[5px] before:w-px before:bg-white/8 before:content-['']"
    >
      {journeyChapters.flatMap((chapter, index) => {
        const entry = (
          <li key={chapter.id} className="relative pl-8">
            <span
              aria-hidden="true"
              className={`absolute top-1 -left-px z-10 size-3 rounded-full ring-1 ring-white/25 ${dotClassByTone[chapter.dot]}`}
            />

            <div className="flex items-start gap-4 sm:gap-5">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-identity text-site-accent/50 text-sm font-bold">
                    {chapter.number}
                  </span>
                  <h3 className="font-identity text-site-accent text-sm font-bold tracking-wide uppercase sm:text-base">
                    {chapter.title}
                  </h3>
                  {chapter.current && (
                    <span className="font-identity border-site-accent/20 bg-site-accent/15 text-site-accent inline-flex w-fit rounded-md border px-2.5 py-1 text-xs leading-none font-semibold tracking-[0.14em] uppercase">
                      ACTUEL
                    </span>
                  )}
                </div>

                <p className="font-identity text-site-accent/85 mt-2 text-sm font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
                  {chapter.period}
                </p>
                <p className="font-identity text-site-foreground/65 mt-1 text-base font-semibold">
                  {chapter.company}
                </p>
                <p className="font-identity text-site-foreground mt-0.5 text-lg font-semibold">
                  {chapter.role}
                </p>

                <p className="text-site-foreground/60 mt-2 text-sm leading-relaxed">
                  {chapter.summary}
                </p>

                <ul className="mt-3 grid gap-1.5">
                  {chapter.points.map((point) => (
                    <li
                      key={point}
                      className="text-site-foreground/50 relative pl-4 text-sm leading-relaxed before:absolute before:top-[0.55em] before:left-0 before:size-1 before:rounded-full before:bg-white/25 before:content-['']"
                    >
                      {point}
                    </li>
                  ))}
                </ul>

                {chapter.tags && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {chapter.tags.map((tag) => (
                      <li
                        key={tag}
                        className="font-identity border-site-accent/20 bg-site-accent/10 text-site-accent rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {chapter.illustration && (
                <div className="relative hidden h-48 w-56 shrink-0 self-start lg:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chapter.illustration.src}
                    alt={chapter.illustration.alt}
                    className="relative size-full object-contain"
                  />
                </div>
              )}
            </div>
          </li>
        )

        if (index === journeyChapters.length - 1) {
          return [entry]
        }

        const separator = (
          <li
            key={`${chapter.id}-separator`}
            aria-hidden="true"
            className="py-5"
          >
            <div className="via-site-accent/15 ml-8 h-px bg-linear-to-r from-transparent to-transparent" />
          </li>
        )

        return [entry, separator]
      })}
    </ol>
  )
}
