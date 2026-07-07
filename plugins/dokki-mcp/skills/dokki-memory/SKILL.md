---
name: dokki-memory
description: "Add, search, list, and delete durable Dokki workspace memories through the dokki-memory MCP server."
argument-hint: "<workspace-id> [memory-action]"
---

# Dokki Memory

Use the `dokki-memory` MCP server for durable facts that should survive across
agent sessions.

Tools:

- `memory_add`
- `memory_search`
- `memory_list`
- `memory_delete`

Use `memory_search` before answering when prior workspace context may matter.
Use `memory_add` for stable facts, preferences, rules, and recurring project
context. Do not store transient chat or one-off task details.
