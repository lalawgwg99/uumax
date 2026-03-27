---
title: "DevOps Engineer"
description: "GitHub Copilot instructions for DevOps and platform engineering. Covers Docker, Kubernetes, Terraform, CI/CD, and observability best practices."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "copilot"
useCases: ["devops", "infrastructure", "backend"]
tags: ["docker", "kubernetes", "terraform", "ci-cd", "observability", "bash"]
pricing: "free"
configType: "copilot-instructions"
includes: ["copilot-instructions.md"]
version: "1.0.0"
lastUpdated: "2026-03-27"
featured: false
---

## Overview

This config turns GitHub Copilot into a senior platform engineer. It enforces infrastructure-as-code practices, secure defaults, and production-grade observability patterns across all your DevOps tooling.

## The Config

```markdown
# Copilot Instructions — DevOps / Platform Engineering

## Stack
- Containers: Docker, Docker Compose
- Orchestration: Kubernetes (kubectl, Helm)
- IaC: Terraform (HCL), occasionally Pulumi
- CI/CD: GitHub Actions
- Observability: Prometheus, Grafana, OpenTelemetry
- Scripting: Bash, Python 3.11+
- Cloud: AWS (primary), GCP (secondary)

## Infrastructure as Code
- All infrastructure must be in version-controlled IaC — no manual console changes
- Terraform: use modules for reusable components, remote state in S3 + DynamoDB lock
- Tag all cloud resources: `env`, `team`, `service`, `managed-by`
- Never hardcode region, account ID, or ARNs — use variables and data sources
- Run `terraform plan` output must be reviewed in PR before `apply`

## Docker & Containers
- Always pin image versions — never use `latest` in production
- Multi-stage builds to minimize final image size
- Run containers as non-root user
- Use `.dockerignore` to exclude node_modules, .git, secrets
- Health checks required on all long-running services

## Kubernetes
- Set resource `requests` and `limits` on all containers
- Use `readinessProbe` and `livenessProbe` on all deployments
- Never store secrets in ConfigMaps — use Kubernetes Secrets or external secret managers
- Namespace all workloads; never deploy directly to `default`
- Use `RollingUpdate` strategy with `maxUnavailable: 0` for zero-downtime deploys

## CI/CD (GitHub Actions)
- Pin Actions versions by SHA, not just tag
- Never print secrets to logs — use `::add-mask::`
- Separate jobs for lint, test, build, deploy
- Require passing tests before any deploy step
- Use environments with required reviewers for production deploys

## Security
- Least-privilege IAM: grant only what the service actually needs
- Rotate secrets on a schedule; never commit secrets to git
- Enable audit logging on all cloud accounts
- Scan container images for CVEs before pushing to registry
- mTLS between services in production

## Observability
- Every service must emit: latency (p50/p95/p99), error rate, throughput
- Use structured logging (JSON) — no unstructured `console.log` in production
- Add OpenTelemetry traces to all inter-service calls
- Define SLOs before deploying a new service
- Runbooks must exist for every PagerDuty alert

## Bash Scripting
- Always start with `set -euo pipefail`
- Quote all variable expansions: `"${VAR}"`
- Validate required env vars at script start
- Prefer functions over repeated code blocks
```

## Usage

1. Copy the config above
2. Save as `.github/copilot-instructions.md` in your repo
3. Copilot will apply these conventions to all infrastructure, CI/CD, and scripting suggestions

## What You Get

- Secure-by-default infrastructure patterns
- Production-grade Kubernetes and Docker practices
- CI/CD pipelines that won't leak secrets
- Observability requirements built in from day one
- Consistent Terraform patterns across the team
