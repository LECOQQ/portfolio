import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('editorial styles', () => {
  it('keeps Markdown emphasis in the site foreground palette', () => {
    const styles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8')

    expect(styles).toContain('--tw-prose-bold: var(--color-site-foreground);')
  })
})
