import type { MDXComponents } from 'mdx/types'
import { Blockquote } from '@/components/mdx/blockquote'
import { CodeBlock, InlineCode } from '@/components/mdx/code-block'
import { EditorialImage } from '@/components/mdx/editorial-image'
import { Heading } from '@/components/mdx/heading'
import { KeyTakeaways } from '@/components/mdx/key-takeaways'
import { MdxImage } from '@/components/mdx/image'
import { MdxLink } from '@/components/mdx/link'
import { Quote } from '@/components/mdx/quote'

/**
 * Required by @next/mdx to render MDX content in the App Router. Only maps
 * the elements owned by primitives (headings, links, images, code,
 * blockquotes) — everything else (p, ul, ol, li, hr, tables) falls back to
 * native HTML, styled by Tailwind Typography (see app/globals.css).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <Heading level={1} {...props} />,
    h2: (props) => <Heading level={2} {...props} />,
    h3: (props) => <Heading level={3} {...props} />,
    h4: (props) => <Heading level={4} {...props} />,
    a: MdxLink,
    img: MdxImage,
    pre: CodeBlock,
    code: InlineCode,
    blockquote: Blockquote,
    EditorialImage,
    KeyTakeaways,
    Quote,
    ...components,
  }
}
