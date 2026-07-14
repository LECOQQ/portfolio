import type { ComponentPropsWithoutRef } from 'react'

type MdxImageProps = ComponentPropsWithoutRef<'img'>

/**
 * Image primitive for MDX content. A plain <img> is used deliberately
 * instead of next/image: `images.unoptimized: true` (static export) means
 * next/image would bring no optimization benefit here, only extra
 * width/height ceremony for content authors.
 */
export function MdxImage({ alt, className, ...props }: MdxImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ''}
      loading="lazy"
      className={`my-6 w-full rounded-2xl border border-white/7 ${className ?? ''}`.trim()}
      {...props}
    />
  )
}
