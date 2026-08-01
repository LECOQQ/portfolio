# syntax=docker/dockerfile:1

FROM node:24.18.0-alpine AS dependencies

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

RUN apk add --no-cache bash
RUN corepack enable && corepack prepare pnpm@11.15.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS build

ARG NEXT_PUBLIC_LINKEDIN_URL
ARG NEXT_PUBLIC_GITHUB_URL
ARG NEXT_PUBLIC_GITEA_URL
ARG NEXT_PUBLIC_MAKERWORLD_URL
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_UMAMI_SCRIPT_URL
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ARG SITEMAP_LASTMOD_JSON

ENV NEXT_PUBLIC_LINKEDIN_URL="$NEXT_PUBLIC_LINKEDIN_URL"
ENV NEXT_PUBLIC_GITHUB_URL="$NEXT_PUBLIC_GITHUB_URL"
ENV NEXT_PUBLIC_GITEA_URL="$NEXT_PUBLIC_GITEA_URL"
ENV NEXT_PUBLIC_MAKERWORLD_URL="$NEXT_PUBLIC_MAKERWORLD_URL"
ENV NEXT_PUBLIC_CONTACT_EMAIL="$NEXT_PUBLIC_CONTACT_EMAIL"
ENV NEXT_PUBLIC_UMAMI_SCRIPT_URL="$NEXT_PUBLIC_UMAMI_SCRIPT_URL"
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID="$NEXT_PUBLIC_UMAMI_WEBSITE_ID"
ENV SITEMAP_LASTMOD_JSON="$SITEMAP_LASTMOD_JSON"

COPY . .
RUN pnpm run build
RUN test -f out/favicon.ico \
  && test -f out/favicons/favicon.svg \
  && test -f out/robots.txt \
  && test -f out/sitemap.xml

FROM nginx:1.31.0-alpine AS runtime

# Generic public default: the real, self-hosted Umami origin is injected at
# container start (see infra/docker-compose.yml) via nginx's built-in
# envsubst-on-templates entrypoint, so it never has to be hardcoded here.
ENV UMAMI_ORIGIN=https://analytics.example.com

COPY infra/nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/healthz || exit 1
