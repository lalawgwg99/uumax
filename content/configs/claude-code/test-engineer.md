---
title: "Test Engineer"
description: "CLAUDE.md for writing comprehensive tests with Vitest, Playwright, and Testing Library."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "claude-code"
useCases: ["testing", "qa"]
tags: ["vitest", "playwright", "testing-library", "tdd", "e2e"]
pricing: "free"
configType: "claude-md"
includes: ["CLAUDE.md"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: true
---

## Overview

This config turns Claude Code into a dedicated test engineer that writes thorough, maintainable tests. It covers unit tests with Vitest, component tests with Testing Library, and end-to-end tests with Playwright.

## The Config

```markdown
# CLAUDE.md — Test Engineer

## Testing Philosophy
- Test behavior, not implementation details
- Every test should answer: "what does the user/caller expect?"
- Prefer integration tests over unit tests for business logic
- Unit tests for pure functions and utilities
- E2E tests for critical user journeys only (login, checkout, etc.)

## Tech Stack
- Unit / Integration: Vitest 3 + @testing-library/react
- E2E: Playwright 1.50+
- Mocking: MSW 2 for HTTP, vi.mock() for modules
- Coverage: v8 provider, thresholds enforced in CI

## Vitest Conventions
- File naming: `*.test.ts` colocated next to source files
- Use `describe` blocks to group by function/feature
- Use `it` with human-readable descriptions: `it("returns 404 when user not found")`
- One assertion per logical concept (multiple expect() is fine if testing one behavior)
- Prefer `toEqual` over `toBe` for objects
- Use `beforeEach` for shared setup, avoid `beforeAll` unless truly expensive
- Never use `test.only` or `describe.only` in committed code

## Testing Library Rules
- Query priority: getByRole > getByLabelText > getByPlaceholderText > getByText > getByTestId
- Never query by CSS class or tag name
- Use `screen` object for all queries
- Use `userEvent` (not `fireEvent`) for user interactions
- Wait for async updates with `waitFor` or `findBy*` queries
- Test accessibility: verify ARIA roles and labels exist

## Playwright Conventions
- Page Object Model for all E2E tests
- File naming: `*.spec.ts` in `e2e/` directory
- Use `test.describe` for feature grouping
- Locators: prefer `getByRole`, `getByLabel`, `getByText`
- Never use hardcoded waits (`page.waitForTimeout`); use `expect().toBeVisible()` or similar
- Screenshot on failure (configured in playwright.config.ts)
- Test data: use API seeding in `beforeAll`, clean up in `afterAll`
- Run in CI with 3 retries on flaky detection

## Coverage Requirements
- Statements: 80%
- Branches: 75%
- Functions: 80%
- New code in PRs: 90% (enforced by coverage diff check)
- Exclude: generated files, config files, type definitions

## Anti-Patterns to Avoid
- Testing implementation details (state changes, method calls)
- Snapshot tests for dynamic content
- Mocking what you don't own (wrap third-party, mock the wrapper)
- Tests that depend on execution order
- Overly DRY test code — some duplication improves readability
```

## Usage

1. Save as `CLAUDE.md` in your project root
2. Claude Code will write and refactor tests following these patterns
3. Pair with a framework-specific config (e.g., Full-Stack Developer) for best results
