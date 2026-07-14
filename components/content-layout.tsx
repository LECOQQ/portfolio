import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ContentToc } from '@/components/content-toc'

const MDX_CONTENT_ID = 'mdx-content'

type ContentLayoutProps = {
  title: string
  description: string
  /** Page-specific metadata line (e.g. last updated date, publish date). */
  meta?: ReactNode
  /** Link back to the index this content belongs to (e.g. "Retour aux
   * écrits"), shown above the title. */
  back?: { href: string; label: string }
  cover?: {
    src: string
    alt: string
    focus?: { x: number; y: number }
  }
  footer?: ReactNode
  children: ReactNode
}

/**
 * Generic page structure for MDX-backed content (legal pages today, blog
 * articles later): header chrome (title, description, meta) plus a prose
 * wrapper for the MDX body. Owns layout only — visual identity comes from
 * the MDX primitives and app/globals.css, not from this component.
 *
 * The page chrome (header, rule) and MDX body share a 66ch reading column so
 * their left and right edges stay aligned. The TOC is fixed in the left
 * viewport margin on xl+ so it stays on screen while scrolling.
 */
export function ContentLayout({
  title,
  description,
  meta,
  back,
  cover,
  footer,
  children,
}: ContentLayoutProps) {
  return (
    <main className={`flex-1 px-6 pt-24 sm:px-10 ${footer ? 'pb-6' : 'pb-24'}`}>
      <ContentToc containerId={MDX_CONTENT_ID} />

      <div className="mx-auto w-full max-w-3xl">
        <article data-particle-muted>
          {back ? (
            <div className="mx-auto mb-4 max-w-[66ch]">
              <Link
                href={back.href}
                className="font-identity text-site-foreground/50 hover:text-site-accent focus-visible:ring-site-accent/40 -ml-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
              >
                <ArrowLeft aria-hidden="true" size={15} />
                {back.label}
              </Link>
            </div>
          ) : null}

          <header className="mx-auto max-w-[66ch] border-b border-white/7 pb-6">
            <h1 className="font-identity text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <div className="mt-4">
              <p className="text-site-foreground/65 text-base leading-relaxed">
                {description}
              </p>
              {meta ? (
                <p className="text-site-foreground/45 mt-1 font-mono text-xs tracking-[0.02em] uppercase">
                  {meta}
                </p>
              ) : null}
            </div>
          </header>

          {cover ? (
            // A plain image avoids shipping the next/image runtime to every
            // page using this shared layout. Images are unoptimized because
            // the site is statically exported.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover.src}
              alt={cover.alt}
              width={1200}
              height={675}
              loading="eager"
              fetchPriority="high"
              className="mt-6 aspect-video w-full rounded-2xl border border-white/7 object-cover"
              style={{
                objectPosition: `${cover.focus?.x ?? 50}% ${cover.focus?.y ?? 50}%`,
              }}
            />
          ) : null}

          <div className="relative mt-6">
            <div
              id={MDX_CONTENT_ID}
              className="prose prose-sm sm:prose-base prose-p:mt-0 prose-p:mb-5 prose-li:my-0.5 relative mx-auto max-w-[66ch] py-1 font-normal"
            >
              {children}
            </div>
          </div>

          {footer ? (
            <footer className="mx-auto mt-16 max-w-[66ch]">{footer}</footer>
          ) : null}
        </article>
      </div>
    </main>
  )
}
