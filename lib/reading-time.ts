const DEFAULT_WORDS_PER_MINUTE = 220

export type ReadingTime = {
  wordCount: number
  minutes: number
  label: string
}

/** Estimates French editorial reading time from a Markdown or MDX source. */
export function estimateReadingTime(
  source: string,
  wordsPerMinute = DEFAULT_WORDS_PER_MINUTE,
): ReadingTime {
  if (!Number.isFinite(wordsPerMinute) || wordsPerMinute <= 0) {
    throw new Error(
      'Reading speed must be a positive number of words per minute.',
    )
  }

  const readableText = source
    .replace(/^---[\s\S]*?---\s*/u, '')
    .replace(/```[\s\S]*?```/gu, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/gu, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/<[^>]+>/gu, ' ')
  const wordCount =
    readableText.match(/[\p{L}\p{N}][\p{L}\p{M}\p{N}'’.-]*/gu)?.length ?? 0
  const exactMinutes = wordCount / wordsPerMinute
  const minutes = Math.max(1, Math.ceil(exactMinutes))

  return {
    wordCount,
    minutes,
    label:
      exactMinutes < 1
        ? 'Moins d’une minute de lecture'
        : `${minutes} min de lecture`,
  }
}
