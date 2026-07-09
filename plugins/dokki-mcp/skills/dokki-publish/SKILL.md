---
name: dokki-publish
description: "Manage Dokki published sites, published resources, and custom domains through the dokki-publish MCP server."
argument-hint: "<site-or-workspace> [publish-action]"
---

# Dokki Publish

Use the `publish` facade on the `dokki` MCP server for published docs sites and
custom domains. (The old standalone `dokki-publish` server is folded into this facade.)

Actions:

- `publish {action:"site", workspace_id}` — get the workspace's publish site.
- `publish {action:"site.create", workspace_id, args:{slug?}}`
- `publish {action:"site.update", site_id, args:{is_active?, slug?, settings?}}`
- `publish {action:"resources", site_id}` — list published resources.
- `publish {action:"add", site_id, resource_id}` — publish a resource; exposes it
  publicly, so this returns a `confirm_token` to re-send.
- `publish {action:"remove", site_id, resource_id}` — unpublish.
- `publish {action:"domain.set", site_id, args:{domain}}`
- `publish {action:"domain.remove", site_id}`
- `publish {action:"domain.status", site_id}`

Confirm before changing public visibility, domains, or unpublishing resources.
