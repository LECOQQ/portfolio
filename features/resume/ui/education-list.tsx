import { education } from '@/features/resume/application/education'

/**
 * Academic degrees and specialized programs, as a compact About list.
 */
export function EducationList() {
  return (
    <ol aria-label="Formations et programmes" className="grid gap-5">
      {education.map((entry) => (
        <li key={entry.id}>
          <p className="font-identity text-site-accent/85 text-sm leading-tight font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
            {entry.period}
          </p>
          <h3 className="font-identity text-site-foreground mt-0.5 text-sm font-semibold">
            {entry.title}
          </h3>
          <p className="text-site-foreground/55 mt-0.5 text-sm">
            {entry.subtitle} · {entry.institution}
          </p>
        </li>
      ))}
    </ol>
  )
}
