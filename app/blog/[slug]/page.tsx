import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContentLayout } from '@/components/content-layout'
import {
  getAdjacentBlogPosts,
  getBlogPost,
  getBlogPosts,
} from '@/features/blog/application/posts'
import { PostNavigation } from '@/features/blog/ui/post-navigation'
import { createPageMetadata } from '@/lib/site-config'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getBlogPosts().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) return {}

  return createPageMetadata({
    title: post.title,
    description: post.description,
    canonical: `/blog/${post.slug}/`,
    type: 'article',
    publishedTime: post.publishedAt,
    ...(post.cover
      ? { image: { url: post.cover, alt: post.coverAlt ?? post.title } }
      : {}),
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) notFound()

  const adjacentPosts = getAdjacentBlogPosts(slug)

  const { default: PostContent } = await import(
    `../../../content/blog/${slug}.mdx`
  )

  return (
    <ContentLayout
      title={post.title}
      description={post.description}
      meta={`${post.typeLabel} · ${post.publishedAtLabel} · ${post.readingTimeLabel}`}
      back={{ href: '/blog', label: 'Retour aux écrits' }}
      {...(post.cover
        ? {
            cover: {
              src: post.cover,
              alt: post.coverAlt ?? '',
              ...(post.coverFocus ? { focus: post.coverFocus } : {}),
            },
          }
        : {})}
      footer={<PostNavigation {...adjacentPosts} />}
    >
      <PostContent />
    </ContentLayout>
  )
}
