---
name: dokki-mcp
description: Use when connecting Codex to Dokki through the dokki-mcp plugin, including OAuth workspace selection and the documents, tables, artifacts, file upload/download, publish, external integrations, and memory MCP servers.
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

The plugin declares two hosted servers:

- `dokki`: one server covering documents, tables, artifacts, files, search, related
  entities, folders, tags, sharing, workspace channel, publishing, custom domains, and
  external integrations. (The old separate `dokki-publish` server is folded into the
  `publish` facade.)
- `dokki-memory`: Mem0-style durable workspace memory tools.

Both use `https://dokki.one` and Dokki OAuth discovery.

## Facades

The `dokki` server exposes **8 facade tools + `preview_resource`**. A call is
`<facade>` with `{ action: "<action>", <top-level ids>, args: { <payload> } }`.
Top-level ids: `workspace_id`, `resource_id`, `parent_id`, `insert_after_id`, `site_id`.
Everything else goes in `args`.

- `find` — discovery & search: `workspaces`, `resources`, `search`, `grep`, `related`.
- `read` — read a resource: `doc`, `table`, `artifact`, `file`.
- `create` — new resources: `doc`, `table`, `artifact`, `folder`, `workspace`, `file`.
- `edit` — mutate: `resource.update` / `.move` / `.tag` / `.untag` / `.delete`,
  `doc.edit` / `doc.rewrite`, `table.edit`, `artifact.update` / `.patch`.
- `share` — `user` (email), `public`.
- `message` — workspace channel: `members`, `send`, `read`.
- `publish` — sites & domains: `site`, `site.create`, `site.update`, `resources`,
  `add`, `remove`, `domain.set` / `.remove` / `.status`.
- `connect` — external integrations relay: `apps`, `list`, `authorize`, `disconnect`,
  `tools`, `call`.
- `preview_resource` — standalone rendered preview `{ resource_id }`.

### Self-teaching conventions

- Call a facade with **no `action`** → it lists its actions. A **partial action**
  (e.g. `table.columns`) returns that subtree. Unknown action → `invalid_action` with
  nearest matches. Name the *action*; let the facade teach the args.
- Missing/invalid args → a `missing_args` hint with the exact keys and an example.
- **Dangerous actions** (`edit resource.delete`, `edit table.edit` with a
  `columns.delete` op, `share public`, `publish add`) return `requires_confirmation`
  plus a `confirm_token`. Re-call the SAME action + args WITH `confirm_token` to execute.

Use the narrower skills when the task is clearly about one surface:

- `dokki-workspace` for browsing, resource management, tags, sharing, search, and
  external integrations (`connect`).
- `dokki-table` for structured data, rows, columns, and cells.
- `dokki-artifact` for JSX/HTML artifacts, charts, diagrams, and widgets.
- `dokki-file` for uploading files, downloading files, or creating inline images.
- `dokki-publish` for published sites and custom domains.
- `dokki-memory` for durable workspace memory.

## Local Dokki

For local development, configure MCP manually instead of using this marketplace plugin:

```json
{
  "mcpServers": {
    "dokki-local": {
      "type": "http",
      "url": "http://localhost:3000/mcp/v2"
    }
  }
}
```

## Notes

Workspace-scoped connector tokens still work for manual MCP configs, but this plugin is
OAuth-first so Codex can show authentication during install and preserve Dokki's
Personal/Org workspace access controls.
