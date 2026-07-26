# Purpose: Provide the complete workflow for the generated project.
# Scope: Standalone root Makefile of the generated composition.
# Composition: Rendered from starter-kit Makefile fragments.

SHELL := /bin/bash
.SHELLFLAGS := -eo pipefail -c
.ONESHELL:

NODE_VERSION := 24.18.0
PNPM_VERSION := 11.15.1
DEV_PORT ?= 3008
DEPLOY_PORT ?= 3009
BIND_ADDRESS ?= 127.0.0.1
NEXT_TELEMETRY_DISABLED ?= 1
COMPOSE_FILE := infra/docker-compose.yml
DOCKERFILE := infra/Dockerfile
PORTFOLIO_IMAGE ?= portfolio:local

export NEXT_TELEMETRY_DISABLED

.DEFAULT_GOAL := help

-include publication/Makefile

.PHONY: install run dev format lint typecheck test check-fast check ci doctor help build format-check guardrails deps-outdated deps-outdated-all deps-update deps-audit docker-build docker-up docker-down

install: doctor ## Install dependencies and configure Git hooks
	@pnpm install
	@pnpm exec husky

run: dev ## Start the development server

dev: ## Start the development server
	@echo "Starting development server on port $(DEV_PORT)"
	@pnpm run dev -p $(DEV_PORT)

format: ## Format source files
	@pnpm run format

lint: ## Lint source files
	@pnpm run lint

typecheck: ## Type-check with TypeScript
	@pnpm run typecheck

test: ## Run unit and integration tests
	@pnpm run test

check-fast: ## Fast quality gate: lint + typecheck + test + guardrails
	@$(MAKE) lint
	@$(MAKE) typecheck
	@$(MAKE) test
	@$(MAKE) guardrails

check: ## Full quality gate: check-fast + format check + build
	@$(MAKE) check-fast
	@$(MAKE) format-check
	@$(MAKE) build

ci: ## CI pipeline: install + check
	@$(MAKE) install
	@$(MAKE) check

doctor: ## Check required tools
	@command -v node >/dev/null 2>&1 || { echo "node not found"; exit 1; }
	@command -v pnpm >/dev/null 2>&1 || { echo "pnpm not found"; exit 1; }
	@echo "OK: node $$(node --version), pnpm $$(pnpm --version)"

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Build for production
	@pnpm run build

format-check: ## Check formatting without modifying files
	@pnpm run format:check

guardrails: ## Run architecture boundary guardrails
	@pnpm run guardrails

deps-outdated: ## List updates compatible with declared dependency ranges
	@status=0
	pnpm outdated --compatible || status=$$?
	if (( status > 1 )); then exit "$$status"; fi

deps-outdated-all: ## List all updates, including new major versions
	@status=0
	pnpm outdated || status=$$?
	if (( status > 1 )); then exit "$$status"; fi

deps-update: ## Update dependencies within declared ranges and run all checks
	@pnpm update
	@$(MAKE) check

deps-audit: ## Check production dependencies against known vulnerabilities
	@pnpm audit --prod

docker-build: ## Build the production container image
	@SITEMAP_LASTMOD_JSON="$$(bash scripts/generate-sitemap-lastmod.sh)"
	docker build \
		--file $(DOCKERFILE) \
		--build-arg SITEMAP_LASTMOD_JSON="$$SITEMAP_LASTMOD_JSON" \
		--tag $(PORTFOLIO_IMAGE) \
		.

docker-up: docker-build ## Build and start the production container on DEPLOY_PORT
	@DEPLOY_PORT=$(DEPLOY_PORT) BIND_ADDRESS=$(BIND_ADDRESS) PORTFOLIO_IMAGE=$(PORTFOLIO_IMAGE) docker compose -f $(COMPOSE_FILE) up --detach

docker-down: ## Stop the production container
	@docker compose -f $(COMPOSE_FILE) down
