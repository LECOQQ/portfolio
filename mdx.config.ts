import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'

/**
 * Single source of truth for the MDX remark/rehype pipeline, shared between
 * the Next.js build (next.config.ts, webpack/Turbopack) and Vitest
 * (vitest.config.ts, Rollup) so both compile content identically.
 */
export const remarkPlugins = [
  remarkFrontmatter,
  remarkMdxFrontmatter,
  remarkGfm,
]

export const rehypePlugins = [rehypeSlug]

/**
 * Turbopack-only representation of the same pipeline, as module-specifier
 * strings instead of live function references.
 *
 * `@next/mdx`'s loader (mdx-js-loader.js) hands its options to Turbopack's
 * Rust process, which requires plain JSON-serializable values; live
 * function imports fail with "does not have serializable options". The
 * loader resolves string specifiers itself via a dynamic `import()`, so
 * this list must name the exact same packages as `remarkPlugins`/
 * `rehypePlugins` above. Vitest (Rollup) has no such boundary and keeps
 * using the function-based exports directly.
 */
export const remarkPluginSpecifiers = [
  'remark-frontmatter',
  'remark-mdx-frontmatter',
  'remark-gfm',
]

export const rehypePluginSpecifiers = ['rehype-slug']
