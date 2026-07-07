---
name: dokki-mcp
description: Use when connecting Codex to Dokki through the dokki-mcp plugin, including OAuth workspace selection and the documents, tables, artifacts, file upload/download, publish, and memory MCP servers.
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

## Tool Families

The main `dokki` MCP server is not document-only. It includes:

- Workspace discovery and organization: `list_workspaces`, `list_resources`,
  `create_workspace`, `create_folder`, `move_resource`, `update_resource`,
  `delete_resource`, `tag_resource`, `untag_resource`, `share_resource`.
- Search and inspection: `search_workspace`, `grep_workspace`, `related_entities`,
  `preview_resource`.
- Documents: `create_document`, `doc_read`, `doc_insert`, `doc_replace`,
  `doc_delete`, `doc_rewrite`.
- Tables: `create_table`, `table_read`, `table_add_rows`, `table_delete_rows`,
  `table_add_columns`, `table_delete_columns`, `table_update_columns`,
  `table_update_cells`.
- Artifacts: `create_artifact`, `artifact_read`, `artifact_update`,
  `artifact_patch`.
- Files: `upload_file` creates file resources or inline document image assets;
  `download_file` returns a short-lived signed download URL by default, or inline
  base64 bytes for small files. Existing file resources are discoverable through
  `list_resources`, searchable through `search_workspace` / `grep_workspace`,
  and manageable through resource tools. There is currently no dedicated
  `file_update` tool.
- Workspace channel: `list_channel_members`, `read_channel`,
  `send_channel_message`.

Use the narrower skills when the task is clearly about one surface:

- `dokki-workspace` for browsing, resource management, tags, sharing, and search.
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
      "url": "http://localhost:3000/api/mcp"
    }
  }
}
```

## Notes

Workspace-scoped connector tokens still work for manual MCP configs, but this plugin is
OAuth-first so Codex can show authentication during install and preserve Dokki's
Personal/Org workspace access controls.
