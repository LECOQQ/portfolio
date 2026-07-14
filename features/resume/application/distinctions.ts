export type Distinction = {
  id: string
  period: string
  title: string
  organization: string
  description: string
}

/**
 * Awards, prizes, and recognition from internal and external initiatives.
 */
export const distinctions: Distinction[] = [
  {
    id: 'safran-mesh-intrapreneurship-2025',
    period: '2025 - 2026',
    title: 'Mesh - Programme Intrapreneuriat Safran',
    organization: 'Safran',
    description:
      'Sélectionné pour la phase finale du programme d’intrapreneuriat (top 5 / 100 projets) avec une initiative de plateforme distribuée de capteurs déployables low-cost et de traitement de données pour applications de défense.',
  },
  {
    id: 'safran-test-fly-2023',
    period: '2023',
    title: 'Test & Fly - Challenge Innovation Safran',
    organization: 'Safran',
    description:
      'Finaliste du concours d’innovation interne (top 5 / 180 projets) avec une approche Flight Testing as a Service basée sur la servicisation d’un modèle produit, expérimenté en interne avec un client pilote New Air Mobility.',
  },
]
