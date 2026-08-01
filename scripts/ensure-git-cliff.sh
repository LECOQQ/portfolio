#!/usr/bin/env bash
set -Eeuo pipefail

GIT_CLIFF_VERSION="2.13.1"

if command -v git-cliff > /dev/null 2>&1; then
  git-cliff --version
  exit 0
fi

archive="git-cliff-${GIT_CLIFF_VERSION}-x86_64-unknown-linux-gnu.tar.gz"
url="https://github.com/orhun/git-cliff/releases/download/v${GIT_CLIFF_VERSION}/${archive}"

workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

curl --fail --silent --show-error --location "$url" --output "$workdir/git-cliff.tar.gz"
tar --extract --gzip --file "$workdir/git-cliff.tar.gz" --directory "$workdir"

privilege=()
if ((EUID != 0)); then
  command -v sudo > /dev/null 2>&1 \
    || {
      echo "ERROR: git-cliff is missing and sudo is unavailable." >&2
      exit 1
    }
  privilege=(sudo)
fi

"${privilege[@]}" install -m 755 \
  "$workdir/git-cliff-${GIT_CLIFF_VERSION}/git-cliff" \
  /usr/local/bin/git-cliff

git-cliff --version
