import { z } from 'zod'

/**
 * ISO 8601 calendar date (AAAA-MM-JJ), e.g. "2026-07-04". Kept as a plain
 * string (not `z.coerce.date()`) so frontmatter stays human-readable and
 * timezone-agnostic; formatting for display happens where it's rendered.
 */
export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'La date doit être au format ISO (AAAA-MM-JJ).')

const baseContentFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

export const legalFrontmatterSchema = baseContentFrontmatterSchema.extend({
  updatedAt: isoDateSchema,
})

export const blogPostTypeSchema = z.enum([
  'article',
  'note',
  'tutoriel',
  'rex',
  'veille',
  'essai',
])

export type BlogPostType = z.infer<typeof blogPostTypeSchema>

export const coverFocusSchema = z.object({
  x: z.number().min(0).max(100),
  y: z.number().min(0).max(100),
})

export type CoverFocus = z.infer<typeof coverFocusSchema>

/**
 * `cover` skips the responsive-image pipeline (generate-responsive-images.mjs)
 * and next/image's variant loader for anything that isn't a still raster
 * format — a GIF would silently ship unresized and unbudgeted on every card
 * that renders it. Animated assets belong in the MDX body instead, via the
 * plain `<img>` MDX renders content through.
 */
const staticCoverSchema = z.string().refine((value) => !/\.gif$/i.test(value), {
  message:
    'La cover doit être une image statique (pas de .gif : le pipeline responsive ne la traite pas). Placez le GIF dans le corps du contenu.',
})

export const blogFrontmatterSchema = baseContentFrontmatterSchema.extend({
  publishedAt: isoDateSchema,
  tags: z.array(z.string()),
  type: blogPostTypeSchema,
  cover: staticCoverSchema.optional(),
  coverAlt: z.string().min(1).optional(),
  coverFocus: coverFocusSchema.optional(),
})

export const projectStatusSchema = z.enum(['done', 'in-progress', 'on-hold'])

export type ProjectStatus = z.infer<typeof projectStatusSchema>

export const projectTypeSchema = z.enum([
  'infrastructure',
  'produit',
  'open-source',
  'experimentation',
])

export type ProjectType = z.infer<typeof projectTypeSchema>

export const projectFrontmatterSchema = baseContentFrontmatterSchema.extend({
  publishedAt: isoDateSchema,
  stack: z.array(z.string()),
  type: projectTypeSchema,
  status: projectStatusSchema,
  statusLabel: z.string().min(1).optional(),
  featured: z.boolean().default(false),
  /** Marks the single project shown in the /projects hero card. At most one
   * project should set this — authoring picks it explicitly rather than
   * deriving it from recency, like the blog's featured post does. */
  spotlight: z.boolean().default(false),
  link: z.string().url().optional(),
  cover: staticCoverSchema.optional(),
  coverAlt: z.string().min(1).optional(),
  coverFocus: coverFocusSchema.optional(),
})

/**
 * Validates raw MDX frontmatter (exported by remark-mdx-frontmatter as the
 * `frontmatter` binding) against the given schema. Content is authored by
 * the repository maintainer, not end users, so an invalid frontmatter is a
 * build-time content error: it throws immediately with an actionable,
 * per-field message instead of letting a malformed page render silently.
 */
export function parseFrontmatter<Schema extends z.ZodType>(
  schema: Schema,
  raw: unknown,
  sourcePath: string,
): z.infer<Schema> {
  const result = schema.safeParse(raw)

  if (!result.success) {
    const issues = result.error.issues
      .map(
        (issue) => `- ${issue.path.join('.') || '(racine)'} : ${issue.message}`,
      )
      .join('\n')

    throw new Error(`Frontmatter invalide dans ${sourcePath} :\n${issues}`)
  }

  return result.data
}
