import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCoverObjectPosition } from '@/features/blog/application/cover'
import { PROJECT_TYPE_ACCENT_CLASS } from '@/features/projects/application/project-types'
import type { Project } from '@/features/projects/application/projects'
import { ProjectStatusBadge } from '@/features/projects/ui/project-status'
import { TechIconStack } from '@/features/projects/ui/tech-icon-stack'

type SpotlightProjectProps = {
  project: Project
}

/**
 * Hero card for the project curated via `spotlight` in frontmatter — the
 * project equivalent of the blog hero's featured-post card, at the same
 * grid ratio for visual consistency between the two index pages. Picked
 * explicitly (unlike the blog's "latest post"), since project relevance
 * doesn't track publish recency the way articles do.
 */
export function SpotlightProject({ project }: SpotlightProjectProps) {
  return (
    <article className="group/featured relative grid h-full gap-x-5 gap-y-3 rounded-xl border border-white/7 bg-white/4.5 p-4 shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg transition-colors duration-300 hover:border-white/15 hover:bg-white/5.5 sm:grid-cols-[minmax(0,0.9fr)_minmax(15rem,1.1fr)]">
      {/* Stretched link (not a wrapping <Link>): the tech icons below are
          themselves anchors, and nesting an <a> inside an <a> is invalid
          HTML that breaks hydration. See RecentProjects for the same
          pattern. */}
      <Link
        href={project.link ?? `/projects/${project.slug}`}
        target={project.link ? '_blank' : undefined}
        rel={project.link ? 'noreferrer' : undefined}
        aria-label={`Voir le projet à la une : ${project.title}`}
        className="absolute inset-0 z-10 rounded-xl"
      />

      <div className="relative min-w-0">
        <div className="flex items-center justify-between gap-4">
          <p className="font-identity border-site-accent/20 bg-site-accent/15 text-site-accent inline-flex w-fit rounded-md border px-2.5 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
            À la une
          </p>
          <span className="font-identity text-site-foreground/40 shrink-0 text-sm [font-variant-caps:small-caps]">
            {project.publishedAtLabel}
          </span>
        </div>
        <p
          className={`font-identity mt-2 text-sm font-semibold tracking-[0.08em] [font-variant-caps:small-caps] ${PROJECT_TYPE_ACCENT_CLASS[project.type]}`}
        >
          {project.typeLabel}
        </p>
        <h2 className="font-identity mt-1.5 text-2xl leading-tight font-semibold">
          {project.title}
        </h2>
        <div className="mt-2">
          <ProjectStatusBadge
            status={project.status}
            label={project.statusLabel}
          />
        </div>
        <p className="text-site-foreground/55 mt-2 line-clamp-3 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="relative aspect-video min-w-0 overflow-hidden rounded-lg border border-white/8 bg-white/4 sm:aspect-auto sm:h-full sm:min-h-44">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.coverAlt ?? ''}
            fill
            priority
            className="object-cover"
            style={{
              objectPosition: getCoverObjectPosition(project.coverFocus),
            }}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, calc(100vw - 4rem)"
          />
        ) : (
          <span
            aria-hidden="true"
            className="text-site-foreground/15 font-identity absolute inset-0 flex items-center justify-center text-5xl font-semibold"
          >
            {project.title[0]}
          </span>
        )}
      </div>

      <div className="relative flex items-center justify-between gap-4 sm:col-span-2">
        <TechIconStack stack={project.stack} singleLine />
        <span className="text-site-foreground/55 group-hover/featured:text-site-accent font-identity ml-auto flex shrink-0 items-center gap-2 py-1 pl-3 text-sm font-medium transition-colors">
          Voir le projet
          <ArrowRight
            aria-hidden="true"
            size={18}
            className="transition-transform duration-300 group-hover/featured:translate-x-1"
          />
        </span>
      </div>
    </article>
  )
}
