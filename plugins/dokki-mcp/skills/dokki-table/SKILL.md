---
name: dokki-table
description: "Create and edit Dokki tables with typed columns, rows, and cell updates. Use for structured data, trackers, lists, inventories, CRM-style tables, and table-backed datasets."
argument-hint: "<action> [table-name-or-id] [details]"
allowed-tools: mcp__dokki__create_table mcp__dokki__table_read mcp__dokki__table_add_rows mcp__dokki__table_delete_rows mcp__dokki__table_add_columns mcp__dokki__table_delete_columns mcp__dokki__table_update_columns mcp__dokki__table_update_cells mcp__dokki__list_resources mcp__dokki__search_workspace
---

# Dokki Table

Use a Dokki table for repeated records with shared fields: trackers, inventories,
directories, CRM lists, research matrices, and datasets that should support
sort/filter/cell-level editing.

Use a document instead for narrative prose, meeting notes, PRDs, and simple
Markdown tables. Use an artifact when the user wants a visual or interactive
presentation of data.

## Create

Call `create_table` with:

- `workspace_id`
- `name`
- optional `parent_id`
- optional `description`
- optional `columns`: `{ headerName, type }`
- optional `rows`: values keyed by column header name on initial create only

Column types: `text`, `number`, `boolean`, `date`, `select`, `multiSelect`,
`url`, `email`.

## Edit

Always call `table_read` before editing. The compact format returns row IDs and
column IDs, including short IDs that can be used in update calls.

Use:

- `table_add_rows` for new rows.
- `table_delete_rows` for removing rows.
- `table_add_columns` for new fields.
- `table_delete_columns` for removing fields and their values.
- `table_update_columns` for renaming or changing column metadata.
- `table_update_cells` for changing values in existing rows.

Batch related cell changes into one `table_update_cells` call.

## Follow-Ups

- Create a visualization from table data with `dokki-artifact`.
- Share or move the table with `dokki-workspace`.
- Publish the table with `dokki-publish`.
