import { describe, expect, it } from 'vitest'
import {
  blogFrontmatterSchema,
  legalFrontmatterSchema,
  parseFrontmatter,
  projectFrontmatterSchema,
} from '@/lib/content-frontmatter'

describe('parseFrontmatter', () => {
  it('accepts valid legal frontmatter', () => {
    const frontmatter = parseFrontmatter(
      legalFrontmatterSchema,
      {
        title: 'Confidentialité',
        description: 'Politique de confidentialité du site.',
        updatedAt: '2026-07-04',
      },
      'content/legal/privacy.mdx',
    )

    expect(frontmatter).toEqual({
      title: 'Confidentialité',
      description: 'Politique de confidentialité du site.',
      updatedAt: '2026-07-04',
    })
  })

  it('accepts valid blog frontmatter', () => {
    const frontmatter = parseFrontmatter(
      blogFrontmatterSchema,
      {
        title: 'Un article',
        description: "Résumé de l'article.",
        publishedAt: '2026-01-15',
        tags: ['next', 'mdx'],
        type: 'article',
        cover: '/images/blog/un-article/cover.webp',
        coverAlt: "Couverture de l'article.",
        coverFocus: { x: 55, y: 28 },
      },
      'content/blog/un-article.mdx',
    )

    expect(frontmatter.tags).toEqual(['next', 'mdx'])
    expect(frontmatter.type).toBe('article')
    expect(frontmatter.coverFocus).toEqual({ x: 55, y: 28 })
  })

  it('rejects a GIF blog cover', () => {
    expect(() =>
      parseFrontmatter(
        blogFrontmatterSchema,
        {
          title: 'Un article',
          description: "Résumé de l'article.",
          publishedAt: '2026-01-15',
          tags: [],
          type: 'article',
          cover: '/images/blog/un-article/demo.gif',
        },
        'content/blog/un-article.mdx',
      ),
    ).toThrowError(/cover/)
  })

  it('rejects cover focus coordinates outside the image bounds', () => {
    expect(() =>
      parseFrontmatter(
        blogFrontmatterSchema,
        {
          title: 'Un article',
          description: "Résumé de l'article.",
          publishedAt: '2026-01-15',
          tags: [],
          type: 'article',
          coverFocus: { x: 101, y: -1 },
        },
        'content/blog/un-article.mdx',
      ),
    ).toThrowError(/coverFocus/)
  })

  it('throws an actionable error listing every invalid field', () => {
    expect(() =>
      parseFrontmatter(
        legalFrontmatterSchema,
        { title: '', updatedAt: 'not-a-date' },
        'content/legal/privacy.mdx',
      ),
    ).toThrowError(/content\/legal\/privacy\.mdx/)
  })

  it('rejects a missing required field', () => {
    expect(() =>
      parseFrontmatter(legalFrontmatterSchema, {}, 'content/legal/privacy.mdx'),
    ).toThrowError(/title/)
  })

  it('accepts valid project frontmatter', () => {
    const frontmatter = parseFrontmatter(
      projectFrontmatterSchema,
      {
        title: 'Un projet',
        description: 'Résumé du projet.',
        publishedAt: '2026-01-15',
        stack: ['Next.js', 'TypeScript'],
        type: 'produit',
        status: 'in-progress',
      },
      'content/projects/un-projet.mdx',
    )

    expect(frontmatter.status).toBe('in-progress')
    expect(frontmatter.stack).toEqual(['Next.js', 'TypeScript'])
  })

  it('rejects an invalid project status', () => {
    expect(() =>
      parseFrontmatter(
        projectFrontmatterSchema,
        {
          title: 'Un projet',
          description: 'Résumé du projet.',
          publishedAt: '2026-01-15',
          stack: [],
          type: 'produit',
          status: 'archived',
        },
        'content/projects/un-projet.mdx',
      ),
    ).toThrowError(/status/)
  })

  it('rejects a GIF project cover', () => {
    expect(() =>
      parseFrontmatter(
        projectFrontmatterSchema,
        {
          title: 'Un projet',
          description: 'Résumé du projet.',
          publishedAt: '2026-01-15',
          stack: [],
          type: 'produit',
          status: 'in-progress',
          cover: '/images/projects/un-projet/demo.gif',
        },
        'content/projects/un-projet.mdx',
      ),
    ).toThrowError(/cover/)
  })

  it('rejects an invalid project type', () => {
    expect(() =>
      parseFrontmatter(
        projectFrontmatterSchema,
        {
          title: 'Un projet',
          description: 'Résumé du projet.',
          publishedAt: '2026-01-15',
          stack: [],
          type: 'inconnu',
          status: 'in-progress',
        },
        'content/projects/un-projet.mdx',
      ),
    ).toThrowError(/type/)
  })
})
