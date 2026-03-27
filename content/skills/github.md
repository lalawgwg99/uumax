---
name: "GitHub"
description: "Full GitHub integration for your AI agent. Search repos, read code, manage issues and PRs, create branches, and commit changes — all from your AI workflow."
author: "Anthropic"
authorGithub: "anthropics"
category: "code"
tags: ["github", "git", "issues", "pull-requests", "code-review", "official"]
pricing: "free"
installCmd: "npx @modelcontextprotocol/server-github"
repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/github"
docsUrl: "https://docs.github.com/en/rest"
installUrl: "https://github.com/settings/tokens"
compatibleWith: ["claude-code", "cursor", "continue", "aider", "generic"]
version: "1.0.0"
lastUpdated: "2026-03-27"
featured: true
verified: true
---

Official MCP server for GitHub. Requires a GitHub Personal Access Token.

## Capabilities
- Search repositories and code
- Read files and directory trees
- Create and update files
- Manage issues (create, comment, close)
- Open and review pull requests
- Create branches and commits

## Setup

1. Create a GitHub token at github.com/settings/tokens
2. Add to your config:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token" }
    }
  }
}
```
