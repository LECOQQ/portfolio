import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCoverObjectPosition } from '@/features/blog/application/cover'
import { getFeaturedProjects } from '@/features/projects/application/projects'
import { ProjectStatusBadge } from '@/features/projects/ui/project-status'
import { TechIconStack } from '@/features/projects/ui/tech-icon-stack'

type RecentProjectsProps = {
  limit?: number
}

export function RecentProjects({ limit = 2 }: RecentProjectsProps) {
  const projects = getFeaturedProjects(limit)

  if (projects.length === 0) {
    return (
      <p className="font-identity text-site-foreground/40 text-sm">
        Aucun projet mis en avant pour l&apos;instant.
      </p>
    )
  }

  return (
    <ul className="-mt-6 grid flex-1 gap-5 sm:grid-cols-2 sm:gap-6">
      {projects.map((project, index) => (
        <li key={project.slug} className="h-full min-w-0">
          <div className="group/project relative -mx-2 flex h-full flex-col rounded-xl px-2 py-2 transition-colors duration-200 hover:bg-white/4">
            {/* Stretched link: the whole card is clickable. It needs z-10 to
                paint above the image/content siblings below (both `relative`,
                so without an explicit z-index they'd stack on top per DOM
                order and swallow every click). Each tech icon carries its own
                z-20 (see TechIcon) so it stays independently clickable — but
                the arrow and the rest of this row are left unelevated on
                purpose, so a click there still falls through to this link
                instead of being silently swallowed. */}
            <Link
              href={project.link ?? `/projects/${project.slug}`}
              target={project.link ? '_blank' : undefined}
              rel={project.link ? 'noreferrer' : undefined}
              aria-label={project.title}
              className="absolute inset-0 z-10 rounded-xl"
              data-umami-event={project.link ? 'project-link-click' : undefined}
              data-umami-event-location="home-recent-projects"
              data-umami-event-project={project.slug}
            />

            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/8 bg-white/4">
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  className="object-cover"
                  style={{
                    objectPosition: getCoverObjectPosition(project.coverFocus),
                  }}
                  sizes="(min-width: 640px) 260px, calc(100vw - 4rem)"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="text-site-foreground/15 absolute inset-0 flex items-center justify-center text-2xl font-bold"
                >
                  {project.title[0]}
                </span>
              )}
            </div>

            {/* Fixed-height content block: status/date, title and description
                always reserve the same vertical space regardless of content
                length. Any leftover height (from the shared row's floor)
                collects above the stack/arrow row via mt-auto, never as a
                dead gap below it. */}
            <div className="relative mt-3 flex min-w-0 flex-1 flex-col">
              <div className="flex flex-nowrap items-baseline justify-between gap-x-2">
                <ProjectStatusBadge
                  status={project.status}
                  label={project.statusLabel}
                />
                <span className="font-identity text-site-foreground/40 shrink-0 text-sm whitespace-nowrap [font-variant-caps:small-caps]">
                  {project.publishedAtLabel}
                </span>
              </div>
              <p className="font-identity text-site-foreground mt-1 truncate text-base font-semibold">
                {project.title}
              </p>
              <p className="text-site-foreground/50 mt-1 line-clamp-6 min-h-[8.55rem] text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                <TechIconStack stack={project.stack} />
                <ArrowRight
                  aria-hidden="true"
                  size={18}
                  strokeWidth={1.75}
                  className="text-site-accent shrink-0 translate-x-0 transition-transform duration-200 group-hover/project:translate-x-1"
                />
              </div>

              {/* Below sm, cards stack in one column: a horizontal rule
                  (centered in the gap-5 row gutter) separates them instead,
                  matching RecentPosts' between-item divider. From sm up,
                  they sit side by side, so the rule turns vertical and
                  centers in the gap-6 column gutter instead. */}
              {index < projects.length - 1 && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-2.5 h-px bg-white/7 sm:hidden"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -right-3 hidden w-px bg-white/7 sm:block"
                  />
                </>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
