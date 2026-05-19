---
name: dokki-mcp
description: Use when connecting Codex to a Dokki workspace through the dokki-mcp plugin, including configuring endpoint URL, connector token, and selecting the documents, publish, or memory MCP flavor.
---

# Dokki MCP

This plugin exposes Dokki's Streamable HTTP MCP endpoints through a local stdio bridge.

## Required Environment

Set one token variable before using the plugin:

- `DOKKI_MCP_TOKEN`: preferred. Use a Dokki connector token (`dkc_...`) from workspace settings, or a personal API key (`dk_...`).
- `DOKKI_API_KEY`: fallback alias for a personal API key.

Choose the endpoint in one of two ways:

- `DOKKI_MCP_URL`: full MCP endpoint URL, for example `http://localhost:3000/api/mcp`.
- Or `DOKKI_MCP_ORIGIN` plus `DOKKI_MCP_FLAVOR`.

Defaults:

- `DOKKI_MCP_ORIGIN=https://dokki.one`
- `DOKKI_MCP_FLAVOR=documents`

Supported flavors:

- `documents`: `/api/mcp`
- `publish`: `/api/publish-mcp`
- `memory`: `/api/mem-mcp`

## Local Dokki

For local development, override the origin and start Dokki first:

```bash
export DOKKI_MCP_ORIGIN=http://localhost:3000
npm run dev
```

Then configure the plugin with a Dokki connector token or personal API key.

## Notes

Workspace-scoped connector tokens are preferred because Dokki locks tool access to that workspace. The documents flavor exposes workspace resource, document, table, artifact, search, tagging, folder, and sharing tools. The publish flavor exposes site publishing and custom-domain tools. The memory flavor exposes only `memory_*` tools.
