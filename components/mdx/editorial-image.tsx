import Image from 'next/image'

type EditorialImageProps = {
  src: string
  alt: string
  description: string
  width: number
  height: number
}

/**
 * Optimized editorial figure that breaks out to the right on wide screens.
 * Half of its width remains in the reading column so following prose can wrap
 * alongside it; smaller viewports keep a conventional full-width figure.
 */
export function EditorialImage({
  src,
  alt,
  description,
  width,
  height,
}: EditorialImageProps) {
  return (
    <figure className="not-prose my-7 w-full xl:float-right xl:clear-right xl:my-2 xl:mr-[-14rem] xl:mb-6 xl:ml-7 xl:w-[28rem]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1280px) 448px, (min-width: 640px) 66ch, calc(100vw - 3rem)"
        className="h-auto w-full rounded-xl border border-white/7 object-cover"
      />
      <figcaption className="text-site-foreground/40 mt-2 text-right font-mono text-xs leading-relaxed">
        {description}
      </figcaption>
    </figure>
  )
}
