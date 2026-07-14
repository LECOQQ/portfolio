import type { ProjectStatus } from '@/lib/content-frontmatter'

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; dotClassName: string }
> = {
  done: { label: 'Terminé', dotClassName: 'bg-site-accent' },
  'in-progress': {
    label: 'En cours de développement',
    dotClassName: 'bg-[#c9974c]',
  },
  'on-hold': { label: 'En pause', dotClassName: 'bg-[#8f938f]' },
}

/** Default status labels, e.g. for a status filter — frontmatter can still
 * override the wording per project via `statusLabel`. */
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> =
  Object.fromEntries(
    Object.entries(STATUS_CONFIG).map(([status, { label }]) => [status, label]),
  ) as Record<ProjectStatus, string>

type ProjectStatusBadgeProps = {
  status: ProjectStatus
  label?: string | undefined
}

/**
 * "On hold" means the project is considered done for now — not actively
 * worked on, but not necessarily feature-complete either — as opposed to
 * "in-progress" which is under active development.
 *
 * `status` always drives the dot color; `label` lets frontmatter override
 * the wording (e.g. "Exploration" instead of "En cours de développement")
 * without touching what color that status renders as.
 */
export function ProjectStatusBadge({
  status,
  label: labelOverride,
}: ProjectStatusBadgeProps) {
  const { label, dotClassName } = STATUS_CONFIG[status]
  const displayLabel = labelOverride ?? label

  return (
    <p className="font-identity text-site-foreground/70 flex min-w-0 items-center gap-1.5 text-sm font-semibold tracking-[0.04em] [font-variant-caps:small-caps]">
      <span className="relative flex size-2 shrink-0" aria-hidden="true">
        <span
          className={`absolute inline-flex size-full animate-ping rounded-full opacity-75 motion-reduce:hidden ${dotClassName}`}
        />
        <span
          className={`relative inline-flex size-2 rounded-full ${dotClassName}`}
        />
      </span>
      <span className="truncate">{displayLabel}</span>
    </p>
  )
}
