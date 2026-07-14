export type ProfessionalExperience = {
  id: string
  period: string
  company: string
  location: string
  role: string
  /** Optional recognition displayed before the one-line summary. */
  recognition?: string
  /** One-line summary used in the home card. */
  context: string
  /** Detailed bullet points used in the About page. */
  highlights?: string[]
  current?: boolean
}

/**
 * Canonical professional history, ordered from most recent to oldest.
 * Home consumes a short excerpt (slice 0–3); the About page uses the full list.
 */
export const professionalExperiences: ProfessionalExperience[] = [
  {
    id: 'safran-mesh-intrapreneur',
    period: 'depuis mars 2026',
    company: 'Mesh · Safran',
    location: 'Châteaufort',
    role: 'Intrapreneur - Product & Platform Lead',
    recognition: 'Lauréat du concours We Love Intrapreneurs',
    context:
      'Co-développement d’une plateforme souveraine d’intelligence du champ de bataille.',
    highlights: [
      'Structuration de la vision produit et plateforme ; transformation d’un concept hardware en infrastructure complète de sensing et de données',
      'Contribution à la stratégie business et marché : cas d’usage prioritaires, positionnement concurrentiel, modèle économique, go-to-market',
      'Contribution à l’architecture logicielle du démonstrateur : traitement distant, algorithmes de détection, dashboard opérationnel',
      'Construction de la narration stratégique et des pitchs exécutifs ; présentation auprès de décideurs Safran et lors d’Eurosatory 2026',
      'Validation du besoin auprès de forces armées et de parties prenantes du secteur défense',
      'Co-inventeur de six déclarations d’invention déposées en vue d’une protection par brevet',
    ],
    current: true,
  },
  {
    id: 'safran-innovation-engineer',
    period: '2022 - 2026',
    company: 'Safran Data Systems',
    location: 'Les Ulis',
    role: 'Ingénieur Innovation',
    context:
      'R&T, innovation produit et développement logiciel/firmware pour systèmes d’essais et de télémesure spatiaux et de défense.',
    highlights: [
      'TSN : développement logiciel (Python) et banc d’essai autour des standards réseau temps réel Ethernet TSN pour systèmes embarqués critiques',
      'TmNS : solution logicielle (C embarqué) temps réel au standard IRIG-106 sur SoC Xilinx, intégrée au produit phare et présentée lors de démonstrations clients ayant ouvert de nouveaux marchés US',
      'Smart RadTol : étude radiative et PoC de gestion SEL/SEU ; firmware FPGA (VHDL, Spartan 6) pour communication Ethernet IENA rad-tol',
      'Single-Board CMA : étude de réduction de coût de 70 % du produit phare par changement de facteur de forme',
      'Prestations techniques (C embarqué) et formations pour Boeing Military, NASA et Blue Origin',
      'Projets européens : SALTO (Horizon Europe, lanceurs réutilisables) et REACTS (FED 22, Système Spatial Réactif)',
      'Business développement : études marché New Space et New Defense, salons (Assises New Space, Space Tech, IAC), veille OSINT',
    ],
  },
  {
    id: 'safran-innovation-intern-2022',
    period: 'mars - sept. 2022',
    company: 'Safran Data Systems',
    location: 'Les Ulis',
    role: 'Stagiaire Ingénieur Innovation',
    context: 'État de l’art et PoC de synchronisation de SDRs.',
    highlights: [
      'Réalisation d’un état de l’art sur les radios logicielles (SDR) et les protocoles de synchronisation (PTP)',
      'Développement d’une Preuve de Concept de synchronisation de SDRs avec horodatage matériel bas niveau',
    ],
  },
  {
    id: 'safran-innovation-intern-2021',
    period: 'mars - oct. 2021',
    company: 'Safran Data Systems',
    location: 'Les Ulis',
    role: 'Stagiaire Ingénieur Innovation, puis intérimaire',
    context:
      'PoC d’instrumentation du réseau électrique d’un avion bas-carbone.',
    highlights: [
      'Développement d’une Preuve de Concept d’instrumentation du réseau électrique pour un avion bas-carbone',
    ],
  },
  {
    id: 'rambouillet-network-intern-2019',
    period: 'juillet 2019',
    company: 'Mairie de Rambouillet',
    location: 'Rambouillet',
    role: 'Stagiaire Ingénieur Réseau',
    context: 'Infogérance du parc informatique du Pôle Culturel de la ville.',
    highlights: [
      'Infogérance du parc informatique du Pôle Culturel de la ville de Rambouillet',
    ],
  },
]
