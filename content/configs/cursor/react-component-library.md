---
title: "React Component Library"
description: "Cursor rules for building a professional React component library with TypeScript, Storybook, and automated visual testing."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "cursor"
useCases: ["frontend"]
tags: ["react", "typescript", "storybook", "component-library", "design-system", "accessibility"]
pricing: "free"
configType: "cursor-rules"
includes: [".cursorrules"]
version: "1.0.0"
lastUpdated: "2026-03-27"
featured: true
---

## Overview

Opinionated `.cursorrules` for teams building a React component library or design system. Enforces component API consistency, accessibility, and Storybook documentation as first-class concerns.

## The Config

```
# .cursorrules — React Component Library

## Component Architecture
- Every component must have: a TypeScript interface for props, a default export, and a named export
- Use compound component pattern for complex components (e.g., Select + Select.Option)
- Prefer composition over prop explosion: if a component has >8 props, consider splitting
- All interactive components must be keyboard-navigable and screen-reader compatible

## Props API Design
- Use `className` for style overrides — never inline styles in the component itself
- Boolean props use positive framing: `disabled` not `notEnabled`
- Event handlers follow `on[Event]` convention: `onClick`, `onChange`, `onClose`
- Provide sensible defaults for all optional props
- Document each prop with JSDoc comments

## Accessibility (WCAG 2.1 AA)
- All form elements must have associated labels
- Interactive elements need visible focus indicators
- Color is never the sole means of conveying information
- Use semantic HTML: `<button>` for buttons, `<a>` for navigation links
- Test with axe-core; zero violations allowed in Storybook

## Storybook Requirements
Every component must have stories covering:
1. Default state
2. All significant variants (size, color, state)
3. Edge cases (empty, loading, error, max content)
4. Accessibility story with explicit a11y annotations

## Styling
- CSS Modules or css-in-js scoped to component — no global styles
- Use design tokens (CSS variables) for colors, spacing, typography
- Support both light and dark mode via `prefers-color-scheme` or a theme context
- Avoid magic numbers: extract to named constants

## Testing
- Unit test: component renders without crashing
- Behavior test: user interactions produce correct outcomes (React Testing Library)
- Visual regression: Chromatic or Percy for Storybook stories
- Snapshot tests are discouraged — they break without catching real bugs

## Exports
- Named exports only from `src/index.ts`
- Tree-shakeable: each component in its own file
- Export TypeScript types alongside components
- Semantic versioning; breaking prop changes = major version bump

## Rules
- No `any` in component props or return types
- Components that accept `children` must type them as `React.ReactNode`
- Do not import internal implementation details across components
- Run `pnpm build` and verify zero TypeScript errors before committing
```
