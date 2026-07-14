import Image from 'next/image'
import type { AboutHero } from '@/features/resume/application/about'

type AboutHeroPortraitProps = {
  photo: AboutHero['photo']
  className?: string
}

const BOTTOM_FADE_MASK =
  'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 32%)'

const GRID_FADE_MASK =
  'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 45%, rgba(0,0,0,0) 85%)'

/**
 * Center-right hero portrait: sharp and natural, framed as its own grid
 * column so it never overlaps the surrounding text. A faint accent halo and
 * a discreet isometric grid sit behind it, and only the lower edge fades
 * (mask, not a color overlay) so the chest melts progressively into the
 * page instead of ending on a hard cutout line.
 */
export function AboutHeroPortrait({
  photo,
  className = '',
}: AboutHeroPortraitProps) {
  return (
    <div
      className={`relative mx-auto h-72 w-72 sm:h-80 sm:w-80 lg:mx-auto lg:h-[26.68rem] lg:w-[26.68rem] lg:translate-x-[-66px] ${className}`}
    >
      <svg
        aria-hidden="true"
        width="100%"
        height="100%"
        className="absolute -inset-10 -z-10 hidden lg:block"
        style={{
          maskImage: GRID_FADE_MASK,
          WebkitMaskImage: GRID_FADE_MASK,
        }}
      >
        <defs>
          <pattern
            id="about-hero-grid"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-30)"
          >
            <path
              d="M 26 0 L 0 0 0 26"
              fill="none"
              stroke="rgba(166,173,120,0.16)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-hero-grid)" />
      </svg>

      <div
        aria-hidden="true"
        className="bg-site-accent/10 absolute inset-6 -z-10 rounded-full blur-3xl"
      />

      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 464px, 288px"
        className="object-cover object-[center_top] brightness-[0.92] saturate-[0.72]"
        style={{
          maskImage: BOTTOM_FADE_MASK,
          WebkitMaskImage: BOTTOM_FADE_MASK,
        }}
        priority
      />
    </div>
  )
}
