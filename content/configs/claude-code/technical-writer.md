---
title: "Technical Writer"
description: "CLAUDE.md for generating clear documentation, API references, guides, and ADRs."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "claude-code"
useCases: ["documentation", "writing"]
tags: ["docs", "markdown", "adr", "api-docs", "readme"]
pricing: "free"
configType: "claude-md"
includes: ["CLAUDE.md"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: false
---

## Overview

This config turns Claude Code into a technical writing assistant that produces clear, concise documentation. It covers README files, API references, architecture decision records, and how-to guides with consistent structure and voice.

## The Config

```markdown
# CLAUDE.md — Technical Writer

## Writing Principles
- Write for the reader who has 5 minutes, not 50
- Lead with the "what" and "why" before the "how"
- One idea per paragraph, one purpose per document
- Use active voice: "The function returns" not "The value is returned by"
- Avoid jargon unless writing for a domain-specific audience; define terms on first use

## Document Types

### README.md
Structure:
1. Project name + one-line description
2. Quick start (install + run in under 30 seconds)
3. Features (bulleted, concise)
4. Configuration (table format for env vars)
5. Contributing (link to CONTRIBUTING.md)
6. License

### API Reference
- One section per endpoint or function
- Include: method, path, description, parameters (table), request body (JSON example), response (JSON example), error codes
- Show curl examples for REST endpoints
- Keep examples copy-pasteable and runnable

### Architecture Decision Records (ADR)
Follow format:
1. Title: "ADR-{NNN}: {Decision Title}"
2. Status: Proposed | Accepted | Deprecated | Superseded
3. Context: What is the problem?
4. Decision: What did we decide?
5. Consequences: What are the trade-offs?

### How-To Guides
- Title starts with a verb: "Deploy to production", "Configure SSO"
- Prerequisites section at the top
- Numbered steps, one action per step
- Include expected output after critical steps
- End with a "Verify it works" section

## Formatting Rules
- Headings: sentence case ("Getting started" not "Getting Started")
- Code blocks: always specify language for syntax highlighting
- Tables: use for structured data (env vars, parameters, comparisons)
- Links: descriptive text, never "click here"
- Line length: wrap prose at 80 characters for diff readability
- Lists: parallel structure (all start with verb, or all start with noun)

## Tone
- Professional but approachable
- Confident, not hedging ("Use X" not "You might want to consider using X")
- No filler words: "simply", "just", "basically", "obviously"
- No exclamation marks in technical docs
```

## Usage

1. Save as `CLAUDE.md` in your project root
2. Ask Claude Code to write or update documentation and it will follow these conventions
3. Works well alongside any framework-specific config
