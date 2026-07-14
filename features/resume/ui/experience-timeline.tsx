import { professionalExperiences } from '@/features/resume/application/experiences'

/**
 * Full career timeline for the About page: every experience with its
 * detailed highlights, sharing the visual language of RecentExperiences.
 */
export function ExperienceTimeline() {
  return (
    <ol
      aria-label="Parcours professionnel complet"
      className="relative grid gap-9 before:absolute before:top-1 before:-bottom-1 before:left-[5px] before:w-px before:bg-white/8 before:content-['']"
    >
      {professionalExperiences.map((experience) => (
        <li key={experience.id} className="relative pl-7">
          <span
            aria-hidden="true"
            className={`absolute top-1 -left-px z-10 size-3 rounded-full ring-1 ring-white/25 ${
              experience.current
                ? 'bg-site-accent shadow-[0_0_6px_rgb(166_173_120/0.45)]'
                : 'bg-[#8f938f]'
            }`}
          />

          <div className="flex flex-wrap items-center gap-2">
            <p className="font-identity text-site-accent/85 text-sm leading-tight font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
              {experience.period}
            </p>
            {experience.current && (
              <span className="font-identity border-site-accent/20 bg-site-accent/15 text-site-accent inline-flex w-fit rounded-md border px-2.5 py-1 text-xs leading-none font-semibold tracking-[0.14em] uppercase">
                ACTUEL
              </span>
            )}
          </div>

          <h3 className="font-identity text-site-foreground mt-1 text-base font-semibold">
            {experience.role}
          </h3>
          <p className="text-site-foreground/55 mt-0.5 text-sm font-medium">
            {experience.company} · {experience.location}
          </p>
          <p className="text-site-foreground/60 mt-2 text-sm leading-relaxed">
            {experience.context}
          </p>

          {experience.highlights && (
            <ul className="mt-3 grid gap-1.5">
              {experience.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-site-foreground/50 relative pl-4 text-sm leading-relaxed before:absolute before:top-[0.55em] before:left-0 before:size-1 before:rounded-full before:bg-white/25 before:content-['']"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}
