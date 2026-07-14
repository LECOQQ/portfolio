export type SkillCategory = {
  id: string
  label: string
  items: string[]
}

export type Language = {
  id: string
  label: string
  level: string
  note?: string
}

export type Interest = {
  id: string
  label: string
  description: string
}

/**
 * Technical skill categories, ordered as displayed on the resume.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'system',
    label: 'Système',
    items: ['Architecture', 'Télémesure', 'Essais en vol'],
  },
  {
    id: 'software',
    label: 'Software',
    items: ['C/C++', 'Python', 'Git', 'CI/CD', 'Bash', 'LaTeX'],
  },
  {
    id: 'web',
    label: 'Web Stack',
    items: ['NextJS', 'TailwindCSS', 'FastAPI', 'SQLModel'],
  },
  {
    id: 'embedded',
    label: 'Embedded',
    items: ['VHDL', 'SoC', 'Bootloader', 'Kernel', 'Drivers'],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    items: ['Linux', 'Containers', 'Virtualisation', 'Nginx'],
  },
  {
    id: 'prototyping',
    label: 'Prototypage',
    items: ['Fusion 360', 'Blender', 'Fabrication additive'],
  },
]

/**
 * Languages spoken.
 */
export const languages: Language[] = [
  {
    id: 'fr',
    label: 'Français',
    level: 'Langue maternelle',
  },
  {
    id: 'en',
    label: 'Anglais',
    level: 'Courant',
    note: 'TOEIC 990/990',
  },
  {
    id: 'es',
    label: 'Espagnol',
    level: 'Scolaire',
  },
  {
    id: 'ru',
    label: 'Russe',
    level: 'Scolaire',
  },
]

/**
 * Personal interests and hobbies.
 */
export const interests: Interest[] = [
  {
    id: 'selfhosting',
    label: 'Self-Hosting',
    description: 'Homelab composé de plusieurs serveurs',
  },
  {
    id: 'making',
    label: 'Bricolage',
    description: 'Impression 3D, CNC et CAO',
  },
  {
    id: 'culture',
    label: 'Littérature',
    description: 'Histoire, Science-Fiction, Innovation & Tech',
  },
  {
    id: 'sport',
    label: 'Sport',
    description: 'Pratique régulière de la musculation',
  },
]
