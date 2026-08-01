import { siteConfig } from '@/lib/site-config'

export type ContactSocial = {
  icon: 'github' | 'gitea' | 'linkedin' | 'makerworld'
  label: string
  href: string
  analyticsChannel: string
}

export type ContactFaqItem = {
  question: string
  answer: string
}

export type Contact = {
  eyebrow: string
  title: string
  description: string
  shortPitch: string
  location: string
  availabilityStatus: string
  email: string | undefined
  socials: ContactSocial[]
  faq: ContactFaqItem[]
}

export const contact: Contact = {
  eyebrow: 'Rester en contact',
  title: 'Une idée, un projet, une conversation ?',
  description:
    'Toujours partant pour échanger autour de software, de data, de défense ou de projets entrepreneuriaux.',
  shortPitch:
    'Un problème à explorer, une opportunité à discuter ou une idée à confronter ?',
  location: 'Basé à Rambouillet · Île-de-France · France · À distance',
  availabilityStatus: 'Disponible pour échanger',
  email: siteConfig.contactEmail,
  socials: [
    {
      icon: 'github',
      label: 'GitHub',
      href: siteConfig.profiles.github,
      analyticsChannel: 'github',
    },
    {
      icon: 'gitea',
      label: 'Gitea',
      href: siteConfig.profiles.gitea,
      analyticsChannel: 'gitea',
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      href: siteConfig.profiles.linkedin,
      analyticsChannel: 'linkedin',
    },
    {
      icon: 'makerworld',
      label: 'MakerWorld',
      href: siteConfig.profiles.makerWorld,
      analyticsChannel: 'makerworld',
    },
  ],
  faq: [
    {
      question: 'Pour quels sujets me contacter ?',
      answer:
        'Produits numériques, prototypage, logiciel, data, systèmes self-hosted, agents, ou projets entrepreneuriaux à structurer.',
    },
    {
      question: 'Sous quelle forme pouvons-nous collaborer ?',
      answer:
        'Mission ponctuelle, prototype, accompagnement produit, association sur un projet ou simple échange exploratoire.',
    },
    {
      question: 'Quel est le meilleur moyen de me joindre ?',
      answer:
        "L'e-mail pour poser un sujet clairement, LinkedIn pour une première prise de contact plus directe.",
    },
  ],
}
