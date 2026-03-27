---
name: "Filesystem"
description: "Read and write files on your local filesystem. Give your AI agent controlled access to create, edit, move, and delete files within specified directories."
author: "Anthropic"
authorGithub: "anthropics"
category: "productivity"
tags: ["files", "filesystem", "official", "local"]
pricing: "free"
installCmd: "npx @modelcontextprotocol/server-filesystem /path/to/allowed/dir"
repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem"
docsUrl: "https://modelcontextprotocol.io/docs"
compatibleWith: ["claude-code", "cursor", "continue", "aider", "generic"]
version: "1.0.0"
lastUpdated: "2026-03-27"
featured: true
verified: true
---

Official MCP server for filesystem access. Lets your AI agent read, write, create, and manage files within directories you specify.

## Capabilities
- Read file contents and directory listings
- Write and create files
- Move and delete files
- Search file contents

## Setup

Add to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/your/project/path"]
    }
  }
}
```
