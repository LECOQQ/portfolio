import type { ContactFaqItem } from '@/features/contact/application/contact'

type ContactFaqProps = {
  items: ContactFaqItem[]
}

export function ContactFaq({ items }: ContactFaqProps) {
  return (
    <dl className="grid gap-x-6 gap-y-8 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.question}
          data-particle-foreground
          className="group -m-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-white/4"
        >
          <span
            aria-hidden="true"
            className="bg-site-accent/70 mb-3 block h-0.5 w-8 transition-[width] duration-300 ease-out group-hover:w-12"
          />
          <dt className="font-identity text-site-foreground/85 group-hover:text-site-foreground text-sm font-semibold transition-colors duration-300">
            {item.question}
          </dt>
          <dd className="text-site-foreground/55 mt-2 text-sm leading-relaxed">
            {item.answer}
          </dd>
        </div>
      ))}
    </dl>
  )
}
