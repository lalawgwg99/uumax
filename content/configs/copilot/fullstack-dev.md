---
title: "Full-Stack Developer"
description: "GitHub Copilot instructions for full-stack TypeScript projects. Enforces Next.js, Node.js, and PostgreSQL conventions across your entire codebase."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "copilot"
useCases: ["fullstack", "frontend", "backend"]
tags: ["typescript", "nextjs", "nodejs", "postgresql", "react"]
pricing: "free"
configType: "copilot-instructions"
includes: ["copilot-instructions.md"]
version: "1.0.0"
lastUpdated: "2026-03-27"
featured: true
---

## Overview

This config turns GitHub Copilot into a senior full-stack TypeScript engineer. Save it as `.github/copilot-instructions.md` in your repo root and Copilot will automatically follow these conventions across VS Code, JetBrains, and the CLI.

## The Config

```markdown
# Copilot Instructions — Full-Stack TypeScript

## Tech Stack
- Frontend: Next.js 15 (App Router), React 19, Tailwind CSS v4
- Backend: Node.js, Express / Next.js API routes
- Database: PostgreSQL with Drizzle ORM
- Testing: Vitest + Playwright
- Package manager: pnpm

## Coding Standards
- TypeScript strict mode everywhere, never use `any`
- Prefer `interface` over `type` for object shapes
- Named exports only — no default exports except pages and layouts
- Arrow functions for callbacks; regular functions for top-level declarations
- Error handling: Result pattern preferred, avoid try/catch for control flow
- No commented-out code in commits

## File Organization
- Feature-based folders under `src/features/`
- Shared UI primitives in `src/components/ui/`
- Server actions in `src/actions/`
- Database queries isolated in `src/db/queries/`
- Keep components under 150 lines; extract when exceeding

## API & Database
- Always use parameterized queries — never interpolate user input into SQL
- Never modify committed migration files
- All API routes must validate input with Zod before processing
- Return consistent error shapes: `{ error: string, code: string }`

## Git Conventions
- Conventional commits: feat|fix|refactor|docs|test|chore
- One logical change per commit
- PR title must match primary commit type
- Never commit `.env` or secrets

## Testing
- Unit tests for all utility functions and custom hooks
- Integration tests for API routes hitting a real test database
- E2E tests (Playwright) for critical user flows
- Always test the happy path + at least one error case

## React & Next.js
- Prefer React Server Components; use `'use client'` only when needed
- Co-locate component styles, tests, and types in the same folder
- Use `next/image` for all images, `next/link` for all internal links
- Avoid prop drilling beyond 2 levels — use context or state management
```

## Usage

1. Copy the config above
2. Create `.github/copilot-instructions.md` in your project root
3. Paste and save — Copilot picks it up automatically (no restart needed)

## What You Get

- Consistent TypeScript patterns enforced across every suggestion
- Safe database practices baked in from the start
- Testing requirements that don't over-engineer small projects
- Clean git history with conventional commits
- Works across VS Code, JetBrains IDEs, and GitHub Copilot CLI
