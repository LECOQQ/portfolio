export type Publication = {
  id: string
  year: number
  title: string
  conference: string
  conferenceAbbr: string
}

/**
 * Peer-reviewed publications, ordered from most recent to oldest.
 */
export const publications: Publication[] = [
  {
    id: 'ettc-2025-llm-autocoding',
    year: 2025,
    title:
      'Facilitating Advanced Real-Time Data Processing Through Auto-Coding: An Application of Large Language Models for Intelligent Flight Test Instrumentation',
    conference: 'European Test and Telemetry Conference',
    conferenceAbbr: 'ETTC',
  },
  {
    id: 'ettc-2023-onboard-processing',
    year: 2023,
    title:
      'On-Board Processing: A Decade of Experience Opening to New Applications',
    conference: 'European Test and Telemetry Conference',
    conferenceAbbr: 'ETTC',
  },
  {
    id: 'itc-2023-cots-das',
    year: 2023,
    title:
      'How to Reconcile COTS Components and Tailored Future-Proof Data Acquisition System in Flight Test Instrumentation?',
    conference: 'International Telemetry Conference',
    conferenceAbbr: 'ITC',
  },
  {
    id: 'ettc-2021-low-carbon-aircraft',
    year: 2021,
    title: 'Low-Carbon Aircraft: Impacts on Instrumentation Needs',
    conference: 'European Test and Telemetry Conference',
    conferenceAbbr: 'ETTC',
  },
]
