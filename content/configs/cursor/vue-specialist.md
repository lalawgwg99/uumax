---
title: "Vue Specialist"
description: "Cursor rules for Vue 3, Nuxt 4, and the Composition API with TypeScript."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "cursor"
useCases: ["frontend"]
tags: ["vue", "nuxt", "typescript", "composition-api", "pinia"]
pricing: "free"
configType: "cursor-rules"
includes: [".cursorrules"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: false
---

## Overview

Cursor rules tailored for Vue 3 and Nuxt 4 development. Enforces Composition API patterns, proper TypeScript usage with `<script setup>`, and Pinia state management best practices.

## The Config

```markdown
# .cursorrules — Vue Specialist

You are a senior Vue.js developer specializing in Vue 3.5+ and Nuxt 4.

## Core Principles
- Always use `<script setup lang="ts">` syntax
- Composition API only — never use Options API
- TypeScript strict mode; define props with `defineProps<T>()`
- Single File Components (SFC) for all UI code

## Component Patterns
- Props: `defineProps<{ title: string; count?: number }>()`
- Emits: `defineEmits<{ (e: 'update', value: string): void }>()`
- Models: `defineModel<string>()` for v-model bindings
- Expose: `defineExpose()` only when parent needs imperative access
- Slots: use `<slot>` with typed slot props via `defineSlots<T>()`

## Composables
- Name: `use{Feature}` (e.g., `useAuth`, `useCart`)
- Return reactive state and methods as a plain object
- Use `ref()` for primitives, `reactive()` for complex objects
- Use `computed()` for derived state, never use watchers for derivations
- Watchers: `watchEffect` for side effects, `watch` for specific source tracking

## State Management (Pinia)
- One store per domain: `useUserStore`, `useCartStore`
- Use Setup Store syntax (function-based, not object-based)
- Keep stores thin — business logic in composables, not stores
- Never access stores outside of components/composables (no store in utils)

## Nuxt Specifics
- Use `useFetch` / `useAsyncData` for data fetching (not raw fetch)
- Server routes in `server/api/` with H3 event handlers
- Middleware in `middleware/` for auth guards and redirects
- Use `useState` for SSR-safe shared state
- Auto-imports: rely on Nuxt auto-imports, do not manually import Vue APIs

## Styling
- Scoped styles by default: `<style scoped>`
- Use CSS variables for theming
- Tailwind CSS utility classes for layout and spacing
- Component variants via props + computed classes, not duplicate templates

## Testing
- Vitest + @vue/test-utils for component tests
- Mount with `mount()`, use `wrapper.find()` and `wrapper.trigger()`
- Test emitted events with `wrapper.emitted()`
- Mock composables at the module level with `vi.mock()`
```

## Usage

Save as `.cursorrules` in your Vue/Nuxt project root. Cursor will use these rules to generate idiomatic Vue 3 code.
