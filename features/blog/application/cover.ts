import type { CoverFocus } from '@/lib/content-frontmatter'

const DEFAULT_COVER_FOCUS: CoverFocus = { x: 50, y: 50 }

export function getCoverObjectPosition(focus?: CoverFocus): string {
  const { x, y } = focus ?? DEFAULT_COVER_FOCUS
  return `${x}% ${y}%`
}
