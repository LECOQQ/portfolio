import type { BlogPostType } from '@/lib/content-frontmatter'

export const BLOG_POST_TYPE_LABELS: Record<BlogPostType, string> = {
  article: 'Article',
  note: 'Note',
  tutoriel: 'Tutoriel',
  rex: "Retour d'expérience",
  veille: 'Veille',
  essai: 'Essai',
}
