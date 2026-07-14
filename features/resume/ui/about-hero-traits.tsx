import { Cpu, Hammer, MapPin, Rocket } from 'lucide-react'
import type {
  AboutHeroTrait,
  AboutHeroTraitIcon,
} from '@/features/resume/application/about'

function TraitIcon({ icon }: { icon: AboutHeroTraitIcon }) {
  switch (icon) {
    case 'cpu':
      return <Cpu aria-hidden="true" size={22} strokeWidth={1.8} />
    case 'map-pin':
      return <MapPin aria-hidden="true" size={22} strokeWidth={1.8} />
    case 'hammer':
      return <Hammer aria-hidden="true" size={22} strokeWidth={1.8} />
    case 'rocket':
      return <Rocket aria-hidden="true" size={22} strokeWidth={1.8} />
  }
}

type AboutHeroTraitsProps = {
  traits: AboutHeroTrait[]
}

/**
 * Far-right column of the About hero: short self-defining traits in a
 * compact two-column grid on narrow screens and an evenly spaced vertical
 * list on desktop, each with an olive icon, a title and a description.
 */
export function AboutHeroTraits({ traits }: AboutHeroTraitsProps) {
  return (
    <ul
      aria-label="Ce qui me définit"
      className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-6 lg:flex lg:h-full lg:flex-col lg:justify-center lg:justify-items-start"
    >
      {traits.map((trait) => (
        <li
          key={trait.id}
          className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-center lg:gap-4 lg:text-left"
        >
          <span className="text-site-accent shrink-0">
            <TraitIcon icon={trait.icon} />
          </span>
          <div>
            <p className="font-identity text-site-accent text-lg font-semibold tracking-wide [font-variant-caps:small-caps]">
              {trait.title}
            </p>
            <p className="text-site-foreground/55 mt-0.5 text-sm leading-snug">
              {trait.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
