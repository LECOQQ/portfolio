import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCoverObjectPosition } from '@/features/blog/application/cover'
import { getRecentPostPreviews } from '@/features/blog/application/posts'

export function RecentPosts() {
  const posts = getRecentPostPreviews(3)

  if (posts.length === 0) {
    return (
      <p className="font-identity text-site-foreground/40 text-sm">
        Aucun article publié pour l&apos;instant.
      </p>
    )
  }

  return (
    <ul className="-mt-3">
      {posts.map((post, index) => (
        <li key={post.slug}>
          {index > 0 && (
            <div aria-hidden="true" className="h-px bg-white/7 sm:ml-56" />
          )}
          <Link
            href={`/blog/${post.slug}`}
            className="group/post -mx-2 grid gap-4 rounded-xl px-2 py-3 transition-colors duration-200 hover:bg-white/4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:items-start"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/8 bg-white/4">
              {post.cover ? (
                <Image
                  src={post.cover}
                  alt=""
                  fill
                  className="object-cover"
                  style={{
                    objectPosition: getCoverObjectPosition(post.coverFocus),
                  }}
                  sizes="(min-width: 640px) 208px, calc(100vw - 4rem)"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="text-site-foreground/15 absolute inset-0 flex items-center justify-center text-2xl font-bold"
                >
                  {post.title[0]}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-identity text-site-accent/85 text-sm leading-tight font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
                  {post.typeLabel}
                </p>
                <span className="font-identity text-site-foreground/40 text-sm whitespace-nowrap [font-variant-caps:small-caps]">
                  {post.meta}
                </span>
              </div>
              <p className="font-identity text-site-foreground mt-1 text-base font-semibold">
                {post.title}
              </p>
              <p className="text-site-foreground/50 mt-1 line-clamp-2 text-sm leading-relaxed">
                {post.description}
              </p>
              <ArrowRight
                aria-hidden="true"
                size={18}
                strokeWidth={1.75}
                className="text-site-accent mt-3 ml-auto translate-x-0 transition-transform duration-200 group-hover/post:translate-x-1"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
