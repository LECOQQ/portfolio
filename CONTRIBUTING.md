---
title: 'Contributing guide'
description: 'Set up the project, follow its conventions, and propose a change'
status: stable
---

# 🤝 Contributing

Thank you for your interest in the project. This repository is primarily a
personal portfolio: bug fixes, accessibility improvements, and focused
technical proposals are welcome, while editorial direction and content choices
remain the maintainer's responsibility.

## 🔄 Public mirror

The GitHub repository is a generated, read-only mirror. Pull requests may be
opened there, but accepted changes are applied manually to the private source
repository with appropriate attribution, then published again through the
curated repository. Changes made directly to the mirror are not a source of
truth and may be overwritten by the next synchronization.

## 🧭 Before you start

- Check whether an issue or pull request already covers the topic.
- Open an issue before making a significant or structural change.
- Keep each contribution focused on one verifiable need.
- Never include secrets, non-public personal data, or environment-specific
  configuration.

## 🧰 Local setup

The project requires Node.js `24.18.0`, pnpm `11.15.1`, Git, and Make.

```bash
make install
make run
```

The site is then available at
[`http://localhost:3008`](http://localhost:3008).

## 🧱 Conventions

- Use TypeScript and Tailwind CSS for code and styling.
- Favor Server Components and keep `'use client'` at the smallest interactive
  boundary that requires it.
- Reserve `app/` for routing and place logic in `features/`, `shared/`, or
  `lib/` according to its responsibility.
- Write code, comments, and docstrings in English.
- Write clear documentation with correct spelling and punctuation.
- Use Conventional Commits with an English description.
- Add or update tests for every significant behavior.

## ✅ Validation

Before opening a pull request:

```bash
make format
make check
```

`make check` runs lint, typecheck, tests, architecture guardrails, the format
check, and the static production build.

## 📬 Pull requests

A pull request should:

- explain the problem and the chosen solution;
- avoid unrelated behavior changes;
- report the checks that were run and any known limitations;
- include screenshots for visual changes;
- update the documentation when an established usage or contract changes.

## ⚖️ Contribution license

By contributing code, you agree that your contribution may be distributed
under the MIT License in `LICENSE`.

Editorial or media contributions require the maintainer's explicit approval.
You must hold the necessary rights to any proposed content and clearly identify
third-party materials. The terms in `CONTENT-LICENSE.md` apply to accepted
content unless otherwise agreed in writing.
