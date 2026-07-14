import { ArrowRight } from 'lucide-react'
import { EndCta } from '@/components/end-cta'
import { about } from '@/features/resume/application/about'
import { AboutHeroAchievements } from '@/features/resume/ui/about-hero-achievements'
import { AboutHeroPortrait } from '@/features/resume/ui/about-hero-portrait'
import { AboutHeroTraits } from '@/features/resume/ui/about-hero-traits'
import { AboutLandmarks } from '@/features/resume/ui/about-landmarks'
import { AboutRecentExperiences } from '@/features/resume/ui/about-recent-experiences'
import { AboutSkillsPlayground } from '@/features/resume/ui/about-skills-playground'
import { skillsPlayground } from '@/features/resume/application/skills-playground'
import { resumeConfig } from '@/lib/resume-config'
import { createPageMetadata } from '@/lib/site-config'

export const metadata = createPageMetadata({
  title: 'À propos',
  description:
    'Parcours, publications, distinctions et compétences de Quentin Lecoq — de l’embarqué temps réel à la stratégie produit.',
  canonical: '/about/',
})

export default function AboutPage() {
  return (
    <main className="flex-1 px-6 pt-24 pb-[clamp(1.5rem,5vw,5rem)] sm:px-10">
      <div className="mx-auto w-full max-w-[77.5rem]">
        <section
          data-particle-muted
          className="grid gap-10 lg:grid-cols-[minmax(0,5.45fr)_minmax(0,2.4fr)_minmax(0,3.75fr)]"
        >
          <header className="flex flex-col lg:h-full lg:justify-center">
            <div className="lg:mt-4">
              <p className="font-identity text-site-accent text-sm font-semibold tracking-widest uppercase">
                {about.hero.eyebrow}
              </p>
              <h1 className="font-identity mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                {about.hero.title}
              </h1>
              <p className="text-site-foreground/65 mt-5 max-w-xl leading-relaxed">
                {about.hero.body.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <AboutHeroAchievements
              achievements={about.hero.achievements}
              className="mt-8"
            />
          </header>

          <AboutHeroPortrait
            photo={about.hero.photo}
            className="mt-10 lg:mt-0"
          />

          <div className="lg:pl-24">
            <AboutHeroTraits traits={about.hero.traits} />
          </div>
        </section>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div
          aria-hidden="true"
          className="via-site-accent/20 mt-10 mb-8 h-px bg-linear-to-r from-transparent to-transparent lg:mt-1"
        />

        <section
          data-particle-muted
          className="grid gap-8 lg:grid-cols-[minmax(0,24fr)_minmax(0,76fr)] lg:items-start lg:gap-12"
        >
          <div className="lg:sticky lg:top-24">
            <h2 className="font-identity text-site-accent text-sm font-semibold tracking-widest uppercase">
              parcours
            </h2>
            <p className="font-identity text-site-foreground mt-3 text-2xl font-semibold tracking-tight">
              Du système au produit
            </p>
            <p className="text-site-foreground/60 mt-4 text-sm leading-relaxed">
              Quelques étapes qui m’ont conduit de l’ingénierie embarquée à la
              construction de produits et de nouvelles activités.
            </p>

            <a
              href={resumeConfig.href}
              download={resumeConfig.filename}
              data-umami-event="cv-download-click"
              data-umami-event-location="about-recent-experiences"
              className="group/cta font-identity text-site-accent/75 hover:text-site-accent mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-colors duration-300"
            >
              <span className="relative">
                Télécharger le CV complet
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/cta:scale-x-100"
                />
              </span>
              <ArrowRight aria-hidden="true" size={15} strokeWidth={2} />
            </a>
          </div>

          <AboutRecentExperiences />
        </section>

        <div
          aria-hidden="true"
          className="via-site-accent/20 mt-10 mb-8 h-px bg-linear-to-r from-transparent to-transparent"
        />

        <section
          data-particle-muted
          className="grid gap-8 lg:grid-cols-[minmax(0,76fr)_minmax(0,24fr)] lg:items-start lg:gap-12"
        >
          <div className="lg:sticky lg:top-24 lg:order-2">
            <h2 className="font-identity text-site-accent text-sm font-semibold tracking-widest uppercase">
              {skillsPlayground.eyebrow}
            </h2>
            <p className="font-identity text-site-foreground mt-3 text-2xl font-semibold tracking-tight">
              {skillsPlayground.title}
            </p>
            <p className="text-site-foreground/60 mt-4 text-sm leading-relaxed">
              {skillsPlayground.description}
            </p>
          </div>

          <AboutSkillsPlayground />
        </section>

        <div
          aria-hidden="true"
          className="via-site-accent/20 mt-10 mb-8 h-px bg-linear-to-r from-transparent to-transparent"
        />

        <AboutLandmarks />

        <EndCta
          eyebrow="Travaillons ensemble"
          body={[
            'Un projet, une idée ou simplement envie d’échanger ?',
            'Le parcours donne le contexte, la conversation fait le reste.',
          ]}
        />
      </div>
    </main>
  )
}
