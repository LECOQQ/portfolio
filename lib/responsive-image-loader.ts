'use client'

import type { ImageLoaderProps } from 'next/image'

const LOCAL_RASTER_IMAGE_PATTERN =
  /^\/images\/(?!generated\/)(.+)\.(?:avif|jpe?g|png|webp)$/i

/**
 * Resolve a local source to the matching build-time responsive variant.
 * Non-raster and external sources keep their original URL.
 */
export default function responsiveImageLoader({
  src,
  width,
}: ImageLoaderProps): string {
  const match = LOCAL_RASTER_IMAGE_PATTERN.exec(src)

  if (!match?.[1]) {
    return src
  }

  return `/images/generated/${match[1]}-w${width}.webp`
}
