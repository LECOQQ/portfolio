import type { Metadata } from 'next'
import Link from 'next/link'
import { primaryActionClassName, StatusPage } from '@/ui/status-page'

export const metadata: Metadata = {
  title: 'Page introuvable',
  description: 'La page demandée n’existe pas ou n’est plus accessible.',
  // Clear the root directive; Next.js adds the canonical `noindex` tag for
  // not-found pages during prerendering.
  robots: null,
  alternates: {},
  openGraph: null,
  twitter: null,
}

export default function NotFound() {
  return (
    <StatusPage
      eyebrow="Erreur 404"
      title="Hors des cartes"
      description="Cette page n’existe pas, a été déplacée ou n’est plus accessible. Revenons à un point de repère connu."
      actions={
        <Link href="/" className={primaryActionClassName}>
          Retour à l’accueil
        </Link>
      }
    />
  )
}
