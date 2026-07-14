'use client'

import Link from 'next/link'
import {
  primaryActionClassName,
  secondaryActionClassName,
  StatusPage,
} from '@/ui/status-page'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <StatusPage
      eyebrow="Erreur inattendue"
      title="Signal interrompu"
      description="Un incident temporaire empêche l’affichage de cette page. Vous pouvez réessayer ou revenir à l’accueil."
      actions={
        <>
          <button
            type="button"
            className={`${primaryActionClassName} cursor-pointer`}
            onClick={reset}
          >
            Réessayer
          </button>
          <Link href="/" className={secondaryActionClassName}>
            Retour à l’accueil
          </Link>
        </>
      }
    />
  )
}
