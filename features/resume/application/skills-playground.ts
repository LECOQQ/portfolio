export type SkillsPlaygroundIcon = 'compass' | 'code' | 'cpu' | 'server'

export type SkillsPlaygroundCategory = {
  id: string
  icon: SkillsPlaygroundIcon
  title: string
  description: string
  groups: {
    label: string
    items: string[]
  }[]
}

export type SkillsPlayground = {
  eyebrow: string
  title: string
  description: string
  categories: SkillsPlaygroundCategory[]
}

/**
 * Editorial skill categories for the About page's "terrain de jeu"
 * section — grouped by domain rather than a flat chip list.
 */
export const skillsPlayground: SkillsPlayground = {
  eyebrow: 'compétences',
  title: 'Du concept au système',
  description:
    'Je relie stratégie produit, logiciel, systèmes embarqués et infrastructure pour transformer une idée en produit testable, déployable et utile.',
  categories: [
    {
      id: 'product',
      icon: 'compass',
      title: 'Produit & Stratégie',
      description:
        'Donner une direction au produit et aligner valeur, marché et parties prenantes.',
      groups: [
        {
          label: 'Produit',
          items: [
            'Vision produit',
            'Proposition de valeur',
            'Positionnement & storytelling',
          ],
        },
        {
          label: 'Marché',
          items: [
            'Go-to-market & partenariats',
            'Alignement des parties prenantes',
          ],
        },
      ],
    },
    {
      id: 'software',
      icon: 'code',
      title: 'Software',
      description:
        'Workflows modernes : développement assisté par IA, CI/CD et automatisation.',
      groups: [
        {
          label: 'Langage & Frameworks',
          items: ['Python', 'FastAPI', 'Next.js', 'React'],
        },
        { label: 'Interface & données', items: ['TailwindCSS', 'SQLModel'] },
        {
          label: 'Workflows',
          items: ['Git', 'CI/CD', 'Bash', 'Codex', 'Claude Code'],
        },
      ],
    },
    {
      id: 'embedded',
      icon: 'cpu',
      title: 'Systèmes embarqués',
      description:
        'Rester proche du signal, du temps réel et des contraintes physiques.',
      groups: [
        { label: 'Bas niveau', items: ['C', 'FPGA', 'Drivers'] },
        { label: 'Systèmes', items: ['Temps réel', 'Réseau'] },
      ],
    },
    {
      id: 'infrastructure',
      icon: 'server',
      title: 'Infrastructure & Prototypage',
      description:
        'Donner vie à un concept, du POC à l’environnement capable de le faire fonctionner dans le réel.',
      groups: [
        { label: 'Développement', items: ['macOS'] },
        {
          label: 'Déploiement',
          items: ['Linux', 'Docker', 'Proxmox', 'Nginx'],
        },
        { label: 'Fabrication', items: ['CAO', '3D Printing', 'CNC'] },
      ],
    },
  ],
}
