---
title: "Full-Stack Developer"
description: "Production-ready CLAUDE.md for full-stack TypeScript projects with Next.js, Node.js, and PostgreSQL."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "claude-code"
useCases: ["fullstack", "frontend", "backend"]
tags: ["typescript", "nextjs", "nodejs", "postgresql", "react"]
pricing: "free"
configType: "claude-md"
includes: ["CLAUDE.md"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: true
---

## Overview

This config turns Claude Code into a senior full-stack TypeScript engineer. It enforces consistent coding standards, testing practices, and git conventions across your entire stack.

## The Config

```markdown
# CLAUDE.md — Full-Stack TypeScript

## Tech Stack
- Frontend: Next.js 15 (App Router), React 19, Tailwind CSS v4
- Backend: Node.js, Express / Next.js API routes
- Database: PostgreSQL with Drizzle ORM
- Testing: Vitest + Playwright
- Package manager: pnpm

## Coding Standards
- TypeScript strict mode, no `any`
- Prefer `interface` over `type` for object shapes
- Use named exports, no default exports (except pages)
- Functions: prefer arrow functions for callbacks, regular functions for top-level
- Error handling: use Result pattern, avoid try/catch for control flow

## File Organization
- Feature-based folders under `src/features/`
- Shared components in `src/components/ui/`
- Server actions in `src/actions/`
- Database queries in `src/db/queries/`

## Git Conventions
- Conventional commits: feat|fix|refactor|docs|test|chore
- One logical change per commit
- PR title matches the primary commit type

## Testing Requirements
- Unit tests for utility functions and hooks
- Integration tests for API routes
- E2E tests for critical user flows
- Minimum: test the happy path + one error case

## Rules
- Never modify migration files after they've been committed
- Always use parameterized queries, never string interpolation for SQL
- Keep components under 150 lines; extract when exceeding
- Prefer server components; use 'use client' only when needed
```

## Usage

1. Copy the config above
2. Save as `CLAUDE.md` in your project root
3. Start Claude Code — it will automatically follow these conventions

## What You Get

- Consistent TypeScript patterns across frontend and backend
- Safe database practices (parameterized queries, migration protection)
- Sensible testing requirements without over-engineering
- Clean git history with conventional commits
