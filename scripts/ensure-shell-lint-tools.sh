#!/usr/bin/env bash
set -Eeuo pipefail

missing=()
command -v shellcheck > /dev/null 2>&1 || missing+=(shellcheck)
command -v shfmt > /dev/null 2>&1 || missing+=(shfmt)

if ((${#missing[@]} > 0)); then
  privilege=()
  if ((EUID != 0)); then
    command -v sudo > /dev/null 2>&1 \
      || {
        echo "ERROR: ${missing[*]} missing and sudo is unavailable." >&2
        exit 1
      }
    privilege=(sudo)
  fi
  "${privilege[@]}" apt-get update
  "${privilege[@]}" apt-get install --yes --no-install-recommends "${missing[@]}"
fi

shellcheck --version
shfmt --version
