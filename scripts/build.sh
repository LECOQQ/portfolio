#!/usr/bin/env bash
set -Eeuo pipefail

if [[ -z "${SITEMAP_LASTMOD_JSON:-}" ]]; then
  SITEMAP_LASTMOD_JSON="$(bash scripts/generate-sitemap-lastmod.sh)"
  export SITEMAP_LASTMOD_JSON
fi

export NEXT_TELEMETRY_DISABLED=1
pnpm exec next build
