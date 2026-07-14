import { describe, expect, it } from 'vitest'
import { estimateReadingTime } from '@/lib/reading-time'

describe('estimateReadingTime', () => {
  it('ignores frontmatter and Markdown link destinations', () => {
    const result = estimateReadingTime(
      `---\ntitle: Hidden metadata\n---\nBonjour [le monde](https://example.com).`,
      2,
    )

    expect(result.wordCount).toBe(3)
    expect(result).toMatchObject({ minutes: 2, label: '2 min de lecture' })
  })

  it('labels short content as less than one minute', () => {
    expect(estimateReadingTime('Un texte très court.')).toMatchObject({
      minutes: 1,
      label: 'Moins d’une minute de lecture',
    })
  })

  it('rejects an invalid reading speed', () => {
    expect(() => estimateReadingTime('Texte', 0)).toThrow(
      'Reading speed must be a positive number of words per minute.',
    )
  })
})
