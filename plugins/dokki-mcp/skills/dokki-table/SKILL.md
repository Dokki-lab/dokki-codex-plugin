---
name: dokki-table
description: "Create and edit Dokki tables with typed columns, rows, and cell updates. Use for structured data, trackers, lists, inventories, CRM-style tables, and table-backed datasets."
argument-hint: "<action> [table-name-or-id] [details]"
allowed-tools: mcp__dokki__create mcp__dokki__read mcp__dokki__edit mcp__dokki__find
---

# Dokki Table

Use a Dokki table for repeated records with shared fields: trackers, inventories,
directories, CRM lists, research matrices, and datasets that should support
sort/filter/cell-level editing.

Use a document instead for narrative prose, meeting notes, PRDs, and simple
Markdown tables. Use an artifact when the user wants a visual or interactive
presentation of data.

## Create

Call `create {action:"table", workspace_id, parent_id?, args:{...}}` with:

- `name`
- optional `description`
- optional `columns`: `{ headerName, type }`
- optional `rows`: values keyed by column header name on initial create only

Column types: `text`, `number`, `boolean`, `date`, `select`, `multiSelect`,
`url`, `email`.

## Edit

Always call `read {action:"table", resource_id}` before editing (default 20 rows;
pass `args.where` / `columns` / `sort` / `page` to scope). The compact format returns
row IDs and column IDs, including short IDs usable in update calls.

Prefer the batched op form:
`edit {action:"table.edit", resource_id, args:{ops:[...]}}` where each op is one of:

- `{op:"rows.add", rows}` for new rows.
- `{op:"rows.delete", rowIds}` for removing rows.
- `{op:"columns.add", columns}` for new fields.
- `{op:"columns.delete", columnIds}` for removing fields and their values — confirm.
- `{op:"columns.update", columns}` for renaming or changing column metadata.
- `{op:"cells.update", updates}` for changing values in existing rows.

`columnId` accepts a header name or an id. Batch related changes into one
`table.edit` call. A `columns.delete` op returns a `confirm_token` to re-send.
(Singular actions `table.rows.add`, `table.cells.update`, etc. still exist.)

## Follow-Ups

- Create a visualization from table data with `dokki-artifact`.
- Share or move the table with `dokki-workspace`.
- Publish the table with `dokki-publish`.
