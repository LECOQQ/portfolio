import { MapPin } from 'lucide-react'
import { contact } from '@/features/contact/application/contact'
import { ContactCard } from '@/features/contact/ui/contact-card'
import { ContactFaq } from '@/features/contact/ui/contact-faq'
import { createPageMetadata } from '@/lib/site-config'

export const metadata = createPageMetadata({
  title: 'Contact',
  description:
    "Pour discuter de projets, échanger sur mes travaux ou simplement dire bonjour, n'hésitez pas à me contacter.",
  canonical: '/contact/',
})

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col justify-center px-6 pt-24 pb-10 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <section data-particle-muted className="flex flex-col gap-10">
          <header>
            <p className="font-identity text-site-accent text-sm font-semibold tracking-widest uppercase">
              {contact.eyebrow}
            </p>
            <h1 className="font-identity mt-3 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {contact.title}
            </h1>
          </header>

          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-14">
            <div className="max-w-2xl">
              <p className="text-site-foreground/80 leading-relaxed">
                {contact.description}
              </p>
              <p className="text-site-foreground/35 mt-3 leading-relaxed">
                {contact.shortPitch}
              </p>
              <p className="font-identity text-site-foreground/45 mt-4 flex items-center gap-2 text-sm tracking-[0.02em] [font-variant-caps:small-caps]">
                <MapPin
                  aria-hidden="true"
                  size={15}
                  strokeWidth={1.8}
                  className="text-site-foreground/35 shrink-0"
                />
                {contact.location}
              </p>
            </div>

            <ContactCard contact={contact} />
          </div>
        </section>

        <section
          data-particle-muted
          aria-label="Questions fréquentes"
          className="mt-16"
        >
          <ContactFaq items={contact.faq} />
        </section>
      </div>
    </main>
  )
}
