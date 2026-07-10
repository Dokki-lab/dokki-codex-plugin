---
name: dokki-workspace
description: "Browse Dokki workspaces, list resource trees, search content, preview resources, and organize files, folders, documents, tables, and artifacts."
argument-hint: "[action] [resource-name-or-id]"
allowed-tools: mcp__dokki__find mcp__dokki__read mcp__dokki__create mcp__dokki__edit mcp__dokki__share mcp__dokki__message mcp__dokki__connect mcp__dokki__preview_resource
---

# Dokki Workspace

Use this skill for navigation, discovery, resource organization, tags, sharing,
broad search, and external integrations across documents, tables, artifacts, and
files.

## Browse

Use `find {action:"workspaces"}` to discover accessible workspaces, then
`find {action:"resources", workspace_id}` to inspect a resource tree
(pass `args.filter {tags,type,dates}` for a flat filtered list).

`find resources` includes documents, tables, folders, artifacts, and files.

## Search

Use:

- `find {action:"search", workspace_id?, args:{query, limit?, filter?}}` for
  semantic or hybrid content search.
- `find {action:"grep", workspace_id?, args:{pattern, regex?, kinds?, filter?}}` for
  exact strings, identifiers, URLs, and regex.
- `find {action:"related", args:{query}}` for graph-style related resource discovery.
- `preview_resource {resource_id}` for rendered previews of documents, tables, and
  artifacts.

Search results include `type`, `resource_id`, `workspace_id`, and URLs when
available. Follow up with `read {action:"doc"|"table"|"artifact", resource_id}`
based on the resource type.

## Organize

Use:

- `create {action:"workspace", args:{name, org_id?}}`
- `create {action:"folder", workspace_id, parent_id?, args:{name}}`
- `edit {action:"resource.move", resource_id, insert_after_id?, args:{new_parent_path?}}`
- `edit {action:"resource.update", resource_id, args:{name?, icon?, metadata?}}` — `icon` is an
  emoji OR a Lucide icon `lucide:<kebab-name>` (e.g. `lucide:rocket`), on ANY resource
  type. `metadata` is a structured JSON object stored on the resource (e.g.
  `{kind:"api_endpoint", http_method:"GET", path:"/api/v1/credits"}`); it REPLACES the
  metadata object wholesale ({} clears it). Metadata is a property of the resource, so
  every `create` action accepts it too — `create {action:"doc"|"table"|"artifact"|"folder"|"file", …, args:{metadata}}`.
- `edit {action:"resource.delete", resource_id}` — confirm.
- `edit {action:"resource.tag", resource_id, args:{tag_names}}`
- `edit {action:"resource.untag", resource_id, args:{tag_names}}`
- `share {action:"user", resource_id, args:{email, role?}}`
- `share {action:"public", resource_id, args:{public_access:"view"|"comment"|"edit"|"none"}}` — confirm.

Confirm before public sharing, email sharing, broad moves, or archive/delete
operations. Dangerous actions return a `confirm_token` to re-send.

## Coordinate (workspace channel)

Use the workspace channel to ask a human to confirm something or to notify the team —
useful before a destructive or externally-visible action:

- `message {action:"members", workspace_id}` — list channel members (to address a person).
- `message {action:"send", workspace_id, args:{content, require_response?}}` — post a
  message; set `require_response:true` when you need an approval or answer.
- `message {action:"read", workspace_id, args:{limit?}}` — read recent replies before proceeding.

Wait for an explicit reply before continuing on anything destructive or visible.

## Connect external integrations

Dokki's MCP is also a gateway to 1000+ external integrations (GitHub, Slack, Gmail,
Notion, Google Sheets/Drive/Calendar, Linear, …), scoped to the user's own connected
accounts:

- `connect {action:"apps", args:{query?}}` — list/search available integrations; each
  result's `slug` is what you pass as `toolkit`.
- `connect {action:"list"}` — connected accounts + status.
- `connect {action:"authorize", args:{toolkit:"github"}}` — returns an OAuth
  `authorize_url`; poll `connect list` until active.
- `connect {action:"disconnect", args:{connection_id}}` — remove a connected account.
- `connect {action:"tools", args:{toolkit?}}` — list callable tools.
- `connect {action:"call", args:{tool, args}}` — run one of those tools.
