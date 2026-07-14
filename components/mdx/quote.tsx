import type { ComponentPropsWithoutRef } from 'react'

type QuoteProps = ComponentPropsWithoutRef<'blockquote'> & {
  author: string
}

/**
 * Editorial quotation with an explicit, semantic attribution. Use this MDX
 * primitive for sourced quotations; keep the basic blockquote primitive for
 * unattributed excerpts and callouts.
 */
export function Quote({
  author,
  className,
  children,
  style,
  ...props
}: QuoteProps) {
  return (
    <blockquote
      className={`relative my-8 border-0 py-2 pr-4 pl-5 ${className ?? ''}`.trim()}
      style={{ ...style, borderInlineStartWidth: 0 }}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-2 left-0 w-px origin-left scale-x-50 bg-[#7f8848]/80"
      />
      <span
        aria-hidden="true"
        className="font-identity text-site-accent/15 absolute top-1 right-4 text-6xl leading-none"
      >
        “
      </span>
      <div className="font-identity text-site-foreground/85 relative pr-8 text-lg leading-relaxed italic [&>p]:m-0">
        {children}
      </div>
      <footer className="text-site-foreground/50 mt-4 flex items-center gap-2 text-sm">
        <span aria-hidden="true" className="bg-site-accent/70 h-px w-5" />
        <cite className="font-identity not-italic">{author}</cite>
      </footer>
    </blockquote>
  )
}
