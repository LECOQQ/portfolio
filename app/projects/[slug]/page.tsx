import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentLayout } from '@/components/content-layout'
import {
  getProject,
  getProjects,
} from '@/features/projects/application/projects'
import { createPageMetadata } from '@/lib/site-config'

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getProjects().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) return {}

  return createPageMetadata({
    title: project.title,
    description: project.description,
    canonical: `/projects/${project.slug}/`,
    type: 'article',
    publishedTime: project.publishedAt,
    ...(project.cover
      ? {
          image: {
            url: project.cover,
            alt: project.coverAlt ?? project.title,
          },
        }
      : {}),
  })
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) notFound()

  const { default: ProjectContent } = await import(
    `../../../content/projects/${slug}.mdx`
  )

  return (
    <ContentLayout
      title={project.title}
      description={project.description}
      meta={project.publishedAtLabel}
      back={{ href: '/projects', label: 'Retour aux projets' }}
      {...(project.cover
        ? {
            cover: {
              src: project.cover,
              alt: project.coverAlt ?? '',
              ...(project.coverFocus ? { focus: project.coverFocus } : {}),
            },
          }
        : {})}
    >
      <ProjectContent />
    </ContentLayout>
  )
}
