#!/usr/bin/env bash
set -Eeuo pipefail

pnpm run images:generate

if [[ -z "${SITEMAP_LASTMOD_JSON:-}" ]]; then
  SITEMAP_LASTMOD_JSON="$(bash scripts/generate-sitemap-lastmod.sh)"
  export SITEMAP_LASTMOD_JSON
fi

export NEXT_TELEMETRY_DISABLED=1
pnpm exec next build

if ! grep -Rqs 'src[Ss]et="/images/generated/' out; then
  echo "Build validation failed: no responsive image srcset found in out/." >&2
  exit 1
fi
