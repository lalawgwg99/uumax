---
title: "Multi-Agent Gateway"
description: "OpenClaw configuration for a 4-agent architecture: frontdesk, architect, engineer, and reviewer."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "openclaw"
useCases: ["fullstack", "devops"]
tags: ["multi-agent", "gateway", "automation", "workflow"]
pricing: "premium"
price: 19
purchaseUrl: "#"
configType: "bundle"
includes: ["openclaw.json", "agents/", "hooks/"]
version: "1.2.0"
lastUpdated: "2026-03-22"
featured: true
changelog:
  - version: "1.2.0"
    date: "2026-03-22"
    changes: "Added reviewer agent, improved model routing"
  - version: "1.1.0"
    date: "2026-03-15"
    changes: "Added architect agent with tools.profile support"
  - version: "1.0.0"
    date: "2026-03-01"
    changes: "Initial release with frontdesk + engineer"
---

## Overview

A battle-tested 4-agent architecture for OpenClaw that handles complex software projects. Each agent has a specialized role:

- **Frontdesk**: Triages requests, gathers context, routes to the right agent
- **Architect**: Designs system architecture, creates technical specs
- **Engineer**: Implements code based on specs, follows coding standards
- **Reviewer**: Reviews code quality, security, and adherence to specs

## What's Included

- Complete `openclaw.json` configuration
- Agent personality and system prompts for all 4 roles
- Lifecycle hooks (before_reset, agent_end, error recovery)
- Memory integration setup
- Routing rules and escalation patterns

## Architecture

```
User Request
    ↓
[Frontdesk] → Triage & Context
    ↓
[Architect] → Design & Spec
    ↓
[Engineer] → Implementation
    ↓
[Reviewer] → Quality Gate
    ↓
Delivery
```

## Key Features

- **Automatic routing**: Frontdesk analyzes the request and routes to the optimal agent
- **Context preservation**: Each agent receives relevant context from previous stages
- **Quality gate**: No code ships without reviewer approval
- **Error recovery**: Hooks handle agent failures gracefully
- **Memory integration**: Compatible with mem9 for persistent cross-session memory

## Preview

```json
{
  "agents": {
    "frontdesk": {
      "model": "claude-sonnet-4-6",
      "role": "Request triage and context gathering",
      "triggers": ["new_conversation", "unclear_request"]
    },
    "architect": {
      "model": "claude-opus-4-6",
      "role": "System design and technical specification",
      "triggers": ["new_feature", "architecture_change"]
    },
    "engineer": {
      "model": "claude-sonnet-4-6",
      "role": "Code implementation",
      "triggers": ["spec_approved", "bug_fix"]
    },
    "reviewer": {
      "model": "claude-opus-4-6",
      "role": "Code review and quality assurance",
      "triggers": ["code_complete"]
    }
  }
}
```

*Full configuration available after purchase.*
