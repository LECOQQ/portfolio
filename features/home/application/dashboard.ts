import { siteConfig } from '@/lib/site-config'

/**
 * Visual tone driving the status dot color in the hero card.
 */
export type DashboardStatusTone = 'available' | 'building'

export type DashboardHeroStatus = {
  label: string
  tone: DashboardStatusTone
}

/**
 * Short fact displayed between the photo and the status, e.g. location or timezone.
 */
export type DashboardHeroFactIcon = 'map-pin' | 'clock'

export type DashboardHeroFact = {
  icon: DashboardHeroFactIcon
  label: string
}

/**
 * Named group of short tags, e.g. personal playgrounds or professional focus areas.
 * A single icon represents the whole group, followed by its comma-separated items.
 */
export type DashboardHeroTagGroupIcon = 'maker' | 'defense'

export type DashboardHeroTagGroup = {
  ariaLabel: string
  icon: DashboardHeroTagGroupIcon
  items: string[]
}

export type DashboardHeroContactIcon =
  'github' | 'gitea' | 'linkedin' | 'makerworld' | 'mail'

export type DashboardHeroContact = {
  icon: DashboardHeroContactIcon
  label: string
  href: string
  external: boolean
  /** Umami event channel; omitted for internal navigation entries. */
  analyticsChannel?: string
}

export type DashboardHero = {
  photo: { src: string; alt: string }
  status: DashboardHeroStatus
  facts: DashboardHeroFact[]
  tagGroups: DashboardHeroTagGroup[]
  contacts: DashboardHeroContact[]
}

/**
 * Name split across two display lines, e.g. first name / last name.
 * Both are rendered in lowercase so small-caps keeps every letter
 * uniform in size, instead of growing a capitalized leading letter.
 */
export type DashboardIntroName = {
  lead: string
  accent: string
}

export type DashboardIntroCta = {
  label: string
  href: string
}

export type DashboardIntro = {
  eyebrow: string
  name: DashboardIntroName
  pitch: string
  description: string
  currentRole: string
  ctas: DashboardIntroCta[]
}

export type DashboardOverviewCardVariant =
  'experiences' | 'projects' | 'writings'

export type DashboardOverviewCard = {
  variant: DashboardOverviewCardVariant
  title: string
  cta: DashboardIntroCta
}

export type Dashboard = {
  hero: DashboardHero
  intro: DashboardIntro
  overview: DashboardOverviewCard[]
}

export const dashboard: Dashboard = {
  hero: {
    photo: {
      src: '/images/identity/quentin-lecoq.webp',
      alt: 'Portrait de Quentin Lecoq',
    },
    status: {
      label: "En train d'écrire la suite.",
      tone: 'available',
    },
    facts: [
      { icon: 'map-pin', label: 'France' },
      { icon: 'clock', label: 'Europe/Paris' },
    ],
    tagGroups: [
      {
        ariaLabel: 'Terrains professionnels',
        icon: 'defense',
        items: ['New Defense', 'Hacker culture'],
      },
      {
        ariaLabel: 'Terrains de jeu',
        icon: 'maker',
        items: ['Maker', 'Software', 'Self-hosted'],
      },
    ],
    contacts: [
      {
        icon: 'github',
        label: 'GitHub',
        href: siteConfig.profiles.github,
        external: true,
        analyticsChannel: 'github',
      },
      {
        icon: 'gitea',
        label: 'Gitea',
        href: siteConfig.profiles.gitea,
        external: true,
        analyticsChannel: 'gitea',
      },
      {
        icon: 'linkedin',
        label: 'LinkedIn',
        href: siteConfig.profiles.linkedin,
        external: true,
        analyticsChannel: 'linkedin',
      },
      {
        icon: 'makerworld',
        label: 'MakerWorld',
        href: siteConfig.profiles.makerWorld,
        external: true,
        analyticsChannel: 'makerworld',
      },
      {
        icon: 'mail',
        label: 'E-mail',
        href: siteConfig.contactEmail
          ? `mailto:${siteConfig.contactEmail}`
          : '/contact',
        external: false,
        analyticsChannel: 'email',
      },
    ],
  },
  intro: {
    eyebrow: 'software eats complexity',
    name: {
      lead: 'quentin',
      accent: 'lecoq',
    },
    pitch: 'Maker par goût. Software de métier. Self-hoster par principe.',
    description:
      "J'aime construire pour comprendre : des prototypes rapides, des systèmes concrets et, lorsque le problème le mérite, de vrais produits.",
    currentRole:
      'Je porte aujourd’hui un projet intrapreneurial comme Product & Platform Lead, mêlant stratégie, vision et logiciel pour atteindre le product-market fit.',
    ctas: [
      { label: 'Voir les projets', href: '/projects' },
      { label: 'Lire les écrits', href: '/blog' },
      { label: 'En apprendre plus sur moi', href: '/about' },
    ],
  },
  overview: [
    {
      variant: 'experiences',
      title: 'expériences récentes',
      cta: { label: 'Voir le parcours complet', href: '/about' },
    },
    {
      variant: 'projects',
      title: 'projets sélectionnés',
      cta: { label: 'Tous les projets', href: '/projects' },
    },
    {
      variant: 'writings',
      title: 'derniers écrits',
      cta: { label: 'Tous les écrits', href: '/blog' },
    },
  ],
}
