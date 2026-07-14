import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BlogPage from '@/app/blog/page'
import BlogPostPage, {
  generateMetadata,
  generateStaticParams,
} from '@/app/blog/[slug]/page'
import { getBlogPosts } from '@/features/blog/application/posts'
import { BlogIndex } from '@/features/blog/ui/blog-index'

describe('blog pages', () => {
  it('highlights the latest article and renders a three-card catalogue', () => {
    const posts = getBlogPosts()
    const latestPost = posts[0]
    expect(latestPost).toBeDefined()

    render(<BlogPage />)

    const featuredLink = screen.getByRole('link', {
      name: `Lire l’article à la une : ${latestPost!.title}`,
    })
    expect(featuredLink).toHaveAttribute('href', `/blog/${latestPost!.slug}`)
    expect(
      screen
        .getByRole('heading', { name: 'Écrits' })
        .closest('[data-particle-muted]'),
    ).toContainElement(featuredLink)

    const catalogue = screen.getByRole('list', {
      name: 'Catalogue des écrits',
    })
    expect(within(catalogue).getAllByRole('listitem')).toHaveLength(
      Math.min(3, posts.length),
    )
    expect(screen.getByText(`${posts.length} articles`)).toBeInTheDocument()
  })

  it('progressively reveals additional articles', () => {
    const posts = getBlogPosts()
    const lastPost = posts.at(-1)
    expect(lastPost).toBeDefined()

    render(
      <BlogIndex
        posts={[
          ...posts,
          {
            ...lastPost!,
            slug: 'article-supplementaire',
            title: 'Article supplémentaire',
            publishedAt: '2026-01-01',
          },
        ]}
      />,
    )

    const totalPosts = posts.length + 1
    expect(
      screen.getByText(`3 articles sur ${totalPosts} affichés`),
    ).toBeInTheDocument()
    fireEvent.click(
      screen.getByRole('button', { name: 'Voir plus d’articles' }),
    )
    expect(
      within(
        screen.getByRole('list', { name: 'Catalogue des écrits' }),
      ).getAllByRole('listitem'),
    ).toHaveLength(totalPosts)
  })

  it('searches, filters and sorts the article catalogue', () => {
    const posts = getBlogPosts()
    const searchTarget = posts.at(-1)
    expect(searchTarget).toBeDefined()

    render(<BlogPage />)

    const search = screen.getByRole('searchbox', {
      name: 'Rechercher un article',
    })
    const typeFilter = screen.getByRole('combobox', {
      name: 'Filtrer par type',
    })
    const dateSort = screen.getByRole('combobox', {
      name: 'Trier par date de publication',
    })
    const catalogue = screen.getByRole('list', {
      name: 'Catalogue des écrits',
    })

    fireEvent.change(search, { target: { value: searchTarget!.title } })
    expect(screen.getByText('1 article')).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: new RegExp(searchTarget!.title, 'i'),
      }),
    ).toBeInTheDocument()

    fireEvent.change(search, { target: { value: '' } })
    fireEvent.click(typeFilter)
    for (const label of [
      'Article',
      'Note',
      'Tutoriel',
      "Retour d'expérience",
      'Veille',
      'Essai',
    ]) {
      expect(screen.getByRole('option', { name: label })).toBeInTheDocument()
    }
    const typeTarget = posts[0]
    expect(typeTarget).toBeDefined()
    fireEvent.click(screen.getByRole('option', { name: typeTarget!.typeLabel }))
    expect(
      within(catalogue).getByRole('link', {
        name: new RegExp(typeTarget!.title, 'i'),
      }),
    ).toBeInTheDocument()

    fireEvent.click(typeFilter)
    fireEvent.click(screen.getByRole('option', { name: 'Tous les types' }))
    fireEvent.click(dateSort)
    fireEvent.click(screen.getByRole('option', { name: 'Plus anciens' }))

    expect(within(catalogue).getAllByRole('link')[0]).toHaveAccessibleName(
      new RegExp(posts.at(-1)!.title, 'i'),
    )
  })

  it('pre-generates one route per MDX article', () => {
    expect(generateStaticParams()).toEqual(
      getBlogPosts().map(({ slug }) => ({ slug })),
    )
  })

  it('builds route-aware metadata and renders the selected MDX article', async () => {
    const post = getBlogPosts().at(-1)
    expect(post).toBeDefined()
    const params = Promise.resolve({ slug: post!.slug })

    await expect(generateMetadata({ params })).resolves.toMatchObject({
      title: post!.title,
      alternates: { canonical: `/blog/${post!.slug}/` },
      openGraph: {
        type: 'article',
        title: `${post!.title} - Quentin Lecoq`,
        url: `/blog/${post!.slug}/`,
      },
      twitter: {
        title: `${post!.title} - Quentin Lecoq`,
      },
    })

    render(await BlogPostPage({ params }))
    expect(
      screen.getByRole('heading', {
        name: post!.title,
      }),
    ).toBeInTheDocument()
  })

  it('renders an article cover', async () => {
    const post = getBlogPosts().find(({ cover }) => cover)
    if (!post?.cover || !post.coverAlt) {
      throw new Error('Expected at least one article with an accessible cover.')
    }
    const params = Promise.resolve({ slug: post.slug })

    render(await BlogPostPage({ params }))

    expect(
      screen.getAllByRole('img', { name: post.coverAlt })[0],
    ).toHaveAttribute('src', post.cover)
  })

  it('applies the configured focal point to an article cover', async () => {
    const post = getBlogPosts().find(({ coverFocus }) => coverFocus)
    if (!post?.coverAlt || !post.coverFocus) {
      throw new Error('Expected at least one article with a cover focal point.')
    }

    render(await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) }))

    expect(screen.getByRole('img', { name: post.coverAlt })).toHaveStyle({
      objectPosition: `${post.coverFocus.x}% ${post.coverFocus.y}%`,
    })
  })

  it('links to the chronologically previous and next articles', async () => {
    const posts = getBlogPosts()
    expect(posts.length).toBeGreaterThanOrEqual(3)
    const currentPost = posts[1]!
    const params = Promise.resolve({ slug: currentPost.slug })

    render(await BlogPostPage({ params }))

    expect(
      screen.getByRole('link', {
        name: `Article précédent : ${posts[2]!.title}`,
      }),
    ).toHaveAttribute('href', `/blog/${posts[2]!.slug}`)
    expect(
      screen.getByRole('link', {
        name: `Article suivant : ${posts[0]!.title}`,
      }),
    ).toHaveAttribute('href', `/blog/${posts[0]!.slug}`)
  })
})
