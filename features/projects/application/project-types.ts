import type { ProjectType } from '@/lib/content-frontmatter'

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  infrastructure: 'Infrastructure',
  produit: 'Produit',
  'open-source': 'Open-source',
  experimentation: 'Expérimentation',
}

/**
 * Text color per project type, used to distinguish the type label at a
 * glance on /projects. `produit` reuses the site accent (its badge already
 * carries the brand color); the others get a dedicated hue so each type
 * reads as a distinct category in the filtered grid.
 */
export const PROJECT_TYPE_ACCENT_CLASS: Record<ProjectType, string> = {
  infrastructure: 'text-[#7fc26c]',
  produit: 'text-site-accent',
  'open-source': 'text-[#b48ce0]',
  experimentation: 'text-[#4fd1c5]',
}
