'use client'

import { ArrowRight, ChevronDown, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FilterDropdown } from '@/components/filter-dropdown'
import { BLOG_POST_TYPE_LABELS } from '@/features/blog/application/post-types'
import { getCoverObjectPosition } from '@/features/blog/application/cover'
import type { BlogPost } from '@/features/blog/application/posts'

type BlogIndexProps = {
  posts: BlogPost[]
}

type DateSort = 'newest' | 'oldest'
type OpenFilter = 'type' | 'sort' | null

const INITIAL_VISIBLE_COUNT = 3
const LOAD_MORE_COUNT = 3

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr-FR')
}

export function BlogIndex({ posts }: BlogIndexProps) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [sort, setSort] = useState<DateSort>('newest')
  const [openFilter, setOpenFilter] = useState<OpenFilter>(null)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

  const typeOptions = [
    { value: 'all', label: 'Tous les types' },
    ...Object.entries(BLOG_POST_TYPE_LABELS).map(([value, label]) => ({
      value,
      label,
    })),
  ]
  const sortOptions = [
    { value: 'newest', label: 'Plus récents' },
    { value: 'oldest', label: 'Plus anciens' },
  ]
  const normalizedQuery = normalize(query.trim())
  const filteredPosts = posts
    .filter((post) => type === 'all' || post.type === type)
    .filter((post) => {
      if (!normalizedQuery) return true

      return normalize(
        `${post.title} ${post.description} ${post.tags.join(' ')}`,
      ).includes(normalizedQuery)
    })
    .sort((first, second) =>
      sort === 'newest'
        ? second.publishedAt.localeCompare(first.publishedAt)
        : first.publishedAt.localeCompare(second.publishedAt),
    )
  const visiblePosts = filteredPosts.slice(0, visibleCount)
  const remainingCount = filteredPosts.length - visiblePosts.length

  const resetVisibleCount = () => setVisibleCount(INITIAL_VISIBLE_COUNT)

  return (
    <section aria-label="Tous les articles" className="mt-6">
      <div className="bg-site-background grid gap-3 rounded-[1.4rem] border border-white/10 p-3 shadow-[0_12px_36px_rgb(0_0_0/0.18)] sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(12rem,0.75fr)_minmax(12rem,0.75fr)]">
        <label className="relative block">
          <span className="sr-only">Rechercher un article</span>
          <Search
            aria-hidden="true"
            size={17}
            className="text-site-foreground/35 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              resetVisibleCount()
            }}
            placeholder="Rechercher un article…"
            className="text-site-foreground placeholder:text-site-foreground/30 focus:border-site-accent/40 focus:ring-site-accent/30 bg-site-background h-10 w-full rounded-xl border border-white/7 pr-3 pl-10 text-sm transition outline-none focus:ring-2"
          />
        </label>

        <FilterDropdown
          id="type-filter"
          label="Filtrer par type"
          value={type}
          options={typeOptions}
          open={openFilter === 'type'}
          onToggle={() =>
            setOpenFilter((current) => (current === 'type' ? null : 'type'))
          }
          onChange={(value) => {
            setType(value)
            setOpenFilter(null)
            resetVisibleCount()
          }}
        />

        <div className="sm:col-span-2 lg:col-span-1">
          <FilterDropdown
            id="date-sort"
            label="Trier par date de publication"
            value={sort}
            options={sortOptions}
            open={openFilter === 'sort'}
            onToggle={() =>
              setOpenFilter((current) => (current === 'sort' ? null : 'sort'))
            }
            onChange={(value) => {
              setSort(value as DateSort)
              setOpenFilter(null)
              resetVisibleCount()
            }}
          />
        </div>
      </div>

      <p
        aria-live="polite"
        className="font-identity text-site-accent mt-6 text-sm font-medium tracking-[0.08em] [font-variant-caps:small-caps]"
      >
        {filteredPosts.length}{' '}
        {filteredPosts.length > 1 ? 'articles' : 'article'}
      </p>

      {visiblePosts.length > 0 ? (
        <ol
          aria-label="Catalogue des écrits"
          className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visiblePosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group/card focus-visible:ring-site-accent/40 block h-full cursor-pointer rounded-[1.25rem] focus-visible:ring-2 focus-visible:outline-none"
              >
                <article className="flex h-full flex-col rounded-[1.25rem] border border-white/7 bg-white/4.5 p-4 shadow-[0_12px_36px_rgb(0_0_0/0.16)] backdrop-blur-lg transition-colors duration-300 group-hover/card:border-white/15">
                  <p className="font-identity text-site-accent text-sm font-semibold tracking-[0.08em] [font-variant-caps:small-caps]">
                    {post.typeLabel}
                  </p>

                  <div className="relative mt-3 aspect-video overflow-hidden rounded-xl border border-white/8 bg-white/4">
                    {post.cover ? (
                      <Image
                        src={post.cover}
                        alt={post.coverAlt ?? ''}
                        fill
                        className="object-cover"
                        style={{
                          objectPosition: getCoverObjectPosition(
                            post.coverFocus,
                          ),
                        }}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 4rem)"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="text-site-foreground/15 font-identity absolute inset-0 flex items-center justify-center text-5xl font-semibold"
                      >
                        {post.title[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="font-identity mt-3 text-lg leading-tight font-semibold sm:text-xl">
                    {post.title}
                  </h3>
                  <p className="text-site-foreground/55 mt-2 line-clamp-3 text-sm leading-relaxed">
                    {post.description}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                    <p className="font-identity text-site-foreground/40 text-xs [font-variant-caps:small-caps]">
                      {post.meta}
                    </p>
                    <ArrowRight
                      aria-hidden="true"
                      size={20}
                      className="text-site-accent shrink-0 transition-transform duration-300 group-hover/card:translate-x-1"
                    />
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-site-foreground/50 mt-10 text-sm">
          Aucun article ne correspond à ces critères.
        </p>
      )}

      {remainingCount > 0 ? (
        <div className="mt-7 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((current) => current + LOAD_MORE_COUNT)
            }
            className="font-identity bg-site-accent text-site-background focus-visible:ring-site-accent/50 focus-visible:ring-offset-site-background inline-flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Voir plus d’articles
            <ChevronDown aria-hidden="true" size={16} />
          </button>
          <p className="font-identity text-site-foreground/40 text-xs tracking-[0.08em] [font-variant-caps:small-caps]">
            {visiblePosts.length} articles sur {filteredPosts.length} affichés
          </p>
        </div>
      ) : null}
    </section>
  )
}
