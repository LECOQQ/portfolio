import type { ReactNode } from 'react'

type AboutSectionProps = {
  /** Lowercase title rendered in small caps, like the dashboard cards. */
  title: string
  children: ReactNode
  className?: string
}

/**
 * Glass card wrapping one About section, mirroring the dashboard card
 * styling so the page reads as an extended profile dashboard.
 */
export function AboutSection({
  title,
  children,
  className = '',
}: AboutSectionProps) {
  return (
    <section
      data-particle-foreground
      className={`rounded-[1.4rem] border border-white/7 bg-white/4.5 p-5 shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg sm:p-6 ${className}`}
    >
      <h2 className="font-identity text-site-foreground/75 text-lg font-semibold tracking-widest [font-variant-caps:small-caps]">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}
