import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProjectsPage from '@/app/projects/page'
import { getProjects } from '@/features/projects/application/projects'
import { PROJECT_STATUS_LABELS } from '@/features/projects/ui/project-status'
import { ProjectsIndex } from '@/features/projects/ui/projects-index'

describe('projects page', () => {
  it('highlights the spotlight project in the hero', () => {
    const projects = getProjects()
    const spotlightProject = projects.find((project) => project.spotlight)
    expect(spotlightProject).toBeDefined()

    render(<ProjectsPage />)

    const spotlightLink = screen.getByRole('link', {
      name: `Voir le projet à la une : ${spotlightProject!.title}`,
    })
    expect(spotlightLink).toHaveAttribute(
      'href',
      `/projects/${spotlightProject!.slug}`,
    )
    expect(
      screen
        .getByRole('heading', { name: 'Projets' })
        .closest('[data-particle-muted]'),
    ).toContainElement(spotlightLink)
  })

  it('lists every project in the catalogue grid', () => {
    const projects = getProjects()

    render(<ProjectsPage />)

    const catalogue = screen.getByRole('list', {
      name: 'Catalogue des projets',
    })
    expect(within(catalogue).getAllByRole('listitem')).toHaveLength(
      Math.min(3, projects.length),
    )
    expect(screen.getByText(`${projects.length} projets`)).toBeInTheDocument()
  })

  it('progressively reveals additional projects', () => {
    const projects = getProjects()
    const lastProject = projects.at(-1)
    expect(lastProject).toBeDefined()

    const extraProjects = [1, 2].map((n) => ({
      ...lastProject!,
      slug: `projet-supplementaire-${n}`,
      title: `Projet supplémentaire ${n}`,
      publishedAt: '2026-01-01',
    }))

    render(<ProjectsIndex projects={[...projects, ...extraProjects]} />)

    const totalProjects = projects.length + extraProjects.length
    expect(
      screen.getByText(`3 projets sur ${totalProjects} affichés`),
    ).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: 'Voir plus de projets' }),
    )
    expect(
      within(
        screen.getByRole('list', { name: 'Catalogue des projets' }),
      ).getAllByRole('listitem'),
    ).toHaveLength(totalProjects)
  })

  it('filters the catalogue by type and by status', () => {
    const projects = getProjects()
    const typeTarget = projects[0]!

    render(<ProjectsPage />)

    const catalogue = screen.getByRole('list', {
      name: 'Catalogue des projets',
    })

    fireEvent.click(screen.getByRole('button', { name: typeTarget.typeLabel }))
    const typeFilteredCount = projects.filter(
      (project) => project.type === typeTarget.type,
    ).length
    expect(within(catalogue).getAllByRole('listitem')).toHaveLength(
      Math.min(3, typeFilteredCount),
    )
    expect(
      within(catalogue).getByRole('link', { name: typeTarget.title }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Tous' }))

    const statusFilter = screen.getByRole('combobox', {
      name: 'Filtrer par statut',
    })
    fireEvent.click(statusFilter)
    for (const label of ['Terminé', 'En cours de développement', 'En pause']) {
      expect(screen.getByRole('option', { name: label })).toBeInTheDocument()
    }

    const statusTarget = projects[0]!
    const statusFilteredCount = projects.filter(
      (project) => project.status === statusTarget.status,
    ).length
    fireEvent.click(
      screen.getByRole('option', {
        name: PROJECT_STATUS_LABELS[statusTarget.status],
      }),
    )
    expect(within(catalogue).getAllByRole('listitem')).toHaveLength(
      Math.min(3, statusFilteredCount),
    )
  })
})
