import type { ComponentPropsWithoutRef } from 'react'

type CodeBlockProps = ComponentPropsWithoutRef<'pre'>
type InlineCodeProps = ComponentPropsWithoutRef<'code'>

/**
 * Replaces `pre` for fenced code blocks. Neutralizes the nested `code`
 * element's own InlineCode styling ([&_code]:*) so a fenced block isn't
 * double-boxed, since MDX always renders block code as <pre><code>.
 * Syntax highlighting is intentionally outside this component's scope.
 */
export function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  return (
    <pre
      className={`text-site-foreground/90 my-6 overflow-x-auto rounded-2xl border border-white/7 bg-white/4.5 p-4 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit ${className ?? ''}`.trim()}
      {...props}
    >
      {children}
    </pre>
  )
}

/** Replaces `code` for inline code spans. */
export function InlineCode({ className, children, ...props }: InlineCodeProps) {
  return (
    <code
      className={`text-site-foreground/90 rounded-md bg-white/9 px-1.5 py-0.5 font-mono text-[0.85em] ${className ?? ''}`.trim()}
      {...props}
    >
      {children}
    </code>
  )
}
