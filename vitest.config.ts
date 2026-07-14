import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import path from 'path'
import { remarkPlugins, rehypePlugins } from './mdx.config'

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins,
        rehypePlugins,
        providerImportSource: path.resolve(__dirname, 'mdx-components.tsx'),
      }),
    },
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    globals: true,
    passWithNoTests: true,
    projects: [
      {
        extends: true,
        test: {
          name: 'dom',
          environment: 'jsdom',
          setupFiles: ['./vitest.setup.ts'],
          include: ['tests/**/*.{test,spec}.{tsx,jsx}'],
        },
      },
      {
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          setupFiles: ['./vitest.setup.ts'],
          include: ['tests/**/*.{test,spec}.{ts,js}'],
        },
      },
    ],
  },
})
