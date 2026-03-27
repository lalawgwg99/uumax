---
name: "Brave Search"
description: "Real-time web search for your AI agent via the Brave Search API. Search the web, get news, and retrieve up-to-date information without leaving your workflow."
author: "Anthropic"
authorGithub: "anthropics"
category: "search"
tags: ["search", "web", "news", "real-time", "official"]
pricing: "free"
installCmd: "npx @modelcontextprotocol/server-brave-search"
repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search"
docsUrl: "https://brave.com/search/api/"
installUrl: "https://api.search.brave.com/register"
compatibleWith: ["claude-code", "cursor", "continue", "generic"]
version: "1.0.0"
lastUpdated: "2026-03-27"
featured: true
verified: true
---

Official MCP server for web search via Brave Search API. Requires a free Brave Search API key.

## Capabilities
- Web search with ranked results
- News search
- Summarized results with source links

## Setup

1. Get a free API key at brave.com/search/api
2. Add to your config:

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": { "BRAVE_API_KEY": "your-key-here" }
    }
  }
}
```
