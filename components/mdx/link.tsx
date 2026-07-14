import type { ComponentPropsWithoutRef } from 'react'
import NextLink from 'next/link'

type MdxLinkProps = ComponentPropsWithoutRef<'a'>

const linkClassName =
  'text-site-foreground/85 decoration-site-accent/55 hover:text-site-accent focus-visible:text-site-accent underline underline-offset-4 transition-colors duration-300 hover:decoration-site-accent focus-visible:decoration-site-accent focus-visible:outline-none'

/**
 * Link primitive for MDX content. Internal routes and in-page anchors use
 * next/link for client-side navigation; anything else is treated as an
 * external link, matching the pattern already used in ui/footer.tsx.
 */
export function MdxLink({ href, className, children, ...props }: MdxLinkProps) {
  const resolvedClassName = `${linkClassName} ${className ?? ''}`.trim()

  if (!href) {
    return (
      <a className={resolvedClassName} {...props}>
        {children}
      </a>
    )
  }

  const isInternalRoute = href.startsWith('/') || href.startsWith('#')

  if (isInternalRoute) {
    // next/link's props don't accept the broader <a> handler types allowed
    // by exactOptionalPropertyTypes, so only the attributes MDX content
    // actually produces are forwarded here (id, title...), not event handlers.
    const { id, title } = props
    return (
      <NextLink href={href} id={id} title={title} className={resolvedClassName}>
        {children}
      </NextLink>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={resolvedClassName}
      {...props}
    >
      {children}
    </a>
  )
}
