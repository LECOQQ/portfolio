import { describe, expect, it } from 'vitest'
import {
  buildResumeRequestMailto,
  resumeRequestSchema,
} from '@/features/contact/application/resume-request'

describe('resumeRequestSchema', () => {
  it('accepts and trims a contextualized request', () => {
    const result = resumeRequestSchema.parse({
      identity: '  Example Corp  ',
      email: '  recruiter@example.com  ',
      reason:
        '  Je souhaite discuter d’une mission de plateforme logicielle.  ',
    })

    expect(result).toEqual({
      identity: 'Example Corp',
      email: 'recruiter@example.com',
      reason: 'Je souhaite discuter d’une mission de plateforme logicielle.',
    })
  })

  it('rejects an invalid e-mail and an underspecified reason', () => {
    const result = resumeRequestSchema.safeParse({
      identity: '',
      email: 'invalid',
      reason: 'Trop court',
    })

    expect(result.success).toBe(false)
    if (result.success) return
    expect(result.error.flatten().fieldErrors.email?.[0]).toMatch(/valide/)
    expect(result.error.flatten().fieldErrors.reason?.[0]).toMatch(
      /20 caractères/,
    )
  })

  it('builds an encoded mail draft without sending data from the site', () => {
    const href = buildResumeRequestMailto(
      {
        identity: 'Example Corp',
        email: 'recruiter@example.com',
        reason: 'Échange autour d’une mission produit et plateforme.',
      },
      'hello@example.com',
    )

    expect(href).toContain('mailto:hello@example.com?')
    expect(decodeURIComponent(href)).toContain('Demande de CV complet')
    expect(decodeURIComponent(href)).toContain('recruiter@example.com')
    expect(decodeURIComponent(href)).toContain(
      'Échange autour d’une mission produit et plateforme.',
    )
  })
})
