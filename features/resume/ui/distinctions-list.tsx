import { distinctions } from '@/features/resume/application/distinctions'

/**
 * Awards and innovation program results, as a compact About list.
 */
export function DistinctionsList() {
  return (
    <ol aria-label="Distinctions" className="grid gap-5">
      {distinctions.map((distinction) => (
        <li key={distinction.id}>
          <p className="font-identity text-site-accent/85 text-sm leading-tight font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
            {distinction.period}
          </p>
          <h3 className="font-identity text-site-foreground mt-0.5 text-sm font-semibold">
            {distinction.title}
          </h3>
          <p className="text-site-foreground/50 mt-1 text-sm leading-relaxed">
            {distinction.description}
          </p>
        </li>
      ))}
    </ol>
  )
}
