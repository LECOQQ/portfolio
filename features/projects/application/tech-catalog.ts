/**
 * Pure tech-stack data shared between the application layer (dedup, cap,
 * sort — see `prepareProjectStack`) and the UI layer (`TechIcon`'s icon/
 * color/url lookup). No React here so `application/` can depend on it
 * without crossing into `ui/`.
 */

export function normalizeTechKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

type TechCategory =
  'frontend' | 'backend' | 'database' | 'infra-devops' | 'infra-physical'

/** Top-down architecture order: client-facing first, physical infra last. */
const CATEGORY_ORDER: TechCategory[] = [
  'frontend',
  'backend',
  'database',
  'infra-devops',
  'infra-physical',
]

const TECH_CATEGORY_BY_KEY: Record<string, TechCategory> = {
  nextjs: 'frontend',
  react: 'frontend',
  typescript: 'frontend',
  javascript: 'frontend',
  tailwindcss: 'frontend',
  tailwind: 'frontend',
  shadcnui: 'frontend',
  vuejs: 'frontend',
  vue: 'frontend',
  swift: 'frontend',

  nodejs: 'backend',
  python: 'backend',
  fastapi: 'backend',
  django: 'backend',
  go: 'backend',
  golang: 'backend',
  rust: 'backend',
  graphql: 'backend',
  typer: 'backend',

  postgresql: 'database',
  postgres: 'database',
  mongodb: 'database',
  redis: 'database',
  sql: 'database',

  docker: 'infra-devops',
  kubernetes: 'infra-devops',
  git: 'infra-devops',
  nginx: 'infra-devops',
  wireguard: 'infra-devops',
  bash: 'infra-devops',

  proxmox: 'infra-physical',
  linux: 'infra-physical',
}

const UNKNOWN_CATEGORY_RANK = CATEGORY_ORDER.length

/** Unrecognized stack entries sort last, after every known category. */
export function getTechSortRank(name: string): number {
  const category = TECH_CATEGORY_BY_KEY[normalizeTechKey(name)]
  return category ? CATEGORY_ORDER.indexOf(category) : UNKNOWN_CATEGORY_RANK
}

/**
 * The tech-icon row lays out beyond-one-line stacks as bottom-up columns of
 * 2 icons; at 7 columns the row runs out of width, so 14 is the hard cap
 * before icons would overflow the card.
 */
export const MAX_STACK_ICONS = 14

/**
 * Normalizes a project's `stack` frontmatter for display: drops duplicates
 * (same tech spelled differently still collides, e.g. "Docker" vs
 * "docker"), caps the count so the icon row can never overflow its card,
 * and sorts top-down by architecture layer (frontend → backend → database →
 * infra devops → infra physique). Both dropped duplicates and truncation are
 * logged so the mistake surfaces to whoever is authoring the content.
 */
export function prepareProjectStack(
  stack: string[],
  sourcePath: string,
): string[] {
  const seenKeys = new Set<string>()
  const deduped: string[] = []

  for (const name of stack) {
    const key = normalizeTechKey(name)
    if (seenKeys.has(key)) {
      console.warn(
        `[projects] ${sourcePath} : techno en doublon ignorée dans "stack" — "${name}".`,
      )
      continue
    }
    seenKeys.add(key)
    deduped.push(name)
  }

  const sorted = [...deduped].sort(
    (a, b) => getTechSortRank(a) - getTechSortRank(b),
  )

  if (sorted.length > MAX_STACK_ICONS) {
    console.warn(
      `[projects] ${sourcePath} : "stack" contient ${sorted.length} technos, ` +
        `seules les ${MAX_STACK_ICONS} premières (triées) seront affichées.`,
    )
  }

  return sorted.slice(0, MAX_STACK_ICONS)
}
