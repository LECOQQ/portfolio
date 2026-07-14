import { EndCta } from '@/components/end-cta'
import { HeroSection } from '@/features/home/ui/hero-section'
import { DashboardOverview } from '@/features/home/ui/dashboard-overview'

export default function Home() {
  return (
    <main className="relative isolate flex flex-1 flex-col items-center justify-center gap-10 overflow-hidden px-[clamp(1.5rem,5vw,5rem)] pt-24 pb-[clamp(1.5rem,5vw,5rem)]">
      <HeroSection />
      <DashboardOverview />

      <div className="z-10 w-full max-w-5xl">
        <EndCta
          eyebrow="Une idée à concrétiser ?"
          body={[
            'Je construis des produits, outils et systèmes autour de problèmes concrets.',
          ]}
          topSpacingClassName=""
        />
      </div>
    </main>
  )
}
