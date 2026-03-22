---
title: "Code Review Checklist"
description: "Universal code review rules and checklist for any AI coding agent to apply during reviews."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "generic"
useCases: ["code-review", "qa"]
tags: ["code-review", "quality", "security", "best-practices", "checklist"]
pricing: "free"
configType: "bundle"
includes: ["CLAUDE.md", ".cursorrules", ".windsurfrules"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: false
---

## Overview

A universal code review checklist for AI coding agents. Use this config to get consistent, thorough code reviews covering correctness, security, performance, and maintainability regardless of language or framework.

## The Config

```markdown
# Code Review Checklist

When reviewing code, evaluate every change against the following categories. Flag issues with severity: 🔴 blocker, 🟡 suggestion, 🟢 nit.

## 1. Correctness
- Does the code do what the PR description says it does?
- Are edge cases handled? (null, empty, boundary values, concurrent access)
- Are error paths handled gracefully? (no swallowed errors, meaningful messages)
- Does the logic match the business requirements?
- Are there any off-by-one errors in loops or slicing?

## 2. Security
- Is user input validated and sanitized before use?
- Are SQL queries parameterized? (no string concatenation)
- Are secrets kept out of code? (no hardcoded API keys, passwords, tokens)
- Are auth checks in place for protected endpoints?
- Is sensitive data excluded from logs?
- Are dependencies from trusted sources with no known critical CVEs?

## 3. Performance
- Are there any N+1 query patterns? (loops with database calls)
- Are expensive operations cached where appropriate?
- Are large datasets paginated, not loaded entirely into memory?
- Are database queries using indexes? (check for missing WHERE clause indexes)
- Are there any unnecessary re-renders in frontend components?

## 4. Readability & Maintainability
- Are function and variable names descriptive and consistent?
- Are functions small and single-purpose? (under 40 lines guideline)
- Is complex logic explained with comments on the WHY, not the WHAT?
- Are magic numbers and strings replaced with named constants?
- Is code duplication minimized? (rule of three — extract on the third occurrence)

## 5. Testing
- Are new code paths covered by tests?
- Do tests cover the happy path AND at least one error case?
- Are tests independent? (no shared mutable state between tests)
- Are test names descriptive? (`it("returns 404 when user not found")`)
- Are flaky patterns avoided? (no sleep, no order dependency, no real network)

## 6. API & Interface Design
- Are function signatures clear? (no boolean traps, reasonable parameter count)
- Are return types explicit and documented?
- Are breaking changes to public APIs flagged and versioned?
- Are HTTP status codes correct for each response?
- Is backward compatibility maintained?

## 7. Infrastructure & Config
- Are environment-specific values externalized? (not hardcoded)
- Are new dependencies justified? (not adding a library for one function)
- Are database migrations reversible?
- Are CI/CD pipelines updated if build steps changed?
- Are feature flags used for risky or incomplete features?

## Review Response Format
For each file, provide:
1. File path
2. Issues found (with line numbers and severity)
3. Suggested fix (code snippet when applicable)

End with a summary:
- ✅ Approve — no blockers found
- 🔄 Request changes — blockers must be addressed
- 💬 Comment — suggestions only, approve at author's discretion
```

## Usage

Append this config to your agent's instructions to get structured code reviews. Works with any language, framework, or AI coding tool.
