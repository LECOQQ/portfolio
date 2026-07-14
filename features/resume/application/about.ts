export type AboutHeroAchievementIcon = 'award' | 'lightbulb' | 'book-open'

export type AboutHeroAchievement = {
  id: string
  icon: AboutHeroAchievementIcon
  /** Headline figure, e.g. "Top 5" or "6". Rendered as a title. */
  value: string
  label: string
}

export type AboutHeroTraitIcon = 'cpu' | 'map-pin' | 'hammer' | 'rocket'

export type AboutHeroTrait = {
  id: string
  icon: AboutHeroTraitIcon
  /** Short title, e.g. "ingénieur" or "maker", lowercase for uniform small-caps rendering. */
  title: string
  description: string
}

export type AboutHero = {
  eyebrow: string
  /** Big hero title — edit freely, it's just a headline, not structured data. */
  title: string
  /** Intro paragraph lines, each rendered on its own line — edit freely alongside `title`. */
  body: string[]
  photo: { src: string; alt: string }
  achievements: AboutHeroAchievement[]
  traits: AboutHeroTrait[]
}

export type About = {
  hero: AboutHero
}

/**
 * Editorial content of the About page hero. `title` and `body` are the two
 * fields meant to be tweaked on the fly — everything else (experiences,
 * education, publications…) lives in its own resume module.
 */
export const about: About = {
  hero: {
    eyebrow: 'à propos',
    title: 'Des idées aux produits',
    body: [
      'Ingénieur de formation, je construis à l’intersection du logiciel, des systèmes et du produit.',
      'Aujourd’hui, je développe Mesh, projet intrapreneurial chez Safran.',
    ],
    photo: {
      src: '/images/identity/pro-1.png',
      alt: 'Portrait de Quentin Lecoq',
    },
    achievements: [
      {
        id: 'mesh-intrapreneurship',
        icon: 'award',
        value: 'Lauréat',
        label: 'Programme intrapreneurial Safran',
      },
      {
        id: 'invention-declarations',
        icon: 'lightbulb',
        value: '6',
        label: 'Inventions déclarées',
      },
      {
        id: 'conference-papers',
        icon: 'book-open',
        value: '4',
        label: 'Publications internationales',
      },
    ],
    traits: [
      {
        id: 'engineer',
        icon: 'cpu',
        title: 'ingénieur',
        description: 'Software · Embedded',
      },
      {
        id: 'product-builder',
        icon: 'rocket',
        title: 'product builder',
        description: 'Problème · Prototype · Marché',
      },
      {
        id: 'maker',
        icon: 'hammer',
        title: 'maker',
        description: 'Homelab · 3D Printing · CNC',
      },
      {
        id: 'location',
        icon: 'map-pin',
        title: 'île-de-france',
        description: 'Français · Anglais courant',
      },
    ],
  },
}
