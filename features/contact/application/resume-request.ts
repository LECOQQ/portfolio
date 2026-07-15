import { z } from 'zod'

export const resumeRequestSchema = z.object({
  identity: z
    .string()
    .trim()
    .max(120, 'Le nom ou l’organisation est limité à 120 caractères.'),
  email: z
    .string()
    .trim()
    .min(1, 'Indiquez une adresse e-mail de réponse.')
    .email('Indiquez une adresse e-mail valide.'),
  reason: z
    .string()
    .trim()
    .min(20, 'Précisez votre demande en au moins 20 caractères.')
    .max(800, 'Le motif est limité à 800 caractères.'),
})

export type ResumeRequest = z.infer<typeof resumeRequestSchema>

export function buildResumeRequestMailto(
  request: ResumeRequest,
  destinationEmail: string,
): string {
  const destination = z
    .string()
    .trim()
    .email('L’adresse de réception de la demande est invalide.')
    .parse(destinationEmail)
  const subject = 'Demande de CV complet'
  const body = [
    'Bonjour,',
    '',
    'Je souhaite recevoir votre CV complet.',
    '',
    `Nom ou organisation : ${request.identity || 'Non précisé'}`,
    `Adresse de réponse : ${request.email}`,
    '',
    'Motif et contexte :',
    request.reason,
    '',
    'Merci.',
  ].join('\n')

  return `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
