import { getBlogFeed } from '@/features/blog/application/feed'

export const dynamic = 'force-static'

export function GET() {
  const feed = getBlogFeed()

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}
