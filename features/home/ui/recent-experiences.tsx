import { professionalExperiences } from '@/features/resume/application/experiences'

const recentExperiences = professionalExperiences.slice(0, 3)

/**
 * Compact career timeline used in the home dashboard.
 */
export function RecentExperiences() {
  return (
    <ol
      aria-label="Trois expériences professionnelles récentes"
      className="relative -mt-4 grid gap-5 before:absolute before:top-1 before:-bottom-2 before:left-[5px] before:w-px before:bg-white/8 before:content-['']"
    >
      {recentExperiences.map((experience) => (
        <li key={experience.id} className="relative pl-6">
          <span
            aria-hidden="true"
            className={`absolute top-1 -left-px z-10 size-3 rounded-full ring-1 ring-white/25 ${
              experience.current
                ? 'bg-site-accent shadow-[0_0_6px_rgb(166_173_120/0.45)]'
                : 'bg-[#8f938f]'
            }`}
          />

          <div>
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
            <p className="font-identity text-site-foreground mt-0.5 text-sm font-semibold">
              {experience.role}
            </p>
            <p className="text-site-foreground/55 mt-0.5 text-sm font-medium">
              {experience.company}
            </p>
            {experience.recognition && (
              <p className="text-site-foreground/60 mt-0.5 text-sm font-medium">
                {experience.recognition}
              </p>
            )}
            <p className="text-site-foreground/50 mt-0.5 text-sm leading-relaxed">
              {experience.context}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
