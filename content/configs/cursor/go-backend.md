---
title: "Go Backend"
description: "Cursor rules for Go backend development with Gin or Echo, focusing on clean architecture."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "cursor"
useCases: ["backend"]
tags: ["go", "golang", "gin", "echo", "rest", "clean-architecture"]
pricing: "free"
configType: "cursor-rules"
includes: [".cursorrules"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: false
---

## Overview

Cursor rules for idiomatic Go backend development. Covers HTTP APIs with Gin or Echo, clean architecture layering, proper error handling, and concurrency patterns.

## The Config

```markdown
# .cursorrules — Go Backend

You are a senior Go backend engineer. Write idiomatic, production-grade Go code.

## Core Principles
- Simplicity over cleverness — Go code should be boring and obvious
- Accept interfaces, return structs
- Handle every error; never use `_` to discard errors
- Prefer standard library when it's sufficient
- No global state; pass dependencies via constructor injection

## Project Structure (Clean Architecture)
```
cmd/server/main.go        — entrypoint, wiring
internal/
  handler/                — HTTP handlers (thin, validate + delegate)
  service/                — business logic (no HTTP knowledge)
  repository/             — data access (database, cache, external APIs)
  model/                  — domain types and value objects
  middleware/             — HTTP middleware (auth, logging, recovery)
pkg/                      — exported libraries (if applicable)
```

## HTTP Framework (Gin)
- Group routes by resource: `v1.Group("/users")`
- Use middleware for cross-cutting concerns (auth, CORS, request ID)
- Bind and validate input with `ShouldBindJSON` + struct tags
- Return consistent JSON: `{ "data": ..., "error": ... }`
- Set appropriate status codes; don't default to 200

## Error Handling
- Define domain errors as sentinel values: `var ErrNotFound = errors.New("not found")`
- Wrap errors with context: `fmt.Errorf("fetching user %d: %w", id, err)`
- Map domain errors to HTTP status in the handler layer only
- Use a custom error type for errors that carry a code and message
- Never panic in library code; panics only for truly unrecoverable bugs

## Database
- Use `sqlx` or `pgx` for PostgreSQL (not raw `database/sql` unless trivial)
- Migrations with goose or golang-migrate
- Always use context-aware queries: `QueryContext(ctx, ...)`
- Transactions: pass `*sql.Tx` to repository methods, commit in service layer
- Connection pooling: configure `MaxOpenConns`, `MaxIdleConns`, `ConnMaxLifetime`

## Concurrency
- Use `errgroup` for parallel tasks with error propagation
- Always pass and respect `context.Context` for cancellation
- Prefer channels for communication, mutexes for protecting shared state
- Never start goroutines that can leak — always tie them to a context or WaitGroup

## Testing
- Table-driven tests for all public functions
- Use `testify/assert` for assertions, `testify/mock` sparingly
- Integration tests: use testcontainers-go for database tests
- Benchmark critical paths with `func Benchmark*(b *testing.B)`
- Test file naming: `*_test.go` in the same package

## Logging & Observability
- Structured logging with `slog` (standard library)
- Include request ID, user ID, and duration in all log entries
- Metrics: expose Prometheus `/metrics` endpoint
- Tracing: OpenTelemetry for distributed tracing
```

## Usage

Save as `.cursorrules` in your Go project root. Cursor will follow idiomatic Go patterns and clean architecture layering.
