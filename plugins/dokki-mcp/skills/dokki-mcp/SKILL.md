---
name: dokki-mcp
description: Use when connecting Codex to Dokki through the dokki-mcp plugin, including OAuth workspace selection and the documents, publish, and memory MCP servers.
---

# Dokki MCP

This plugin connects Codex directly to Dokki's hosted Streamable HTTP MCP endpoints.

## Authentication

OAuth is the default. During plugin installation, Codex opens Dokki's OAuth flow and
lets the user choose the Personal and Org workspaces the MCP connection may access.

Connected OAuth grants are scoped by Dokki's consent screen. If a workspace is missing,
ask the user to reconnect OAuth and select that Personal/Org workspace, or use an
Org-scoped Dokki API key in a manually configured MCP server.

## MCP Servers

The plugin declares three hosted servers:

- `dokki`: documents, tables, artifacts, resources, search, related entities, files,
  folders, tags, sharing, and workspace channel tools.
- `dokki-publish`: publishing and custom-domain tools.
- `dokki-memory`: Mem0-style durable workspace memory tools.

All servers use `https://dokki.one` and Dokki OAuth discovery.

## Local Dokki

For local development, configure MCP manually instead of using this marketplace plugin:

```json
{
  "mcpServers": {
    "dokki-local": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp"
    }
  }
}
```

## Notes

Workspace-scoped connector tokens still work for manual MCP configs, but this plugin is
OAuth-first so Codex can show authentication during install and preserve Dokki's
Personal/Org workspace access controls.
