import { Code2, Database } from 'lucide-react'
import type { IconType } from 'react-icons'
import { normalizeTechKey } from '@/features/projects/application/tech-catalog'
import {
  SiDjango,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGnubash,
  SiGo,
  SiGraphql,
  SiJavascript,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiProxmox,
  SiPython,
  SiReact,
  SiRedis,
  SiRust,
  SiShadcnui,
  SiSwift,
  SiTailwindcss,
  SiTyper,
  SiTypescript,
  SiVuedotjs,
  SiWireguard,
} from 'react-icons/si'

const TECH_ICON_BY_KEY: Record<string, IconType> = {
  nextjs: SiNextdotjs,
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  nodejs: SiNodedotjs,
  python: SiPython,
  docker: SiDocker,
  tailwindcss: SiTailwindcss,
  tailwind: SiTailwindcss,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  rust: SiRust,
  go: SiGo,
  golang: SiGo,
  kubernetes: SiKubernetes,
  graphql: SiGraphql,
  redis: SiRedis,
  vuejs: SiVuedotjs,
  vue: SiVuedotjs,
  fastapi: SiFastapi,
  django: SiDjango,
  swift: SiSwift,
  proxmox: SiProxmox,
  linux: SiLinux,
  nginx: SiNginx,
  wireguard: SiWireguard,
  bash: SiGnubash,
  git: SiGit,
  shadcnui: SiShadcnui,
  typer: SiTyper,
}

/**
 * Official brand colors. Next.js, Rust, Django and shadcn/ui publish
 * near-black marks that would be unreadable against this site's dark
 * background, so those are lightened instead of used as-is. Typer's mark is
 * plain black for the same reason.
 */
const TECH_COLOR_BY_KEY: Record<string, string> = {
  nextjs: '#f1f4ef',
  react: '#61dafb',
  typescript: '#3178c6',
  javascript: '#f7df1e',
  nodejs: '#339933',
  python: '#3776ab',
  docker: '#2496ed',
  tailwindcss: '#06b6d4',
  tailwind: '#06b6d4',
  postgresql: '#4169e1',
  postgres: '#4169e1',
  mongodb: '#47a248',
  rust: '#f1f4ef',
  go: '#00add8',
  golang: '#00add8',
  kubernetes: '#326ce5',
  graphql: '#e10098',
  redis: '#dc382d',
  vuejs: '#4fc08d',
  vue: '#4fc08d',
  fastapi: '#009688',
  django: '#2ca05a',
  swift: '#f05138',
  proxmox: '#e57000',
  linux: '#fcc624',
  nginx: '#009639',
  wireguard: '#88171a',
  bash: '#4eaa25',
  git: '#f05032',
  shadcnui: '#f1f4ef',
  typer: '#f1f4ef',
  sql: '#4479a1',
}

/**
 * Official homepage for each stack entry, so the icon can link out. Entries
 * missing here (or the whole tech, if it's not in the maps above) render as
 * a plain, non-interactive glyph instead of a dead or guessed link.
 */
const TECH_URL_BY_KEY: Record<string, string> = {
  nextjs: 'https://nextjs.org',
  react: 'https://react.dev',
  typescript: 'https://www.typescriptlang.org',
  javascript: 'https://developer.mozilla.org/docs/Web/JavaScript',
  nodejs: 'https://nodejs.org',
  python: 'https://www.python.org',
  docker: 'https://www.docker.com',
  tailwindcss: 'https://tailwindcss.com',
  tailwind: 'https://tailwindcss.com',
  postgresql: 'https://www.postgresql.org',
  postgres: 'https://www.postgresql.org',
  mongodb: 'https://www.mongodb.com',
  rust: 'https://www.rust-lang.org',
  go: 'https://go.dev',
  golang: 'https://go.dev',
  kubernetes: 'https://kubernetes.io',
  graphql: 'https://graphql.org',
  redis: 'https://redis.io',
  vuejs: 'https://vuejs.org',
  vue: 'https://vuejs.org',
  fastapi: 'https://fastapi.tiangolo.com',
  django: 'https://www.djangoproject.com',
  swift: 'https://www.swift.org',
  proxmox: 'https://www.proxmox.com',
  linux: 'https://www.linux.org',
  nginx: 'https://nginx.org',
  wireguard: 'https://www.wireguard.com',
  bash: 'https://www.gnu.org/software/bash/',
  git: 'https://git-scm.com',
  shadcnui: 'https://ui.shadcn.com',
  typer: 'https://typer.tiangolo.com',
}

type TechIconProps = {
  name: string
  size?: 'sm' | 'md'
}

const SIZE_CLASSES = {
  sm: { container: 'size-7', glyph: 16 },
  md: { container: 'size-9', glyph: 20 },
} as const

/**
 * Falls back to a generic glyph (in the site's neutral tone, since it has
 * no brand color) for any stack entry not in the curated map above, so
 * authoring `stack` frontmatter never breaks the build. Links out to the
 * tech's official site when one is known; otherwise renders as inert.
 *
 * "sql" gets its own generic database glyph (lucide, not a brand mark —
 * SQL is a language, not a company) instead of falling through to the
 * fully generic code-brackets icon.
 */
export function TechIcon({ name, size = 'sm' }: TechIconProps) {
  const key = normalizeTechKey(name)
  const Icon = key === 'sql' ? Database : (TECH_ICON_BY_KEY[key] ?? Code2)
  const color = TECH_COLOR_BY_KEY[key]
  const url = TECH_URL_BY_KEY[key]
  const { container, glyph: glyphSize } = SIZE_CLASSES[size]

  const glyph = (
    <Icon
      aria-hidden="true"
      size={glyphSize}
      className={color ? undefined : 'text-site-foreground/50'}
      style={color ? { color } : undefined}
    />
  )

  const className = `flex ${container} items-center justify-center rounded-md border border-white/8 bg-white/4 transition-colors duration-200 hover:border-white/20 hover:bg-white/9 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none`

  if (!url) {
    return (
      <span title={name} aria-label={name} role="img" className={className}>
        {glyph}
      </span>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      title={name}
      aria-label={name}
      className={`relative z-20 ${className}`}
    >
      {glyph}
    </a>
  )
}
