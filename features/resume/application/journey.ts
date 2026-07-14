export type JourneyDotTone = 'live' | 'accent' | 'muted'

export type JourneyChapter = {
  id: string
  number: string
  title: string
  period: string
  company: string
  role: string
  summary: string
  points: string[]
  tags?: string[]
  dot: JourneyDotTone
  current?: boolean
  illustration?: { src: string; alt: string }
}

/**
 * Three-chapter narrative for the About page's "temps forts" section,
 * editorial rather than a literal restatement of `professionalExperiences` (the
 * full CV list further down the page covers that in detail).
 */
export const journeyChapters: JourneyChapter[] = [
  {
    id: 'mesh',
    number: '01',
    title: 'Transformer une idée en activité',
    period: 'depuis 2026',
    company: 'Mesh · Safran',
    role: 'Intrapreneur · Product & Platform Lead',
    summary:
      'Passage d’un concept hardware à une plateforme souveraine combinant sensing distribué, software, data et intelligence opérationnelle.',
    points: [
      'Vision produit & architecture plateforme',
      'Proposition de valeur & marché & go-to-market',
    ],
    tags: [
      'Product Strategy',
      'Platform Architecture',
      'Software & Data',
      'Go-to-Market',
    ],
    dot: 'live',
    current: true,
    illustration: {
      src: '/images/about/mesh-balise.svg',
      alt: 'Illustration isométrique de la balise Mesh',
    },
  },
  {
    id: 'safran-data-systems',
    number: '02',
    title: 'Relier technologie, produit et marché',
    period: '2022 - 2026',
    company: 'Safran Data Systems',
    role: 'Ingénieur Innovation',
    summary:
      'J’ai conçu des solutions logicielles embarquées pour la télémesure, tout en explorant de nouvelles applications dans le New Space et le New Défense.',
    points: [
      'Développement de logiciels, firmwares et démonstrateurs pour systèmes critiques',
      'Études de marché, clients et ouverture de nouveaux segments',
    ],
    tags: ['Embedded Software', 'Product Innovation', 'Market Exploration'],
    dot: 'accent',
    illustration: {
      src: '/images/about/xma.svg',
      alt: 'Illustration isométrique du module XMA Safran Data Systems',
    },
  },
  {
    id: 'debuts',
    number: '03',
    title: 'Apprendre par le prototype',
    period: '2021 - 2022',
    company: 'Safran Data Systems',
    role: 'Stagiaire Ingénieur Innovation',
    summary:
      'Premiers travaux sur l’instrumentation aéronautique et les architectures bas niveau appliqués à la radio logicielle.',
    points: [
      'Instrumentation d’un avion bas-carbone',
      'Synchronisation matérielle de radios logicielles',
    ],
    tags: ['Embedded Systems', 'Instrumentation', 'Temps réel'],
    dot: 'muted',
  },
]
