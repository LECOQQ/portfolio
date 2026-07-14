declare module '*.mdx' {
  import type { ComponentType } from 'react'
  import type { MDXProps } from 'mdx/types'

  export const frontmatter: Record<string, unknown>

  const MDXContent: ComponentType<MDXProps>
  export default MDXContent
}
