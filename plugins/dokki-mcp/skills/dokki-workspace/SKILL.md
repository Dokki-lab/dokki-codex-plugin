---
name: dokki-workspace
description: "Browse Dokki workspaces, list resource trees, search content, preview resources, and organize files, folders, documents, tables, and artifacts."
argument-hint: "[action] [resource-name-or-id]"
allowed-tools: mcp__dokki__list_workspaces mcp__dokki__list_resources mcp__dokki__create_workspace mcp__dokki__create_folder mcp__dokki__move_resource mcp__dokki__update_resource mcp__dokki__delete_resource mcp__dokki__tag_resource mcp__dokki__untag_resource mcp__dokki__share_resource mcp__dokki__search_workspace mcp__dokki__grep_workspace mcp__dokki__related_entities mcp__dokki__preview_resource
---

# Dokki Workspace

Use this skill for navigation, discovery, resource organization, tags, sharing,
and broad search across documents, tables, artifacts, and files.

## Browse

Use `list_workspaces` to discover accessible workspaces, then `list_resources`
with a `workspace_id` to inspect a resource tree.

`list_resources` includes documents, tables, folders, artifacts, and files.

## Search

Use:

- `search_workspace` for semantic or hybrid content search.
- `grep_workspace` for exact strings, identifiers, URLs, and regex.
- `related_entities` for graph-style related resource discovery.
- `preview_resource` for rendered previews of documents, tables, and artifacts.

Search results include `type`, `resource_id`, `workspace_id`, and URLs when
available. Follow up with `doc_read`, `table_read`, or `artifact_read` based on
the resource type.

## Organize

Use:

- `create_workspace`
- `create_folder`
- `move_resource`
- `update_resource`
- `delete_resource`
- `tag_resource`
- `untag_resource`
- `share_resource`

Confirm before public sharing, email sharing, broad moves, or archive/delete
operations.
