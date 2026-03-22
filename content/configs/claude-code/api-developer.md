---
title: "API Developer"
description: "CLAUDE.md for designing and building REST and GraphQL APIs with Node.js, Express, and Apollo Server."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "claude-code"
useCases: ["backend"]
tags: ["rest", "graphql", "nodejs", "express", "apollo", "openapi"]
pricing: "free"
configType: "claude-md"
includes: ["CLAUDE.md"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: false
---

## Overview

This config shapes Claude Code into a senior API engineer focused on designing robust, well-documented REST and GraphQL APIs. It enforces OpenAPI-first design, proper HTTP semantics, and consistent error handling across all endpoints.

## The Config

```markdown
# CLAUDE.md — API Developer

## Tech Stack
- Runtime: Node.js 22+ with TypeScript
- REST: Express 5 with Zod validation
- GraphQL: Apollo Server 4 with code-first schema (Pothos)
- Documentation: OpenAPI 3.1 (auto-generated via zod-to-openapi)
- Database: PostgreSQL with Drizzle ORM
- Auth: JWT (access + refresh tokens), API keys for service-to-service

## API Design Principles
- REST: resource-oriented URLs, plural nouns, no verbs in paths
- Use proper HTTP methods: GET (read), POST (create), PUT (full replace), PATCH (partial update), DELETE
- Always return consistent envelope: `{ data, error, meta }`
- Pagination: cursor-based by default, offset-based only if explicitly requested
- Versioning: URL path prefix (`/v1/`, `/v2/`)

## Error Handling
- Return appropriate HTTP status codes (don't use 200 for errors)
- Error shape: `{ error: { code: "RESOURCE_NOT_FOUND", message: "...", details?: [...] } }`
- Validation errors (400): include field-level details array
- Never expose stack traces or internal details in production responses
- Use a centralized error handler middleware

## GraphQL Specifics
- Define types with Pothos builder, not SDL strings
- Use DataLoader for N+1 query prevention
- Limit query depth to 7 and complexity to 1000
- Mutations return the modified resource, not just a boolean
- Use input types for mutation arguments

## Security
- Rate limiting on all public endpoints (express-rate-limit)
- Input validation on every endpoint using Zod schemas
- CORS configured explicitly, never wildcard in production
- Helmet.js for security headers
- Sanitize all log output to prevent log injection

## Testing
- Integration tests for every endpoint (supertest)
- Test all status codes: 200, 201, 400, 401, 403, 404, 409, 500
- Mock external services, never call them in tests
- Load test critical endpoints with k6 before release

## File Structure
- `src/routes/` — Express route handlers grouped by resource
- `src/graphql/` — Pothos type definitions and resolvers
- `src/middleware/` — Auth, validation, error handling, rate limiting
- `src/services/` — Business logic (route handlers stay thin)
- `src/schemas/` — Zod schemas (shared between validation and OpenAPI)
```

## Usage

1. Copy the config above into `CLAUDE.md` at your project root
2. Claude Code will follow REST/GraphQL best practices automatically
3. Works best with Express + Apollo hybrid APIs or standalone REST services
