import { TechIcon } from '@/features/projects/ui/tech-icon'

// ~7 size-7 icons (28px + 1.5 gap) fit across a narrow card's icon row
// before overflowing. Below that, stack.length <= STACK_ICONS_PER_LINE keeps
// the plain single-line layout.
const STACK_ICONS_PER_LINE = 7

type TechIconStackProps = {
  stack: string[]
  size?: 'sm' | 'md'
  /** Force a single row (icons wrap via flex-wrap instead of splitting into
   * two stacked rows) — for cards wide enough that the stack never needs
   * the two-row layout. */
  singleLine?: boolean
}

/**
 * Beyond one line, the (already category-sorted) stack splits into two full
 * rows instead of wrapping icon-by-icon: the bottom row gets the first half
 * (ceil, so it's never shorter than the top one), the top row gets the
 * rest — both read left to right, continuing the same order across the
 * break like wrapped text. This keeps same-category icons running together
 * within a row instead of two unrelated categories ending up stacked on top
 * of each other at an arbitrary cut point.
 */
export function TechIconStack({
  stack,
  size = 'sm',
  singleLine = false,
}: TechIconStackProps) {
  if (singleLine || stack.length <= STACK_ICONS_PER_LINE) {
    return (
      <div className="flex flex-wrap items-center gap-1.5">
        {stack.map((name) => (
          <TechIcon key={name} name={name} size={size} />
        ))}
      </div>
    )
  }

  const bottomCount = Math.ceil(stack.length / 2)
  const bottomRow = stack.slice(0, bottomCount)
  const topRow = stack.slice(bottomCount)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        {topRow.map((name) => (
          <TechIcon key={name} name={name} size={size} />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        {bottomRow.map((name) => (
          <TechIcon key={name} name={name} size={size} />
        ))}
      </div>
    </div>
  )
}
