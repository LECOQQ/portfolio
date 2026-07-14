import { ChevronDown } from 'lucide-react'

export type FilterDropdownOption = {
  value: string
  label: string
}

type FilterDropdownProps = {
  id: string
  label: string
  value: string
  options: FilterDropdownOption[]
  open: boolean
  onToggle: () => void
  onChange: (_value: string) => void
}

/**
 * Combobox-style filter used by content index pages (blog, projects) to
 * pick a single value from a small set of options — a native `<select>`
 * can't be restyled to match the site's dropdown panel, so this rebuilds
 * the combobox pattern by hand.
 */
export function FilterDropdown({
  id,
  label,
  value,
  options,
  open,
  onToggle,
  onChange,
}: FilterDropdownProps) {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? options[0]?.label

  return (
    <div className="relative">
      <button
        type="button"
        role="combobox"
        aria-label={label}
        aria-controls={`${id}-options`}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={onToggle}
        className="text-site-foreground focus:border-site-accent/40 focus:ring-site-accent/30 bg-site-background flex h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/7 px-3 text-left text-sm transition hover:border-white/15 hover:bg-white/4 focus:ring-2 focus:outline-none"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          aria-hidden="true"
          size={16}
          className={`text-site-accent shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <ul
          id={`${id}-options`}
          role="listbox"
          aria-label={label}
          className="bg-site-background absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-white/10 p-1 shadow-[0_18px_45px_rgb(0_0_0/0.45)]"
        >
          {options.map((option) => {
            const selected = option.value === value

            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => onChange(option.value)}
                  className={`font-identity w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    selected
                      ? 'bg-site-accent/12 text-site-accent'
                      : 'text-site-foreground/65 hover:text-site-foreground hover:bg-white/7'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
