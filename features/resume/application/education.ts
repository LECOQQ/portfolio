export type Education = {
  id: string
  period: string
  title: string
  subtitle: string
  institution: string
  /** 'degree' = diplôme académique, 'program' = formation courte ou cycle spécialisé */
  type: 'degree' | 'program'
}

/**
 * Academic degrees and specialized programs, ordered from most recent to oldest.
 */
export const education: Education[] = [
  {
    id: 'ihedn-cycle-jeunes-2025',
    period: '2025',
    title: '157e Cycle Jeunes',
    subtitle: 'Auditeur Jeune',
    institution: 'IHEDN',
    type: 'program',
  },
  {
    id: 'eurosae-essais-2024',
    period: '2024',
    title: 'Techniques d’Essais dans l’Aéronautique',
    subtitle: 'Perfectionnement',
    institution: 'EUROSAE',
    type: 'program',
  },
  {
    id: 'ip-paris-master-2022',
    period: '2021 - 2022',
    title: 'Embedded Systems & Signal Processing',
    subtitle: 'M2',
    institution: 'Université Paris-Saclay · IP Paris · CEA',
    type: 'degree',
  },
  {
    id: 'polytech-cycle-ingenieur-2021',
    period: '2018 - 2021',
    title: 'Électronique, Énergies, Systèmes',
    subtitle: 'Diplôme d’Ingénieur',
    institution: 'Polytech Paris-Saclay',
    type: 'degree',
  },
]
