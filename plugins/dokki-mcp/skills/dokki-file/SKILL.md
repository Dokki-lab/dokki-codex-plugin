---
name: dokki-file
description: "Upload files or inline document images to Dokki, download file resources, then manage file resources through workspace tools."
argument-hint: "<workspace-id> <file-path-or-description>"
allowed-tools: mcp__dokki__upload_file mcp__dokki__download_file mcp__dokki__list_resources mcp__dokki__search_workspace mcp__dokki__grep_workspace mcp__dokki__move_resource mcp__dokki__update_resource mcp__dokki__delete_resource
---

# Dokki File

Use `upload_file` to add a local file to a Dokki workspace. The tool expects file
bytes encoded as base64 or a `data:...;base64,...` URL; do not pass a local
filesystem path directly.

Use `download_file` with a file resource ID to retrieve an existing file. The
default response is a short-lived signed download URL. Request `format: "base64"`
only for small files that should be returned inline to the agent.

By default, uploads create file resources. Set `inline_image: true` when the file
is an image intended for insertion into a document with `doc_insert`; the tool
then returns a public image URL and document image node data.

## Workflow

1. Determine the target `workspace_id`.
2. Read the local file bytes and base64-encode them.
3. Call `upload_file` with `workspace_id`, `name`, `content_base64`, and optional
   `mime_type`, `parent_path`, `inline_image`, and `alt`.
4. Use `list_resources` to confirm the created file resource when needed.
5. Use `download_file` with the file resource `id` when a file needs to be
   retrieved again.

## Current Limits

There is no dedicated `file_update` MCP tool yet. Existing file resources can be
listed, searched, downloaded, moved, renamed, tagged, shared, or archived through
the workspace/resource tools.
