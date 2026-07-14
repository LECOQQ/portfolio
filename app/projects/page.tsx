import { EndCta } from '@/components/end-cta'
import { getProjects } from '@/features/projects/application/projects'
import { ProjectsIndex } from '@/features/projects/ui/projects-index'
import { SpotlightProject } from '@/features/projects/ui/spotlight-project'
import { createPageMetadata } from '@/lib/site-config'

export const metadata = createPageMetadata({
  title: 'Projets',
  description:
    'Une sélection de produits, expérimentations et infrastructures que je construis pour apprendre, tester et transformer des idées en systèmes concrets.',
  canonical: '/projects/',
})

export default function ProjectsPage() {
  const projects = getProjects()
  const spotlightProject = projects.find((project) => project.spotlight)

  return (
    <main className="flex-1 px-6 pt-24 pb-[clamp(1.5rem,5vw,5rem)] sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <section
          data-particle-muted
          className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-stretch"
        >
          <header className="flex flex-col justify-center">
            <p className="font-identity text-site-accent text-sm font-semibold tracking-widest uppercase">
              Atelier numérique
            </p>
            <h1 className="font-identity mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Projets
            </h1>
            <p className="text-site-foreground/65 mt-5 max-w-xl leading-relaxed">
              Projets, expérimentations et side projects que je mène, ou que
              j’ai pu mené.
            </p>
          </header>

          {spotlightProject ? (
            <SpotlightProject project={spotlightProject} />
          ) : null}
        </section>

        <ProjectsIndex projects={projects} />

        <EndCta
          eyebrow="La suite est en cours"
          body={[
            'D’autres idées et projets sont en cours.',
            'Certains finiront ici, d’autres resteront peut-être dans l’atelier.',
          ]}
        />
      </div>
    </main>
  )
}
