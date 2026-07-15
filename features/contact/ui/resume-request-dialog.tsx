'use client'

import { ArrowRight, ChevronDown, Send, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import {
  buildResumeRequestMailto,
  resumeRequestSchema,
  type ResumeRequest,
} from '@/features/contact/application/resume-request'
import { siteConfig } from '@/lib/site-config'

type ResumeRequestDialogProps = {
  analyticsLocation: 'topbar' | 'about-recent-experiences'
  variant?: 'topbar' | 'inline'
}

type FieldErrors = Partial<Record<keyof ResumeRequest, string | undefined>>

const fieldClassName =
  'text-site-foreground placeholder:text-site-foreground/25 focus:border-site-accent/45 focus:ring-site-accent/20 w-full rounded-xl border border-white/8 bg-black/10 px-3 py-2.5 text-sm outline-none transition focus:ring-2'

export function ResumeRequestDialog({
  analyticsLocation,
  variant = 'inline',
}: ResumeRequestDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formStatus, setFormStatus] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const reduceMotion = useReducedMotion()
  const id = useId()
  const dialogId = `resume-request-${id}`
  const titleId = `resume-request-title-${id}`

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (!isOpen) {
      const wasOpen = dialog.open
      if (wasOpen) {
        if (typeof dialog.close === 'function') dialog.close()
        else dialog.removeAttribute('open')
        triggerRef.current?.focus()
      }
      return
    }

    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    emailRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const close = () => {
    setIsOpen(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus(null)

    const formData = new FormData(event.currentTarget)
    const result = resumeRequestSchema.safeParse({
      identity: formData.get('identity'),
      email: formData.get('email'),
      reason: formData.get('reason'),
    })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      setFieldErrors({
        identity: errors.identity?.[0],
        email: errors.email?.[0],
        reason: errors.reason?.[0],
      })
      setFormStatus('Corrigez les champs indiqués avant de continuer.')
      return
    }

    if (!siteConfig.contactEmail) {
      setFieldErrors({})
      setFormStatus(
        'La demande par e-mail n’est pas configurée. Utilisez la page de contact.',
      )
      return
    }

    setFieldErrors({})
    setFormStatus('Votre messagerie va s’ouvrir avec la demande préparée.')

    const link = document.createElement('a')
    link.href = buildResumeRequestMailto(result.data, siteConfig.contactEmail)
    link.click()
  }

  const isTopbar = variant === 'topbar'

  return (
    <div>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Demander le CV complet"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        onClick={() => {
          setIsOpen(true)
          setFormStatus(null)
        }}
        data-umami-event="cv-request-open"
        data-umami-event-location={analyticsLocation}
        className={
          isTopbar
            ? 'text-site-foreground/70 hover:text-site-foreground font-identity focus-visible:border-site-accent/40 focus-visible:ring-site-accent/30 flex h-9 cursor-pointer items-center gap-1.5 rounded-[1.1rem] border border-white/7 bg-white/4.5 px-3 text-xs font-medium shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg transition-colors duration-300 hover:bg-white/9 focus-visible:ring-2 focus-visible:outline-none sm:text-sm'
            : 'group/cta font-identity text-site-accent/75 hover:text-site-accent focus-visible:ring-site-accent/40 inline-flex w-fit cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none'
        }
      >
        {isTopbar ? (
          <>
            <span className="hidden lg:inline">Demander le CV complet</span>
            <span className="lg:hidden">CV</span>
            <ChevronDown
              aria-hidden="true"
              className={`text-site-accent/65 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              size={15}
              strokeWidth={1.8}
            />
          </>
        ) : (
          <>
            <span className="relative">
              Demander le CV complet
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover/cta:scale-x-100"
              />
            </span>
            <ArrowRight aria-hidden="true" size={15} strokeWidth={2} />
          </>
        )}
      </button>

      <dialog
        ref={dialogRef}
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="text-site-foreground m-auto max-h-[calc(100vh-2rem)] w-[min(24rem,calc(100vw-2rem))] overflow-y-auto border-0 bg-transparent p-0 backdrop:bg-black/65 backdrop:backdrop-blur-[2px]"
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
        onClose={() => {
          setIsOpen(false)
          triggerRef.current?.focus()
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
      >
        {isOpen && (
          <motion.div
            data-particle-foreground
            className="bg-site-background/97 rounded-[1.3rem] border border-white/8 p-5 shadow-[0_18px_52px_rgb(0_0_0/0.32)] backdrop-blur-xl"
            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-identity text-site-accent text-xs font-semibold tracking-widest uppercase">
                  Demande privée
                </p>
                <h2
                  id={titleId}
                  className="font-identity text-site-foreground mt-1.5 text-lg font-semibold"
                >
                  Recevoir le CV complet
                </h2>
                <p className="text-site-foreground/52 mt-2 text-sm leading-relaxed">
                  Donnez-moi assez de contexte pour que je puisse qualifier la
                  demande et vous répondre directement.
                </p>
              </div>
              <button
                type="button"
                aria-label="Fermer le formulaire"
                onClick={close}
                className="text-site-foreground/45 hover:text-site-foreground focus-visible:ring-site-accent/40 -mt-1 -mr-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-xl transition-colors hover:bg-white/8 focus-visible:ring-2 focus-visible:outline-none"
              >
                <X aria-hidden="true" size={16} strokeWidth={1.8} />
              </button>
            </div>

            <form
              noValidate
              className="mt-5 grid gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor={`identity-${id}`}
                  className="font-identity text-site-foreground/68 text-xs font-medium"
                >
                  Nom ou organisation{' '}
                  <span className="text-site-foreground/35">(facultatif)</span>
                </label>
                <input
                  id={`identity-${id}`}
                  name="identity"
                  type="text"
                  autoComplete="organization"
                  maxLength={120}
                  aria-invalid={Boolean(fieldErrors.identity)}
                  aria-describedby={
                    fieldErrors.identity ? `identity-error-${id}` : undefined
                  }
                  className={`${fieldClassName} mt-1.5`}
                  placeholder="Votre nom, équipe ou entreprise"
                />
                {fieldErrors.identity && (
                  <p
                    id={`identity-error-${id}`}
                    className="mt-1.5 text-xs text-red-400/90"
                  >
                    {fieldErrors.identity}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`email-${id}`}
                  className="font-identity text-site-foreground/68 text-xs font-medium"
                >
                  E-mail de réponse <span className="text-site-accent">*</span>
                </label>
                <input
                  ref={emailRef}
                  id={`email-${id}`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={
                    fieldErrors.email ? `email-error-${id}` : undefined
                  }
                  className={`${fieldClassName} mt-1.5`}
                  placeholder="vous@exemple.fr"
                />
                {fieldErrors.email && (
                  <p
                    id={`email-error-${id}`}
                    className="mt-1.5 text-xs text-red-400/90"
                  >
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`reason-${id}`}
                  className="font-identity text-site-foreground/68 text-xs font-medium"
                >
                  Pourquoi souhaitez-vous le recevoir ?{' '}
                  <span className="text-site-accent">*</span>
                </label>
                <textarea
                  id={`reason-${id}`}
                  name="reason"
                  rows={4}
                  maxLength={800}
                  aria-invalid={Boolean(fieldErrors.reason)}
                  aria-describedby={
                    fieldErrors.reason ? `reason-error-${id}` : undefined
                  }
                  className={`${fieldClassName} mt-1.5 resize-y`}
                  placeholder="Contexte, opportunité, mission ou besoin précis…"
                />
                {fieldErrors.reason && (
                  <p
                    id={`reason-error-${id}`}
                    className="mt-1.5 text-xs text-red-400/90"
                  >
                    {fieldErrors.reason}
                  </p>
                )}
              </div>

              <p className="text-site-foreground/38 text-xs leading-relaxed">
                Rien n’est envoyé ni stocké par ce site. Le bouton prépare un
                e-mail dans votre messagerie.{' '}
                <Link
                  href="/privacy/#demande-du-cv-complet"
                  className="text-site-foreground/55 hover:text-site-accent underline decoration-white/20 underline-offset-2 transition-colors"
                >
                  Confidentialité
                </Link>
              </p>

              {formStatus && (
                <p
                  role="status"
                  className="font-identity text-site-foreground/60 text-xs leading-relaxed"
                >
                  {formStatus}
                </p>
              )}

              <div className="flex items-center justify-between gap-3">
                {!siteConfig.contactEmail && (
                  <Link
                    href="/contact"
                    className="text-site-foreground/50 hover:text-site-accent text-xs underline decoration-white/20 underline-offset-2 transition-colors"
                  >
                    Page de contact
                  </Link>
                )}
                <button
                  type="submit"
                  data-umami-event="cv-request-prepare"
                  data-umami-event-location={analyticsLocation}
                  className="font-identity bg-site-accent text-site-background ml-auto inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl px-3.5 text-sm font-semibold transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                >
                  Préparer la demande
                  <Send aria-hidden="true" size={14} strokeWidth={1.9} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </dialog>
    </div>
  )
}
