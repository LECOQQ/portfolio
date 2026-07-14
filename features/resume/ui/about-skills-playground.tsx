import { Code2, Compass, Cpu, Server } from 'lucide-react'
import {
  skillsPlayground,
  type SkillsPlaygroundIcon,
} from '@/features/resume/application/skills-playground'

function CategoryIcon({ icon }: { icon: SkillsPlaygroundIcon }) {
  switch (icon) {
    case 'compass':
      return <Compass aria-hidden="true" size={40} strokeWidth={1.5} />
    case 'code':
      return <Code2 aria-hidden="true" size={40} strokeWidth={1.5} />
    case 'cpu':
      return <Cpu aria-hidden="true" size={40} strokeWidth={1.5} />
    case 'server':
      return <Server aria-hidden="true" size={40} strokeWidth={1.5} />
  }
}

/**
 * Four simple editorial rows connecting each domain to its concrete skills.
 */
export function AboutSkillsPlayground() {
  return (
    <ul aria-label="Domaines de compétences" className="lg:order-1">
      {skillsPlayground.categories.map((category, index) => (
        <li key={category.id}>
          {index > 0 && (
            <div
              aria-hidden="true"
              className="via-site-accent/15 h-px bg-linear-to-r from-transparent to-transparent"
            />
          )}

          <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-4 gap-y-4 py-6 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-x-5 lg:grid-cols-[5.5rem_minmax(0,1.15fr)_minmax(15rem,0.85fr)] lg:items-center">
            <div className="flex flex-col items-center gap-2.5 sm:flex-row">
              <span className="font-identity text-site-accent w-6 shrink-0 text-sm font-semibold tracking-[0.08em]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-site-accent shrink-0">
                <CategoryIcon icon={category.icon} />
              </span>
            </div>

            <div>
              <h3 className="font-identity text-site-foreground text-lg font-semibold tracking-tight sm:text-xl">
                {category.title}
              </h3>
              <p className="text-site-foreground/55 mt-1.5 text-sm leading-relaxed">
                {category.description}
              </p>
            </div>

            <ul className="col-start-2 grid gap-3 lg:col-start-3">
              {category.groups.map((group) => (
                <li key={group.label}>
                  <p className="font-identity text-site-foreground/35 text-[0.65rem] font-semibold tracking-[0.16em] uppercase">
                    {group.label}
                  </p>
                  <ul className="text-site-foreground/60 mt-1 flex flex-wrap text-sm leading-relaxed">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="after:text-site-accent/45 after:mx-2 after:content-['·'] last:after:hidden"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  )
}
