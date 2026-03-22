---
title: "Rust Systems"
description: "Cursor rules for Rust systems programming with a focus on safety, performance, and idiomatic patterns."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "cursor"
useCases: ["backend", "systems"]
tags: ["rust", "systems", "tokio", "async", "cli", "performance"]
pricing: "free"
configType: "cursor-rules"
includes: [".cursorrules"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: true
---

## Overview

Cursor rules for Rust systems programming covering CLI tools, network services, and performance-critical applications. Enforces ownership best practices, proper error handling with `thiserror`/`anyhow`, and idiomatic async patterns with Tokio.

## The Config

```markdown
# .cursorrules — Rust Systems

You are a senior Rust engineer. Write safe, performant, idiomatic Rust code.

## Core Principles
- Leverage the type system to make invalid states unrepresentable
- Prefer zero-cost abstractions; avoid unnecessary allocations
- No `unsafe` unless required and thoroughly documented with a SAFETY comment
- Clippy clean: code must pass `cargo clippy -- -D warnings`
- All public items must have doc comments (`///`)

## Error Handling
- Library code: define error enums with `thiserror`
- Application code: use `anyhow::Result` for convenience
- Never use `.unwrap()` in production code; use `.expect("reason")` only for invariants
- Use `?` operator for error propagation
- Map errors at boundaries: `map_err` when crossing module lines

## Ownership & Borrowing
- Prefer borrowing (`&T`) over ownership when the function doesn't need to store the data
- Use `Cow<'_, str>` when a function may or may not need to allocate
- Clone consciously — every `.clone()` should have a reason
- Prefer `&str` over `String` in function parameters
- Use `Arc` for shared ownership across threads; `Rc` only in single-threaded contexts

## Async (Tokio)
- Use `tokio::main` for the entry point, `tokio::test` for async tests
- Prefer `tokio::spawn` for concurrent tasks, `tokio::select!` for racing futures
- Never block the async runtime: use `tokio::task::spawn_blocking` for CPU-heavy work
- Channels: `tokio::sync::mpsc` for multi-producer, `oneshot` for request-response
- Timeouts: always wrap external calls with `tokio::time::timeout`

## Project Structure
```
src/
  main.rs / lib.rs        — entrypoint
  config.rs               — configuration loading (envy, config crate)
  error.rs                — error types
  cli.rs                  — clap argument parsing (for CLI tools)
  server.rs               — HTTP/gRPC server setup
  handlers/               — request handlers
  services/               — business logic
  models/                 — domain types
  db/                     — database access (sqlx)
```

## Dependencies (Preferred Crates)
- HTTP server: axum
- Serialization: serde + serde_json
- CLI: clap (derive API)
- Database: sqlx (compile-time checked queries)
- Logging: tracing + tracing-subscriber
- Testing: built-in + proptest for property-based tests

## Testing
- Unit tests in `#[cfg(test)] mod tests` within each file
- Integration tests in `tests/` directory
- Use `#[tokio::test]` for async tests
- Property-based tests with `proptest` for parsers and serializers
- Benchmark with `criterion` for performance-critical functions

## Performance Guidelines
- Profile before optimizing (cargo-flamegraph)
- Prefer iterators over indexed loops; they optimize better
- Use `SmallVec` or `ArrayVec` for small, known-size collections
- Avoid `String` formatting in hot paths; use `write!` to a buffer
- Consider `#[inline]` only for small, frequently-called functions across crate boundaries
```

## Usage

Save as `.cursorrules` in your Rust project root. Cursor will generate idiomatic Rust with proper error handling and performance patterns.
