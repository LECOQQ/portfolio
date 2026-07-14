import { interests, languages } from '@/features/resume/application/skills'

/**
 * Languages and personal interests: the informal side of the resume.
 */
export function PersonalPanel() {
  return (
    <div className="grid gap-8">
      <div>
        <h3 className="font-identity text-site-foreground/50 text-sm font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
          langues
        </h3>
        <ul aria-label="Langues parlées" className="mt-3 grid gap-2">
          {languages.map((language) => (
            <li
              key={language.id}
              className="flex items-baseline justify-between gap-4 text-sm"
            >
              <span className="text-site-foreground/85 font-medium">
                {language.label}
              </span>
              <span className="text-site-foreground/50 text-right">
                {language.level}
                {language.note ? ` · ${language.note}` : ''}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-identity text-site-foreground/50 text-sm font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
          au-delà de l’écran
        </h3>
        <ul aria-label="Centres d’intérêt" className="mt-3 grid gap-3">
          {interests.map((interest) => (
            <li key={interest.id}>
              <p className="text-site-foreground/85 text-sm font-medium">
                {interest.label}
              </p>
              <p className="text-site-foreground/50 text-sm">
                {interest.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
