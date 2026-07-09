# Dokki Codex Plugin

> **Dokki — agent-native collaboration OS.** Dokki is the workspace where AI agents work like
> teammates — reading, writing, reviewing, and publishing alongside people through MCP and
> real-time collaborative documents. This plugin brings that workspace into Codex.

Codex plugin and marketplace metadata for [Dokki](https://dokki.one)'s hosted MCP servers.

## Codex Plugin: Dokki MCP

The `dokki-mcp` plugin exposes Dokki's hosted MCP to Codex with OAuth. It uses Dokki's
**facade** surface (`/mcp/v2`): a small set of high-level tools instead of ~37 flat ones, so
Codex picks the right tool reliably and burns fewer tokens.

Installed server:

- `dokki`: `https://dokki.one/mcp/v2`

The `dokki` facade exposes **8 tools** (each takes an `action` + `args`) plus `preview_resource`:

- `find` — list workspaces/resources, semantic search, exact grep, knowledge-graph (with tag/type/date filters)
- `read` — read a document (view / outline / edit modes + pagination), table (with where/sort/columns/paging), artifact, or file
- `create` — workspace, folder, document, table, artifact, or file upload
- `edit` — rename/move/tag/delete resources (set an emoji **or Lucide icon**), plus document / table / artifact edits (op-arrays, markdown, anchor/section targeting)
- `share` — share with a user, or set public access
- `message` — a workspace channel for human confirmations & notifications
- `publish` — publish/unpublish resources to a public site (`dokki.one/pub/<slug>`) + custom domains
- `connect` — **connect and use 1000+ external integrations** (GitHub, Slack, Gmail, Notion, Google Sheets/Drive/Calendar, Linear, …) through Dokki: list apps, authorize via OAuth, and run their tools

Focused skills are included for the mcp router, workspace, table, artifact, file, and publish
workflows so Codex discovers the right actions instead of treating Dokki as document-only.

The facade is **self-teaching**: call a tool with no `action` to list its actions; a partial
action returns the matching subtree; missing args return a hint with an example. Dangerous
actions (`edit resource.delete`, `share public`, `publish add`, a `table.edit` column delete)
return a `confirm_token` you re-send to proceed.

During install, Codex opens Dokki's OAuth flow. Select the Personal and Org workspaces this MCP
connection may access. Reconnect OAuth if you later need to add or remove workspace access.

For local development or API-key based access, configure MCP manually instead of using the
marketplace plugin:

```json
{
  "mcpServers": {
    "dokki-local": {
      "type": "http",
      "url": "http://localhost:3000/mcp/v2"
    },
    "dokki-api-key": {
      "type": "http",
      "url": "https://dokki.one/mcp/v2",
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
