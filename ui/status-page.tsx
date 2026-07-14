import type { ReactNode } from 'react'

type StatusPageProps = {
  eyebrow: string
  title: string
  description: string
  actions: ReactNode
}

export function StatusPage({
  eyebrow,
  title,
  description,
  actions,
}: StatusPageProps) {
  return (
    <main className="relative isolate grid flex-1 place-items-center overflow-hidden px-6 py-32 sm:px-10">
      <section
        className="z-10 w-full max-w-4xl text-center"
        aria-labelledby="status-title"
      >
        <p className="text-site-foreground/45 font-mono text-sm tracking-[0.24em] uppercase">
          {eyebrow}
        </p>
        <h1
          id="status-title"
          className="font-identity mt-5 text-[clamp(2.15rem,9vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.04em] [font-variant-caps:small-caps]"
        >
          {title}
        </h1>
        <p className="text-site-foreground/65 mx-auto mt-7 max-w-xl text-[clamp(0.95rem,1.5vw,1.1rem)] leading-relaxed">
          {description}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      </section>
    </main>
  )
}

export const primaryActionClassName =
  'font-identity rounded-xl border border-white/7 bg-white/4.5 px-5 py-2.5 text-sm font-medium text-site-foreground/75 shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg transition-colors duration-300 hover:bg-white/9 hover:text-site-foreground focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'

export const secondaryActionClassName =
  'font-identity rounded-xl px-5 py-2.5 text-sm font-medium text-site-foreground/55 transition-colors duration-300 hover:bg-white/7 hover:text-site-foreground focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'
