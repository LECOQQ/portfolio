import { publications } from '@/features/resume/application/publications'

/**
 * Peer-reviewed publications, as a compact About list.
 */
export function PublicationsList() {
  return (
    <ol aria-label="Publications scientifiques" className="grid gap-5">
      {publications.map((publication) => (
        <li key={publication.id} className="flex gap-4">
          <span className="font-identity text-site-accent/85 shrink-0 text-sm leading-tight font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
            {publication.year}
          </span>
          <div>
            <h3 className="text-site-foreground/85 text-sm leading-snug font-medium">
              {publication.title}
            </h3>
            <p className="text-site-foreground/45 mt-1 text-xs">
              {publication.conference} ({publication.conferenceAbbr})
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
