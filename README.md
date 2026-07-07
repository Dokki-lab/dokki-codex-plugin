# Dokki Codex Plugin

Codex plugin and marketplace metadata for Dokki's hosted MCP servers.

## Codex Plugin: Dokki MCP

The `dokki-mcp` plugin exposes Dokki's hosted MCP endpoints to Codex with OAuth.

Installed servers:

- `dokki`: `https://dokki.one/api/mcp`
- `dokki-publish`: `https://dokki.one/api/publish-mcp`
- `dokki-memory`: `https://dokki.one/api/mem-mcp`

During install, Codex opens Dokki's OAuth flow. Select the Personal and Org workspaces
this MCP connection may access. Reconnect OAuth if you later need to add or remove
workspace access.

For local development or API-key based access, configure MCP manually instead of using
the marketplace plugin:

```json
{
  "mcpServers": {
    "dokki-local": {
      "type": "http",
      "url": "http://localhost:3000/api/mcp"
    },
    "dokki-api-key": {
      "type": "http",
      "url": "https://dokki.one/api/mcp",
      "headers": {
        "Authorization": "Bearer dk_..."
      }
    }
  }
}
```

## Development

Install dependencies:

```bash
npm install
```

Validate the plugin metadata:

```bash
npm run check
```

The Codex marketplace entry lives at `.agents/plugins/marketplace.json`; the plugin itself lives under `plugins/dokki-mcp`.

## Codex Marketplace Import

This repository is structured as a repo-local Codex marketplace:

```text
.agents/plugins/marketplace.json
plugins/dokki-mcp/.codex-plugin/plugin.json
```

Marketplace entry:

```json
{
  "name": "dokki-mcp",
  "source": {
    "source": "local",
    "path": "./plugins/dokki-mcp"
  },
  "policy": {
    "installation": "AVAILABLE",
    "authentication": "ON_INSTALL"
  },
  "category": "Productivity"
}
```
