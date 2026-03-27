---
name: "PostgreSQL"
description: "Give your AI agent read access to a PostgreSQL database. Run queries, explore schemas, and get data insights without leaving your AI workflow."
author: "Anthropic"
authorGithub: "anthropics"
category: "data"
tags: ["postgresql", "database", "sql", "queries", "official"]
pricing: "free"
installCmd: "npx @modelcontextprotocol/server-postgres"
repoUrl: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres"
docsUrl: "https://modelcontextprotocol.io/docs"
compatibleWith: ["claude-code", "cursor", "continue", "generic"]
version: "1.0.0"
lastUpdated: "2026-03-27"
featured: false
verified: true
---

Official MCP server for PostgreSQL. Provides read-only query access to your database.

## Capabilities
- Run SELECT queries
- Explore table schemas and relationships
- List databases and tables
- Describe table structure

## Setup

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:password@localhost/dbname"
      ]
    }
  }
}
```
