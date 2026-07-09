---
name: dokki-file
description: "Upload files or inline document images to Dokki, download file resources, then manage file resources through workspace tools."
argument-hint: "<workspace-id> <file-path-or-description>"
allowed-tools: mcp__dokki__create mcp__dokki__read mcp__dokki__find mcp__dokki__edit
---

# Dokki File

Use `create {action:"file", workspace_id, args:{...}}` to add a local file to a Dokki
workspace. The tool expects file bytes encoded as base64 in `content_base64`; do not
pass a local filesystem path directly.

Use `read {action:"file", resource_id}` with a file resource ID to retrieve an existing
file. The default response is a short-lived signed download URL. Request
`args.format: "base64"` only for small files that should be returned inline to the agent.

By default, uploads create file resources. Set `inline_image: true` in `args` when the
file is an image intended for insertion into a document with
`edit {action:"doc.edit", ...}`; the tool then returns a public image URL and document
image node data.

## Workflow

1. Determine the target `workspace_id`.
2. Read the local file bytes and base64-encode them.
3. Call `create {action:"file", workspace_id, args:{name, content_base64, mime_type?,
   inline_image?, alt?}}`.
4. Use `find {action:"resources", workspace_id}` to confirm the created file resource
   when needed.
5. Use `read {action:"file", resource_id}` when a file needs to be retrieved again.

## Current Limits

There is no dedicated file-content update action yet. Existing file resources can be
listed (`find resources`), searched (`find search` / `find grep`), downloaded
(`read file`), moved, renamed, tagged, shared, or archived through the
workspace/resource actions on `edit` and `share`.
