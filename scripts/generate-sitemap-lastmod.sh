#!/usr/bin/env bash
set -Eeuo pipefail

repository_root="$(git rev-parse --show-toplevel 2>/dev/null)" \
  || { echo "ERROR: Git history is required to generate sitemap lastmod values." >&2; exit 1; }
cd "$repository_root"

readonly semantic_shared_sources=(
  app/layout.tsx
  lib/site-config.ts
  ui/structured-data.tsx
)

first_route=true

last_modified() {
  local value

  value="$(git log -1 --format=%cI -- "$@" "${semantic_shared_sources[@]}")"
  [[ -n "$value" ]] \
    || { echo "ERROR: No Git modification date found for $*." >&2; exit 1; }
  printf '%s' "$value"
}

emit_route() {
  local route="$1"
  shift

  if [[ "$first_route" == false ]]; then
    printf ','
  fi
  printf '"%s":"%s"' "$route" "$(last_modified "$@")"
  first_route=false
}

emit_mdx_routes() {
  local content_dir="$1"
  local route_prefix="$2"
  local source
  local slug

  [[ -d "$content_dir" ]] || return 0

  for source in "$content_dir"/*.mdx; do
    [[ -e "$source" ]] || continue
    slug="$(basename "$source" .mdx)"
    emit_route "$route_prefix/$slug/" "$source"
  done
}

printf '{'
emit_route '/' app/page.tsx
emit_route '/about/' app/about/page.tsx
emit_route '/projects/' app/projects/page.tsx
emit_route '/blog/' app/blog/page.tsx
emit_route '/contact/' app/contact/page.tsx
emit_route '/privacy/' app/privacy/page.tsx content/legal/privacy.mdx
emit_mdx_routes content/blog /blog
emit_mdx_routes content/projects /projects
printf '}\n'
