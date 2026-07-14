import type { ComponentPropsWithoutRef } from 'react'

type HeadingLevel = 1 | 2 | 3 | 4

const headingTags = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' } as const

const headingClassNames: Record<HeadingLevel, string> = {
  1: 'font-identity text-site-foreground mt-0 mb-5 scroll-mt-28 text-3xl font-semibold tracking-tight sm:text-4xl',
  2: 'font-identity text-site-foreground mt-6 mb-3 scroll-mt-28 text-3xl font-semibold tracking-tight first:mt-0 sm:mt-6',
  3: 'font-identity text-site-foreground/85 mt-7 mb-3 scroll-mt-28 text-xl font-medium tracking-tight sm:mt-4 sm:mb-2',
  4: 'font-identity text-site-foreground/85 mt-6 mb-3 scroll-mt-28 text-lg font-medium tracking-tight',
}

type HeadingProps = ComponentPropsWithoutRef<'h1'> & {
  level: HeadingLevel
}

/**
 * Heading primitive shared by all MDX levels (h1-h4). Owns the visual
 * identity (font, size, spacing) entirely — Tailwind Typography's
 * `--tw-prose-headings` is intentionally left untouched, see app/globals.css.
 * Renders a self-link anchor using the `id` injected by rehype-slug.
 */
export function Heading({
  level,
  id,
  children,
  className,
  ...props
}: HeadingProps) {
  const Tag = headingTags[level]
  const resolvedClassName =
    `${headingClassNames[level]} ${className ?? ''}`.trim()

  return (
    <Tag id={id} className={resolvedClassName} {...props}>
      {id ? (
        <a href={`#${id}`} className="group text-inherit no-underline">
          {children}
          <span
            aria-hidden="true"
            className="text-site-foreground/30 ml-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            #
          </span>
        </a>
      ) : (
        children
      )}
    </Tag>
  )
}
