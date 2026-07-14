import { ArrowRight, Rss } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { EndCta } from '@/components/end-cta'
import { getBlogPosts } from '@/features/blog/application/posts'
import { getCoverObjectPosition } from '@/features/blog/application/cover'
import { BLOG_RSS_PATH } from '@/features/blog/application/feed'
import { BlogIndex } from '@/features/blog/ui/blog-index'
import { createPageMetadata } from '@/lib/site-config'

export const metadata = createPageMetadata({
  title: 'Écrits',
  description:
    "Réflexions personnelles sur l'actualité, les projets et les expériences.",
  canonical: '/blog/',
})

export default function BlogPage() {
  const posts = getBlogPosts()
  const featuredPost = posts[0]

  return (
    <main className="flex-1 px-6 pt-24 pb-[clamp(1.5rem,5vw,5rem)] sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <section
          data-particle-muted
          className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-stretch"
        >
          <header className="flex flex-col justify-center">
            <div className="flex items-center justify-between gap-3">
              <p className="font-identity text-site-accent text-sm font-semibold tracking-widest uppercase">
                Carnet de recherche
              </p>
              <div className="group relative shrink-0">
                <Link
                  href={BLOG_RSS_PATH}
                  aria-label="S’abonner au flux RSS"
                  aria-describedby="blog-rss-tooltip"
                  className="text-site-foreground/75 hover:text-site-accent flex size-9 items-center justify-center rounded-xl transition-colors duration-300 hover:bg-white/9 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                  data-umami-event="social-link-click"
                  data-umami-event-channel="rss"
                  data-umami-event-location="blog-header"
                >
                  <Rss aria-hidden="true" size={18} strokeWidth={1.7} />
                </Link>
                <div
                  id="blog-rss-tooltip"
                  role="tooltip"
                  className="bg-site-background/80 pointer-events-none absolute top-[calc(100%+0.6rem)] right-0 hidden w-max max-w-[calc(100vw-2rem)] rounded-xl border border-white/7 px-3 py-2 text-right shadow-[0_12px_36px_rgb(0_0_0/0.18)] backdrop-blur-xl group-focus-within:block group-hover:block"
                >
                  <p className="font-identity text-site-foreground/50 text-xs tracking-[0.08em] whitespace-nowrap [font-variant-caps:small-caps]">
                    Suivre les nouveaux articles par flux RSS
                  </p>
                </div>
              </div>
            </div>
            <h1 className="font-identity mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Écrits
            </h1>
            <p className="text-site-foreground/65 mt-5 max-w-xl leading-relaxed">
              Notes, explorations et retours d’expérience sur mes travaux
              récents et mes sujets d’intérêt.
            </p>
          </header>

          {featuredPost ? (
            <Link
              href={`/blog/${featuredPost.slug}`}
              aria-label={`Lire l’article à la une : ${featuredPost.title}`}
              className="group/featured focus-visible:ring-site-accent/40 block rounded-xl focus-visible:ring-2 focus-visible:outline-none"
            >
              <article className="grid h-full gap-x-5 gap-y-3 rounded-xl border border-white/7 bg-white/4.5 p-4 shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg transition-colors duration-300 group-hover/featured:border-white/15 group-hover/featured:bg-white/5.5 sm:grid-cols-[minmax(0,0.9fr)_minmax(15rem,1.1fr)]">
                <div className="min-w-0">
                  <p className="font-identity border-site-accent/20 bg-site-accent/15 text-site-accent inline-flex w-fit rounded-md border px-2.5 py-1 text-xs font-semibold tracking-[0.14em] uppercase">
                    À la une
                  </p>
                  <p className="font-identity text-site-accent mt-2 text-sm font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
                    {featuredPost.typeLabel}
                  </p>
                  <h2 className="font-identity mt-1.5 text-2xl leading-tight font-semibold">
                    {featuredPost.title}
                  </h2>
                  <p className="text-site-foreground/55 mt-2 line-clamp-3 text-sm leading-relaxed">
                    {featuredPost.description}
                  </p>
                </div>

                <div className="relative aspect-video min-w-0 overflow-hidden rounded-lg border border-white/8 bg-white/4 sm:aspect-auto sm:h-full sm:min-h-44">
                  {featuredPost.cover ? (
                    <Image
                      src={featuredPost.cover}
                      alt={featuredPost.coverAlt ?? ''}
                      fill
                      priority
                      className="object-cover"
                      style={{
                        objectPosition: getCoverObjectPosition(
                          featuredPost.coverFocus,
                        ),
                      }}
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, calc(100vw - 4rem)"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="text-site-foreground/15 font-identity absolute inset-0 flex items-center justify-center text-5xl font-semibold"
                    >
                      {featuredPost.title[0]}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 sm:col-span-2 sm:grid sm:grid-cols-[minmax(0,0.9fr)_minmax(15rem,1.1fr)] sm:gap-5">
                  <p className="font-identity text-site-foreground/40 text-sm [font-variant-caps:small-caps]">
                    {featuredPost.meta}
                  </p>
                  <span className="text-site-foreground/55 group-hover/featured:text-site-accent font-identity ml-auto flex items-center gap-2 py-1 pl-3 text-sm font-medium transition-colors">
                    Lire l’article
                    <ArrowRight
                      aria-hidden="true"
                      size={18}
                      className="transition-transform duration-300 group-hover/featured:translate-x-1"
                    />
                  </span>
                </div>
              </article>
            </Link>
          ) : null}
        </section>

        <BlogIndex posts={posts} />

        <EndCta
          eyebrow="La conversation continue"
          body={[
            'D’autres notes et articles sont en préparation.',
            'Un sujet vous parle ou mérite d’être creusé ?',
          ]}
        />
      </div>
    </main>
  )
}
