---
title: "Git Conventions"
description: "Universal git commit, branching, and pull request conventions for any AI coding agent."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "generic"
useCases: ["workflow", "git"]
tags: ["git", "commits", "pull-requests", "branching", "conventions"]
pricing: "free"
configType: "bundle"
includes: ["CLAUDE.md", ".cursorrules", ".windsurfrules"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: false
---

## Overview

Framework-agnostic git conventions for AI coding agents. Defines commit message format, branching strategy, and pull request standards that work with any tool or language.

## The Config

```markdown
# Git Conventions

## Commit Messages
Format: `<type>(<scope>): <subject>`

Types:
- `feat` — new feature visible to the user
- `fix` — bug fix
- `refactor` — code change that neither fixes a bug nor adds a feature
- `docs` — documentation changes only
- `test` — adding or updating tests
- `chore` — build, CI, dependency updates, tooling
- `perf` — performance improvement
- `style` — formatting, whitespace (no logic change)

Rules:
- Subject line: imperative mood, lowercase, no period, max 72 characters
- Body (optional): explain WHY, not WHAT — the diff shows what changed
- Footer: reference issues with `Closes #123` or `Refs #456`
- One logical change per commit — if you say "and", it's two commits
- Never commit generated files, build output, or secrets

Examples:
- `feat(auth): add OAuth2 login with Google`
- `fix(api): return 404 instead of 500 for missing resources`
- `refactor(db): extract query builders into separate module`

## Branching Strategy
- `main` — production-ready code, always deployable
- `develop` — integration branch (optional, for teams that need staging)
- Feature branches: `feat/short-description` from `main`
- Bug fix branches: `fix/short-description` from `main`
- Hotfix branches: `hotfix/short-description` from `main`

Rules:
- Keep branches short-lived: merge within 1-3 days
- Rebase on `main` before opening a PR (no merge commits from main into feature)
- Delete branches after merge
- Never force-push to `main` or shared branches

## Pull Requests
Title: matches the primary commit type and scope

Body template:
```
## Summary
What changed and why (2-3 sentences)

## Changes
- Bullet list of specific changes

## Testing
- How was this tested?
- What should reviewers verify?

## Screenshots
(if UI changes)
```

Rules:
- One concern per PR — don't mix refactoring with features
- Keep PRs under 400 lines of diff when possible
- Self-review before requesting others
- Resolve all CI failures before requesting review
- Squash merge for feature branches, merge commit for release branches

## .gitignore Essentials
Always ignore:
- `node_modules/`, `vendor/`, `venv/`, `.venv/`
- `.env`, `.env.local`, `.env.*.local`
- Build output: `dist/`, `build/`, `out/`, `target/`
- IDE files: `.idea/`, `.vscode/` (except shared settings)
- OS files: `.DS_Store`, `Thumbs.db`
- Credentials: `*.pem`, `*.key`, `credentials.json`
```

## Usage

Append this config to your agent's instructions file (`CLAUDE.md`, `.cursorrules`, or `.windsurfrules`). It works alongside any framework-specific config.
