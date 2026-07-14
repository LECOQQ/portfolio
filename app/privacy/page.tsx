import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ContentLayout } from '@/components/content-layout'
import {
  legalFrontmatterSchema,
  parseFrontmatter,
} from '@/lib/content-frontmatter'
import { estimateReadingTime } from '@/lib/reading-time'
import { createPageMetadata } from '@/lib/site-config'
import PrivacyContent, {
  frontmatter as rawFrontmatter,
} from '@/content/legal/privacy.mdx'

const frontmatter = parseFrontmatter(
  legalFrontmatterSchema,
  rawFrontmatter,
  'content/legal/privacy.mdx',
)

export const metadata = createPageMetadata({
  title: frontmatter.title,
  description: frontmatter.description,
  canonical: '/privacy/',
})

// `timeZone: 'UTC'` avoids an off-by-one day when the build server's local
// timezone lags behind UTC, since `updatedAt` parses as UTC midnight.
const updatedAtLabel = new Date(frontmatter.updatedAt).toLocaleDateString(
  'fr-FR',
  { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' },
)
const privacySource = readFileSync(
  join(process.cwd(), 'content/legal/privacy.mdx'),
  'utf8',
)
const readingTimeLabel = estimateReadingTime(privacySource).label

export default function PrivacyPage() {
  return (
    <ContentLayout
      title={frontmatter.title}
      description={frontmatter.description}
      meta={`Dernière mise à jour : ${updatedAtLabel} · ${readingTimeLabel}`}
    >
      <PrivacyContent />
    </ContentLayout>
  )
}
