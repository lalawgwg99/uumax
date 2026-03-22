---
title: "DevOps & SRE Engineer"
description: "CLAUDE.md for infrastructure, CI/CD, Docker, Kubernetes, and monitoring tasks."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "claude-code"
useCases: ["devops"]
tags: ["docker", "kubernetes", "ci-cd", "terraform", "monitoring"]
pricing: "free"
configType: "claude-md"
includes: ["CLAUDE.md"]
version: "1.0.0"
lastUpdated: "2026-03-20"
featured: false
---

## Overview

Configure Claude Code for infrastructure and DevOps work. Covers Docker, Kubernetes, Terraform, CI/CD pipelines, and monitoring setup.

## The Config

```markdown
# CLAUDE.md — DevOps & SRE

## Tech Stack
- Containers: Docker, Docker Compose
- Orchestration: Kubernetes (kubectl, Helm)
- IaC: Terraform (HCL)
- CI/CD: GitHub Actions
- Monitoring: Prometheus, Grafana, AlertManager
- Cloud: AWS (primary), GCP (secondary)

## Safety Rules (CRITICAL)
- NEVER run destructive commands without explicit confirmation
- NEVER hardcode secrets — always use environment variables or secret managers
- NEVER apply Terraform changes without showing the plan first
- NEVER delete Kubernetes namespaces without listing resources first
- Always use `--dry-run` flags when available
- Always show diffs before applying infrastructure changes

## Conventions
- Terraform: one module per service, remote state in S3
- Docker: multi-stage builds, non-root user, specific version tags (no :latest)
- K8s: resource limits on all containers, liveness + readiness probes required
- GitHub Actions: pin action versions by SHA, not tags
- Secrets: AWS Secrets Manager or Kubernetes Secrets (encrypted at rest)

## Incident Response
When troubleshooting:
1. Check current state first (logs, metrics, pod status)
2. Identify blast radius before any change
3. Prefer rollback over forward-fix when possible
4. Document what happened and what was done

## Output Format
- For shell commands: show the command, explain what it does, ask before running
- For config files: show full file with comments explaining key decisions
- For troubleshooting: structured diagnosis → hypothesis → verification → fix
```

## Usage

Best for teams managing their own infrastructure. Place in your infra repo's root.
