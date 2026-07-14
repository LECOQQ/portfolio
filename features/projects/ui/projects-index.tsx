'use client'

import { ArrowRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FilterDropdown } from '@/components/filter-dropdown'
import { getCoverObjectPosition } from '@/features/blog/application/cover'
import {
  PROJECT_TYPE_ACCENT_CLASS,
  PROJECT_TYPE_LABELS,
} from '@/features/projects/application/project-types'
import type { Project } from '@/features/projects/application/projects'
import {
  PROJECT_STATUS_LABELS,
  ProjectStatusBadge,
} from '@/features/projects/ui/project-status'
import { TechIconStack } from '@/features/projects/ui/tech-icon-stack'

type ProjectsIndexProps = {
  projects: Project[]
}

type OpenFilter = 'status' | null

const INITIAL_VISIBLE_COUNT = 3
const LOAD_MORE_COUNT = 3

const TYPE_FILTER_OPTIONS = [
  { value: 'all', label: 'Tous' },
  ...Object.entries(PROJECT_TYPE_LABELS).map(([value, label]) => ({
    value,
    label,
  })),
]

const STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'Tous les statuts' },
  ...Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => ({
    value,
    label,
  })),
]

export function ProjectsIndex({ projects }: ProjectsIndexProps) {
  const [type, setType] = useState('all')
  const [status, setStatus] = useState('all')
  const [openFilter, setOpenFilter] = useState<OpenFilter>(null)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

  const filteredProjects = projects
    .filter((project) => type === 'all' || project.type === type)
    .filter((project) => status === 'all' || project.status === status)
  const visibleProjects = filteredProjects.slice(0, visibleCount)
  const remainingCount = filteredProjects.length - visibleProjects.length

  const resetVisibleCount = () => setVisibleCount(INITIAL_VISIBLE_COUNT)

  return (
    <section aria-label="Tous les projets" className="mt-14">
      <div className="flex flex-wrap items-center gap-2">
        {TYPE_FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={type === option.value}
            onClick={() => {
              setType(option.value)
              resetVisibleCount()
            }}
            className={`font-identity cursor-pointer rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
              type === option.value
                ? 'border-site-accent/40 bg-site-accent/10 text-site-accent'
                : 'text-site-foreground/60 hover:text-site-foreground border-white/7 bg-white/4 hover:border-white/15'
            }`}
          >
            {option.label}
          </button>
        ))}

        <div className="ml-auto w-full sm:w-56">
          <FilterDropdown
            id="status-filter"
            label="Filtrer par statut"
            value={status}
            options={STATUS_FILTER_OPTIONS}
            open={openFilter === 'status'}
            onToggle={() =>
              setOpenFilter((current) =>
                current === 'status' ? null : 'status',
              )
            }
            onChange={(value) => {
              setStatus(value)
              setOpenFilter(null)
              resetVisibleCount()
            }}
          />
        </div>
      </div>

      <p
        aria-live="polite"
        className="font-identity text-site-accent mt-6 text-sm font-medium tracking-[0.08em] [font-variant-caps:small-caps]"
      >
        {filteredProjects.length}{' '}
        {filteredProjects.length > 1 ? 'projets' : 'projet'}
      </p>

      {visibleProjects.length > 0 ? (
        <ol
          aria-label="Catalogue des projets"
          className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProjects.map((project) => (
            <li key={project.slug}>
              {/* Stretched link (not a wrapping <Link>): the tech icons
                  below are themselves anchors, and nesting an <a> inside
                  an <a> is invalid HTML that breaks hydration. See
                  RecentProjects for the same pattern. */}
              <article className="group/card focus-within:ring-site-accent/40 relative flex h-full flex-col rounded-[1.25rem] border border-white/7 bg-white/4.5 p-4 shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg transition-colors duration-300 focus-within:ring-2 focus-within:outline-none hover:border-white/15">
                <Link
                  href={project.link ?? `/projects/${project.slug}`}
                  target={project.link ? '_blank' : undefined}
                  rel={project.link ? 'noreferrer' : undefined}
                  aria-label={project.title}
                  className="absolute inset-0 z-10 rounded-[1.25rem]"
                />

                <div className="relative flex items-baseline justify-between gap-x-4">
                  <p
                    className={`font-identity text-sm font-semibold tracking-[0.08em] [font-variant-caps:small-caps] ${PROJECT_TYPE_ACCENT_CLASS[project.type]}`}
                  >
                    {project.typeLabel}
                  </p>
                  <span className="font-identity text-site-foreground/40 shrink-0 text-sm whitespace-nowrap [font-variant-caps:small-caps]">
                    {project.publishedAtLabel}
                  </span>
                </div>

                <div className="relative mt-3 aspect-video overflow-hidden rounded-xl border border-white/8 bg-white/4">
                  {project.cover ? (
                    <Image
                      src={project.cover}
                      alt={project.coverAlt ?? ''}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: getCoverObjectPosition(
                          project.coverFocus,
                        ),
                      }}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 4rem)"
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

                <h3 className="font-identity mt-3 text-lg leading-tight font-semibold sm:text-xl">
                  {project.title}
                </h3>
                <div className="mt-1.5">
                  <ProjectStatusBadge
                    status={project.status}
                    label={project.statusLabel}
                  />
                </div>
                <p className="text-site-foreground/55 mt-2 line-clamp-3 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="relative mt-auto flex items-center justify-between gap-3 pt-4">
                  <TechIconStack stack={project.stack} />
                  <ArrowRight
                    aria-hidden="true"
                    size={20}
                    className="text-site-accent shrink-0 transition-transform duration-300 group-hover/card:translate-x-1"
                  />
                </div>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-site-foreground/50 mt-10 text-sm">
          Aucun projet ne correspond à ces critères.
        </p>
      )}

      {remainingCount > 0 ? (
        <div className="mt-7 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((current) => current + LOAD_MORE_COUNT)
            }
            className="font-identity bg-site-accent text-site-background focus-visible:ring-site-accent/50 focus-visible:ring-offset-site-background inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Voir plus de projets
            <ChevronDown aria-hidden="true" size={16} />
          </button>
          <p className="font-identity text-site-foreground/40 text-xs tracking-[0.08em] [font-variant-caps:small-caps]">
            {visibleProjects.length} projets sur {filteredProjects.length}{' '}
            affichés
          </p>
        </div>
      ) : null}
    </section>
  )
}
