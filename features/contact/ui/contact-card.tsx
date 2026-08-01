'use client'

import { Check, Copy, Mail } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { SiGitea } from 'react-icons/si'
import type {
  Contact,
  ContactSocial,
} from '@/features/contact/application/contact'
import { MakerWorldIcon } from '@/ui/maker-world-icon'

const iconButtonClassName =
  'text-site-foreground/75 hover:text-site-accent flex size-9 items-center justify-center rounded-xl transition-colors duration-300 hover:bg-white/9 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'

const copyButtonBaseClassName =
  'font-identity inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 text-sm font-medium transition-colors duration-[250ms] ease-out focus-visible:ring-2 focus-visible:outline-none'
const copyButtonIdleClassName =
  'text-site-foreground/75 hover:text-site-foreground border-white/7 bg-white/4 hover:bg-white/9 focus-visible:ring-site-accent/30 focus-visible:border-site-accent/40'
const copyButtonActiveClassName =
  'text-site-accent border-site-accent/40 bg-site-accent/10 focus-visible:ring-site-accent/30 focus-visible:border-site-accent/40'

const COPY_FEEDBACK_DURATION_MS = 2000

function SocialIcon({ icon }: { icon: ContactSocial['icon'] }) {
  switch (icon) {
    case 'github':
      return <FaGithub aria-hidden="true" size={17} />
    case 'gitea':
      return <SiGitea aria-hidden="true" size={17} />
    case 'linkedin':
      return <FaLinkedinIn aria-hidden="true" size={17} />
    case 'makerworld':
      return <MakerWorldIcon aria-hidden="true" size={17} />
  }
}

/**
 * `navigator.clipboard` requires a secure context and can be missing or
 * throw depending on browser/embedding; falls back to the legacy
 * execCommand approach so the copy action keeps working regardless.
 */
function copyWithFallback(value: string): boolean {
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  let succeeded = false
  try {
    succeeded = document.execCommand('copy')
  } catch {
    succeeded = false
  }

  document.body.removeChild(textarea)
  return succeeded
}

type ContactCardProps = {
  contact: Contact
}

type CopyStatus = 'idle' | 'copied' | 'failed'

export function ContactCard({ contact }: ContactCardProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
  const reduceMotion = useReducedMotion()

  const handleCopy = async () => {
    if (!contact.email) return

    let succeeded = false
    try {
      if (!navigator.clipboard?.writeText) throw new Error('unsupported')
      await navigator.clipboard.writeText(contact.email)
      succeeded = true
    } catch {
      succeeded = copyWithFallback(contact.email)
    }

    setCopyStatus(succeeded ? 'copied' : 'failed')
    window.setTimeout(() => setCopyStatus('idle'), COPY_FEEDBACK_DURATION_MS)
  }

  return (
    <div
      data-particle-foreground
      className="w-full max-w-[19rem] overflow-hidden rounded-[1.4rem] border border-white/7 bg-white/4.5 p-5 shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg"
    >
      <p className="font-identity text-site-accent flex items-center justify-center gap-2 text-base font-semibold tracking-[0.02em] [font-variant-caps:small-caps] sm:text-lg">
        <span className="relative flex size-2.5" aria-hidden="true">
          <span className="bg-site-accent absolute inline-flex size-full animate-ping rounded-full opacity-75 motion-reduce:hidden" />
          <span className="bg-site-accent relative inline-flex size-2.5 rounded-full" />
        </span>
        {contact.availabilityStatus}
      </p>

      {contact.email && (
        <div className="mt-4">
          <p className="text-site-foreground flex items-center justify-center gap-2 text-base font-semibold sm:text-lg">
            <Mail
              aria-hidden="true"
              size={17}
              strokeWidth={1.8}
              className="text-site-accent/70 shrink-0"
            />
            <span className="truncate">{contact.email}</span>
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <a
              href={`mailto:${contact.email}`}
              className="font-identity bg-site-accent text-site-background inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-xl px-3.5 text-sm font-semibold transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
            >
              M’écrire
            </a>
            <motion.button
              type="button"
              onClick={handleCopy}
              aria-label={`Copier l’adresse e-mail ${contact.email}`}
              whileTap={reduceMotion ? {} : { scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`${copyButtonBaseClassName} ${copyStatus === 'copied' ? copyButtonActiveClassName : copyButtonIdleClassName}`}
            >
              <span className="relative flex size-[15px] shrink-0">
                <AnimatePresence initial={false}>
                  {copyStatus === 'copied' ? (
                    <motion.span
                      key="check"
                      initial={
                        reduceMotion ? false : { scale: 0.4, opacity: 0 }
                      }
                      animate={{ scale: 1, opacity: 1 }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { scale: 0.4, opacity: 0 }
                      }
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute inset-0 flex"
                    >
                      <Check aria-hidden="true" size={15} strokeWidth={2} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={
                        reduceMotion ? false : { scale: 0.4, opacity: 0 }
                      }
                      animate={{ scale: 1, opacity: 1 }}
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { scale: 0.4, opacity: 0 }
                      }
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute inset-0 flex"
                    >
                      <Copy aria-hidden="true" size={15} strokeWidth={1.8} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              Copier l’adresse
            </motion.button>
          </div>

          {copyStatus === 'copied' && (
            <span className="sr-only" role="status">
              Adresse copiée dans le presse-papiers.
            </span>
          )}
          {copyStatus === 'failed' && (
            <p
              role="status"
              className="font-identity mt-1.5 text-center text-xs text-red-400/85"
            >
              Copie impossible, sélectionnez l’adresse manuellement.
            </p>
          )}
        </div>
      )}

      <nav aria-label="Réseaux" className="mt-3">
        <ul className="flex items-center justify-center gap-1">
          {contact.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noreferrer"
                className={iconButtonClassName}
                data-umami-event="social-link-click"
                data-umami-event-channel={social.analyticsChannel}
                data-umami-event-location="contact"
              >
                <SocialIcon icon={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
