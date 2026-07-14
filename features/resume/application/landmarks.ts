import { education } from '@/features/resume/application/education'
import { publications } from '@/features/resume/application/publications'

export type LandmarkInterestIcon = 'terminal' | 'book-open' | 'hexagon'

export type LandmarkInterest = {
  id: string
  icon: LandmarkInterestIcon
  title: string
  description: string
}

/**
 * Editorial selection for the About page's landmarks section. Full resume
 * datasets remain canonical; this module only chooses what the preview shows.
 */
export const landmarks = {
  eyebrow: 'repères',
  description:
    'Quelques repères pour comprendre ce qui nourrit ma manière de construire.',
  degrees: education.filter((entry) => entry.type === 'degree'),
  additionalPrograms: education.filter(
    (entry) => entry.id === 'ihedn-cycle-jeunes-2025',
  ),
  latestPublications: publications.slice(0, 3),
  remainingPublications: publications.slice(3),
  interests: [
    {
      id: 'self-hosting',
      icon: 'terminal',
      title: 'Self-hosting',
      description: 'Héberger mes services et automatiser mon infrastructure.',
    },
    {
      id: 'reading',
      icon: 'book-open',
      title: 'Lectures',
      description: 'Histoire, Stratégie, Science-Fiction et Technologie.',
    },
    {
      id: 'strategy-games',
      icon: 'hexagon',
      title: 'Jeux de stratégie',
      description: '4X, Grande Stratégie, RTS.',
    },
  ] satisfies LandmarkInterest[],
} as const
