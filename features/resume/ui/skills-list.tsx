import { skillCategories } from '@/features/resume/application/skills'

/**
 * Technical skill categories rendered as chip groups.
 */
export function SkillsList() {
  return (
    <div className="grid gap-5">
      {skillCategories.map((category) => (
        <div key={category.id}>
          <h3 className="font-identity text-site-foreground/50 text-sm font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
            {category.label}
          </h3>
          <ul
            aria-label={`Compétences ${category.label}`}
            className="mt-2 flex flex-wrap gap-1.5"
          >
            {category.items.map((item) => (
              <li
                key={item}
                className="font-identity text-site-foreground/70 rounded-lg border border-white/7 bg-white/4 px-2.5 py-1 text-xs font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
