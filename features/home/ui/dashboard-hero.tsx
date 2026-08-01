import { Clock, Hammer, Mail, MapPin, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { SiGitea } from 'react-icons/si'
import {
  dashboard,
  type DashboardHeroContactIcon,
  type DashboardHeroFactIcon,
  type DashboardHeroTagGroupIcon,
} from '@/features/home/application/dashboard'
import { MakerWorldIcon } from '@/ui/maker-world-icon'

const iconButtonClassName =
  'text-site-foreground/75 hover:text-site-accent flex size-8 items-center justify-center rounded-xl transition-colors duration-300 hover:bg-white/9 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none'

function FactIcon({ icon }: { icon: DashboardHeroFactIcon }) {
  switch (icon) {
    case 'map-pin':
      return <MapPin aria-hidden="true" size={15} strokeWidth={1.8} />
    case 'clock':
      return <Clock aria-hidden="true" size={15} strokeWidth={1.8} />
  }
}

function TagGroupIcon({ icon }: { icon: DashboardHeroTagGroupIcon }) {
  switch (icon) {
    case 'maker':
      return <Hammer aria-hidden="true" size={15} strokeWidth={1.8} />
    case 'defense':
      return <Shield aria-hidden="true" size={15} strokeWidth={1.8} />
  }
}

function ContactIcon({ icon }: { icon: DashboardHeroContactIcon }) {
  switch (icon) {
    case 'github':
      return <FaGithub aria-hidden="true" size={16} />
    case 'gitea':
      return <SiGitea aria-hidden="true" size={16} />
    case 'linkedin':
      return <FaLinkedinIn aria-hidden="true" size={16} />
    case 'makerworld':
      return <MakerWorldIcon aria-hidden="true" size={16} />
    case 'mail':
      return <Mail aria-hidden="true" size={16} strokeWidth={1.8} />
  }
}

/**
 * "Augmented ID card": photo, availability status, quick facts and contact
 * shortcuts for the home dashboard hero section.
 */
export function DashboardHeroCard() {
  const { hero } = dashboard

  return (
    <div
      data-particle-foreground
      className="w-full max-w-68 overflow-hidden rounded-[1.4rem] border border-white/7 bg-white/4.5 shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg"
    >
      <div className="relative aspect-square w-full border-b border-white/7">
        <Image
          src={hero.photo.src}
          alt={hero.photo.alt}
          fill
          sizes="(min-width: 1024px) 272px, 60vw"
          className="object-cover saturate-[0.85]"
          fetchPriority="high"
          priority
        />
      </div>

      <div className="flex flex-col gap-4 p-5">
        <p className="font-identity text-site-accent/85 flex items-center gap-2 text-sm font-semibold sm:text-base">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="bg-site-accent absolute inline-flex size-full animate-ping rounded-full opacity-75 motion-reduce:hidden" />
            <span className="bg-site-accent relative inline-flex size-2 rounded-full" />
          </span>
          {hero.status.label}
        </p>

        <ul className="text-site-foreground/60 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
          {hero.facts.map((fact) => (
            <li key={fact.label} className="flex items-center gap-2">
              <FactIcon icon={fact.icon} />
              {fact.label}
            </li>
          ))}
        </ul>

        {hero.tagGroups.map((group) => (
          <p
            key={group.ariaLabel}
            aria-label={group.ariaLabel}
            className="text-site-foreground/60 flex items-center gap-2 text-sm"
          >
            <TagGroupIcon icon={group.icon} />
            <span>{group.items.join(' · ')}</span>
          </p>
        ))}

        <div className="flex flex-col gap-3 border-t border-white/7 pt-4">
          <nav aria-label="Contacts rapides" className="w-full">
            <ul className="flex w-full items-center justify-between">
              {hero.contacts.map((contact) => {
                const isInternalRoute = contact.href.startsWith('/')

                return (
                  <li key={contact.label}>
                    {isInternalRoute ? (
                      <Link
                        href={contact.href}
                        aria-label={contact.label}
                        className={iconButtonClassName}
                        data-umami-event="social-link-click"
                        data-umami-event-channel={contact.analyticsChannel}
                        data-umami-event-location="hero"
                      >
                        <ContactIcon icon={contact.icon} />
                      </Link>
                    ) : (
                      <a
                        href={contact.href}
                        aria-label={contact.label}
                        className={iconButtonClassName}
                        target={contact.external ? '_blank' : undefined}
                        rel={contact.external ? 'noreferrer' : undefined}
                        data-umami-event="social-link-click"
                        data-umami-event-channel={contact.analyticsChannel}
                        data-umami-event-location="hero"
                      >
                        <ContactIcon icon={contact.icon} />
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
