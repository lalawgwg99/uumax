---
title: "Frontend React"
description: "Windsurf rules for React frontend development with TypeScript, Vite, and modern tooling."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "windsurf"
useCases: ["frontend"]
tags: ["react", "typescript", "vite", "tanstack", "tailwind"]
pricing: "free"
configType: "bundle"
includes: [".windsurfrules"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: false
---

## Overview

Windsurf rules for frontend React development with TypeScript, Vite, and the TanStack ecosystem. Emphasizes component composition, type safety, and performance patterns for single-page applications.

## The Config

```markdown
# .windsurfrules — Frontend React

You are a senior frontend engineer specializing in React with TypeScript.

## Tech Stack
- Framework: React 19 with Vite 6
- Language: TypeScript strict mode
- Routing: TanStack Router (type-safe routes)
- Data fetching: TanStack Query v5
- Forms: React Hook Form + Zod validation
- Styling: Tailwind CSS v4
- State: Zustand for client state, TanStack Query for server state

## Component Architecture
- Functional components only
- Props defined with interfaces: `interface ButtonProps { ... }`
- Prefer composition: render props and children over deep prop drilling
- Split components at the data boundary: container (fetches) → presentational (renders)
- Maximum component size: 100 lines — extract when exceeding
- Colocate component, styles, tests, and types in the same folder

## TypeScript Rules
- Strict mode: no `any`, no type assertions unless unavoidable
- Prefer `interface` over `type` for component props and API responses
- Use `as const` for literal arrays and objects
- Generic components when the pattern repeats 3+ times
- Zod schemas as single source of truth — infer types with `z.infer<typeof schema>`

## Data Fetching (TanStack Query)
- Define query keys as factory: `userKeys.detail(id)` not inline arrays
- Custom hooks per query: `useUser(id)` wraps `useQuery`
- Mutations return the updated resource for optimistic UI
- Prefetch on hover for critical navigation paths
- Stale time: 5 minutes default, override per query as needed
- Error boundaries: wrap route-level components with `QueryErrorResetBoundary`

## Routing (TanStack Router)
- File-based route definitions in `src/routes/`
- Typed search params with Zod validation
- Route loaders for critical data (eliminates loading spinners)
- Lazy-load route components for code splitting
- Pending states: show skeleton UI, not spinners

## Forms
- React Hook Form for all forms (no uncontrolled forms)
- Zod schema validation with `@hookform/resolvers/zod`
- Display validation errors inline below each field
- Disable submit button while `isSubmitting`
- Optimistic UI for simple updates, loading state for complex ones

## Performance
- Lazy load routes and heavy components with `React.lazy`
- Memoize selectively: list items and expensive computed values
- Virtualize long lists with TanStack Virtual
- Images: lazy load below the fold, explicit width/height
- Bundle analysis: keep initial JS under 200KB gzipped

## Testing
- Vitest + Testing Library for component tests
- MSW for API mocking (shared handlers between tests and dev)
- Test user flows, not component internals
- Accessibility: test with `axe-core` via `vitest-axe`
```

## Usage

Save as `.windsurfrules` in your React project root. Windsurf will follow these patterns for consistent, performant frontend code.
