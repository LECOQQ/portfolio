import type { ComponentPropsWithoutRef } from 'react'

type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

export function Blockquote({ className, children, ...props }: BlockquoteProps) {
  return (
    <blockquote
      className={`text-site-foreground/70 my-6 border-l-2 border-white/20 pl-4 italic ${className ?? ''}`.trim()}
      {...props}
    >
      {children}
    </blockquote>
  )
}
