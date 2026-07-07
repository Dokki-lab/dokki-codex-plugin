---
name: dokki-artifact
description: "Create and edit Dokki artifacts: JSX or HTML widgets, charts, diagrams, dashboards, and interactive visual components."
argument-hint: "<description-or-id> [instruction]"
allowed-tools: mcp__dokki__create_artifact mcp__dokki__artifact_read mcp__dokki__artifact_update mcp__dokki__artifact_patch mcp__dokki__preview_resource mcp__dokki__search_workspace
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

Call `create_artifact` with:

- `workspace_id`
- `name`
- optional `parent_id`
- `source`

Prefer self-contained source. Inline any data that came from a table or document
unless the user asks for a specific integration.

## Edit

Always call `artifact_read` before editing an existing artifact.

Use:

- `artifact_update` for full rewrites or large structural changes.
- `artifact_patch` for small exact find-and-replace changes.
- `preview_resource` when an inline rendered preview is useful.

For `artifact_patch`, `old_string` must match exactly, including whitespace.

## Follow-Ups

- Read table data first with `dokki-table` when building charts from a table.
- Move, rename, tag, or share the artifact with `dokki-workspace`.
