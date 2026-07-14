import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Heart,
  Hexagon,
  ShieldCheck,
  SquareTerminal,
} from 'lucide-react'
import {
  landmarks,
  type LandmarkInterestIcon,
} from '@/features/resume/application/landmarks'
import type { Publication } from '@/features/resume/application/publications'

function InterestIcon({ icon }: { icon: LandmarkInterestIcon }) {
  switch (icon) {
    case 'terminal':
      return <SquareTerminal aria-hidden="true" size={26} strokeWidth={1.5} />
    case 'book-open':
      return <BookOpen aria-hidden="true" size={26} strokeWidth={1.5} />
    case 'hexagon':
      return <Hexagon aria-hidden="true" size={26} strokeWidth={1.5} />
  }
}

function PublicationEntry({ publication }: { publication: Publication }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-identity text-site-accent/80 text-xs font-semibold tracking-[0.08em]">
          {publication.year}
        </span>
        <span className="text-site-foreground/35 text-xs">
          {publication.conferenceAbbr}
        </span>
      </div>
      <h4 className="text-site-foreground mt-1.5 line-clamp-2 text-base leading-snug font-medium">
        {publication.title}
      </h4>
    </div>
  )
}

function ResponsiveLandmarkSeparator() {
  return (
    <div data-landmark-separator aria-hidden="true" className="py-5 lg:hidden">
      <div className="via-site-accent/15 h-px bg-linear-to-r from-transparent to-transparent" />
    </div>
  )
}

/**
 * Education, publications and personal interests presented as the final
 * editorial section before the contact call to action.
 */
export function AboutLandmarks() {
  return (
    <section data-particle-muted aria-labelledby="landmarks-title">
      <header className="max-w-3xl">
        <h2
          id="landmarks-title"
          className="font-identity text-site-accent text-sm font-semibold tracking-widest uppercase"
        >
          {landmarks.eyebrow}
        </h2>
        <p className="font-identity text-site-foreground mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
          {landmarks.description}
        </p>
      </header>

      <div className="mt-8 grid gap-0 lg:grid-cols-[minmax(0,34fr)_minmax(0,40fr)_minmax(0,26fr)]">
        <article className="lg:pr-8">
          <div className="flex items-center gap-3">
            <span className="text-site-accent">
              <GraduationCap aria-hidden="true" size={22} strokeWidth={1.7} />
            </span>
            <h3 className="font-identity text-site-foreground text-lg font-semibold tracking-tight">
              Formations & Programmes
            </h3>
          </div>

          <ol
            aria-label="Diplômes principaux"
            className="before:border-site-accent/25 relative mt-5 grid gap-5 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:border-l before:border-dashed before:content-['']"
          >
            {landmarks.degrees.map((degree) => (
              <li key={degree.id} className="relative pl-6">
                <span
                  aria-hidden="true"
                  className="bg-site-accent ring-site-background absolute top-1.5 left-0 z-10 size-3 rounded-full ring-2"
                />
                <p className="font-identity text-site-accent/75 text-xs font-semibold tracking-[0.1em] uppercase">
                  {degree.period}
                </p>
                <h4 className="font-identity text-site-foreground mt-1 text-base font-semibold">
                  {degree.subtitle} · {degree.title}
                </h4>
                <p className="text-site-foreground/50 mt-0.5 text-xs leading-relaxed">
                  {degree.institution}
                </p>
              </li>
            ))}
          </ol>

          <div
            aria-hidden="true"
            className="via-site-accent/15 my-5 h-px bg-linear-to-r from-transparent to-transparent"
          />

          <div className="flex items-start gap-3">
            <span className="text-site-accent mt-0.5 shrink-0">
              <ShieldCheck aria-hidden="true" size={20} strokeWidth={1.7} />
            </span>
            <div>
              <p className="font-identity text-site-foreground/40 text-[0.65rem] font-semibold tracking-[0.16em] uppercase">
                Formation complémentaire
              </p>
              {landmarks.additionalPrograms.map((program) => (
                <h4
                  key={program.id}
                  className="font-identity text-site-foreground mt-1.5 text-base font-semibold"
                >
                  {program.institution} · {program.title} · {program.period}
                </h4>
              ))}
            </div>
          </div>
        </article>

        <ResponsiveLandmarkSeparator />

        <article className="border-white/8 lg:border-l lg:px-8">
          <div className="flex items-center gap-3">
            <span className="text-site-accent">
              <FileText aria-hidden="true" size={22} strokeWidth={1.7} />
            </span>
            <h3 className="font-identity text-site-foreground text-lg font-semibold tracking-tight">
              Dernières publications
            </h3>
          </div>

          <ol aria-label="Trois dernières publications" className="mt-5 grid">
            {landmarks.latestPublications.map((publication, index) => (
              <li key={publication.id}>
                {index > 0 && (
                  <div
                    aria-hidden="true"
                    className="via-site-accent/10 my-4 h-px bg-linear-to-r from-transparent to-transparent"
                  />
                )}
                <PublicationEntry publication={publication} />
              </li>
            ))}
          </ol>

          <details className="group/publications mt-6 flex flex-col">
            <summary className="font-identity text-site-accent/75 hover:text-site-accent order-2 ml-auto flex w-fit cursor-pointer list-none items-center gap-1.5 text-sm font-medium transition-colors duration-300 [&::-webkit-details-marker]:hidden">
              <span className="relative">
                Explorer les publications
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/publications:scale-x-100"
                />
              </span>
              <ArrowRight
                aria-hidden="true"
                size={15}
                strokeWidth={2}
                className="transition-transform duration-300 group-open/publications:rotate-90"
              />
            </summary>

            <div className="order-1 grid grid-rows-[0fr] opacity-40 transition-[grid-template-rows,opacity,margin] duration-200 ease-out group-open/publications:mb-5 group-open/publications:grid-rows-[1fr] group-open/publications:opacity-100 motion-reduce:transition-none">
              <ol className="grid min-h-0 gap-4 overflow-hidden">
                {landmarks.remainingPublications.map((publication) => (
                  <li key={publication.id}>
                    <PublicationEntry publication={publication} />
                  </li>
                ))}
              </ol>
            </div>
          </details>
        </article>

        <ResponsiveLandmarkSeparator />

        <article className="border-white/8 lg:border-l lg:pl-10">
          <div className="flex items-center gap-3">
            <span className="text-site-accent">
              <Heart aria-hidden="true" size={22} strokeWidth={1.7} />
            </span>
            <h3 className="font-identity text-site-foreground text-lg font-semibold tracking-tight">
              En dehors du travail
            </h3>
          </div>

          <ul aria-label="Centres d’intérêt" className="mt-9 grid gap-5">
            {landmarks.interests.map((interest) => (
              <li
                key={interest.id}
                className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-3"
              >
                <span className="text-site-accent shrink-0">
                  <InterestIcon icon={interest.icon} />
                </span>
                <div>
                  <h4 className="font-identity text-site-foreground text-base font-semibold">
                    {interest.title}
                  </h4>
                  <p className="text-site-foreground/50 mt-1 text-sm leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
