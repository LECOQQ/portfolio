import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { dashboard } from '@/features/home/application/dashboard'
import { DashboardHeroCard } from '@/features/home/ui/dashboard-hero'

/**
 * Home hero section: the identity card sitting next to the name/tagline intro.
 */
export function HeroSection() {
  const { intro } = dashboard

  return (
    <div className="z-10 flex w-full max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-16">
      <div className="order-2 md:order-none">
        <DashboardHeroCard />
      </div>

      <section
        data-particle-muted
        className="order-1 max-w-2xl p-[clamp(1.5rem,4vw,3.5rem)] md:order-none md:p-0"
        aria-labelledby="home-title"
      >
        <div className="mb-6 flex items-center justify-end gap-3">
          <span aria-hidden="true" className="bg-site-accent/70 h-0.5 w-18" />
          <p className="font-identity text-site-foreground/65 text-sm font-medium tracking-[0.18em] whitespace-nowrap [font-variant-caps:small-caps]">
            {intro.eyebrow}
          </p>
        </div>

        <h1
          id="home-title"
          className="font-identity text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.75] font-semibold tracking-[-0.04em] [font-variant-caps:small-caps]"
        >
          <span className="block">{intro.name.lead}</span>{' '}
          <span className="block">{intro.name.accent}</span>
        </h1>

        <p className="font-identity text-site-foreground/85 mt-12 text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed font-medium">
          {intro.pitch}
        </p>
        <p className="text-site-foreground/70 mt-3 text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed">
          {intro.description}
        </p>
        <p className="text-site-foreground/70 mt-2 text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed">
          {intro.currentRole}
        </p>

        <nav
          aria-label="Raccourcis"
          className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          {intro.ctas.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="font-identity text-site-accent/75 hover:text-site-accent group inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-300"
            >
              <span className="relative">
                {cta.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </span>
              <ArrowRight aria-hidden="true" size={15} strokeWidth={2} />
            </Link>
          ))}
        </nav>
      </section>
    </div>
  )
}
