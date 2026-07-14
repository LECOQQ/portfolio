import type { ComponentPropsWithoutRef } from 'react'

type KeyTakeawaysProps = ComponentPropsWithoutRef<'aside'>

/** Editorial emphasis for concise conclusions and arguments, not quotations. */
export function KeyTakeaways({
  className,
  children,
  ...props
}: KeyTakeawaysProps) {
  return (
    <aside
      className={`relative my-7 py-1.5 pr-2 pl-5 ${className ?? ''}`.trim()}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1.5 left-0 w-px origin-left scale-x-50 bg-[#7f8848]/80"
      />
      <div className="text-site-foreground/90 leading-relaxed font-medium [&>p]:m-0">
        {children}
      </div>
    </aside>
  )
}
