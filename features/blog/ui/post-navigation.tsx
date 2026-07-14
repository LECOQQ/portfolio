import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { BlogPost } from '@/features/blog/application/posts'

type NavigationPost = Pick<BlogPost, 'slug' | 'title'>

type PostNavigationProps = {
  previous: NavigationPost | undefined
  next: NavigationPost | undefined
}

const linkClassName =
  'group flex min-w-0 max-w-full items-center gap-2 rounded-lg py-1.5 text-site-foreground/45 transition-colors duration-300 hover:text-site-accent focus-visible:text-site-accent focus-visible:ring-2 focus-visible:ring-site-accent/40 focus-visible:outline-none'

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav
      aria-label="Navigation entre les articles"
      className="grid grid-cols-2 gap-4 border-t border-white/7 pt-3"
    >
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          rel="prev"
          aria-label={`Article précédent : ${previous.title}`}
          className={`${linkClassName} justify-self-start`}
        >
          <ArrowLeft
            aria-hidden="true"
            className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
            size={16}
          />
          <span className="font-identity truncate text-xs font-medium sm:text-sm">
            {previous.title}
          </span>
        </Link>
      ) : null}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          rel="next"
          aria-label={`Article suivant : ${next.title}`}
          className={`${linkClassName} justify-self-end text-right ${previous ? '' : 'col-start-2'}`}
        >
          <span className="font-identity truncate text-xs font-medium sm:text-sm">
            {next.title}
          </span>
          <ArrowRight
            aria-hidden="true"
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            size={16}
          />
        </Link>
      ) : null}
    </nav>
  )
}
