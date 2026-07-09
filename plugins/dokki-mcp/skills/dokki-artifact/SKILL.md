---
name: dokki-artifact
description: "Create and edit Dokki artifacts: JSX or HTML widgets, charts, diagrams, dashboards, and interactive visual components."
argument-hint: "<description-or-id> [instruction]"
allowed-tools: mcp__dokki__create mcp__dokki__read mcp__dokki__edit mcp__dokki__preview_resource mcp__dokki__find
---

# Dokki Artifact

Use an artifact for custom visual or interactive output: charts, dashboards,
diagrams, widgets, calculators, timelines, and other layouts that need more than
a document can express.

Artifacts can be complete HTML documents or JSX React components. JSX must
default-export a React component.

Available JSX libraries include React 18, Framer Motion, Lucide React, Recharts,
and Mermaid. Style with Tailwind CSS utilities.

## Create

Call `create {action:"artifact", workspace_id, parent_id?, args:{...}}` with:

- `name`
- `source`

Prefer self-contained source. Inline any data that came from a table or document
unless the user asks for a specific integration.

## Edit

Always call `read {action:"artifact", resource_id}` before editing an existing
artifact.

Use:

- `edit {action:"artifact.update", resource_id, args:{source}}` for full rewrites or
  large structural changes.
- `edit {action:"artifact.patch", resource_id, args:{old_string, new_string}}` for
  small exact find-and-replace changes.
- `preview_resource {resource_id}` when an inline rendered preview is useful.

For `artifact.patch`, `old_string` must match exactly, including whitespace.

## Follow-Ups

- Read table data first with `dokki-table` when building charts from a table.
- Move, rename, tag, or share the artifact with `dokki-workspace`.
- Publish the artifact with `dokki-publish`.
