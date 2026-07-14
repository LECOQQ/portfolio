import type { NextConfig } from 'next'
import createMDX from '@next/mdx'
import { remarkPluginSpecifiers, rehypePluginSpecifiers } from './mdx.config'

const nextConfig: NextConfig = {
  devIndicators: false,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

// Plugins are declared as module-specifier strings (not function
// references) because Turbopack requires JSON-serializable loader options.
// See mdx.config.ts for the full rationale.
const withMDX = createMDX({
  options: {
    remarkPlugins: remarkPluginSpecifiers,
    rehypePlugins: rehypePluginSpecifiers,
  },
})

export default withMDX(nextConfig)
