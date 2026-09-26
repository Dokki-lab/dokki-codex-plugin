<p>
  <a href="https://dokki.one">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Dokki-lab/.github/main/assets/dokki-dark.svg">
      <img src="https://raw.githubusercontent.com/Dokki-lab/.github/main/assets/dokki-light.svg" alt="Dokki" width="180">
    </picture>
  </a>
</p>

# Dokki for Codex

**You lead. Agents do the work.** [Dokki](https://dokki.one) brings your team, agents and work into one workspace—from the first goal to shared, editable results.

Connect Codex to your Dokki workspace. Search shared knowledge, create documents, work with tables and artifacts, and publish results through MCP.

[Connect](#connect-to-dokki) · [Documentation](https://dokki.one/pub/docs) · [Contribute](#development)

## Connect to Dokki

You need Codex with MCP support and a [Dokki account](https://dokki.one). Choose the Personal and Org workspaces the connection may access during Dokki's OAuth sign-in.

**Plugin users:** this repository contains the `dokki` marketplace and `dokki-mcp` plugin, including focused skills. Use the repository source `Dokki-lab/dokki-codex-plugin` in a Codex client that supports repository marketplaces. See [marketplace layout](#codex-marketplace-import) below.

**MCP-only CLI setup:** to connect the hosted tools directly, run:

```sh
codex mcp add dokki --url https://dokki.one/mcp/v2
codex mcp login dokki
```

This direct connection does not install the plugin's bundled skills. If you already installed the plugin, use its connection rather than adding a duplicate.

## Your first result

Ask Codex:

> List the Dokki workspaces I can access, then show the resources in the workspace I choose.

You should see the workspaces allowed by your sign-in scope. Once that works, try:

> Create a document called “Launch brief” in my chosen workspace with sections for audience, message and next steps. Return the document link.

Open the returned link in Dokki to review and edit the result. Publishing is a separate action; creating a document does not make it public.

## What is included

| Workflow | Tools |
| --- | --- |
| Discover and read knowledge | `find`, `read` |
| Create and edit shared work | `create`, `edit` |
| Collaborate and share | `message`, `share` |
| Publish and connect apps | `publish`, `connect` |
| Work with agents and skills | `agent`, `skills` |
| Preview a result | `preview_resource` |

The hosted server at `https://dokki.one/mcp/v2` describes its current actions. Call a tool without an `action` to discover its interface. The plugin bundles routing, workspace, document, table, artifact, file and publishing skills.

## Troubleshooting

- **Missing workspace:** check the scope selected during OAuth. Reconnect only when you intend to change that access.
- **MCP-only connection but no skills:** install the plugin for its bundled workflows; MCP tools and skills are separate.
- **Account or usage question:** see [plans](https://dokki.one/plans) or [support](https://github.com/Dokki-lab/.github/blob/main/SUPPORT.md). The plugin is open source; hosted usage follows your Dokki plan.

## Development

Install dependencies:

```bash
npm install
```

Validate the plugin metadata:

```bash
npm run check
```

The Codex marketplace entry lives at `.agents/plugins/marketplace.json`; the plugin itself lives under `plugins/dokki-mcp`.

## Codex Marketplace Import

This repository is structured as a repo-local Codex marketplace:

```text
.agents/plugins/marketplace.json
plugins/dokki-mcp/.codex-plugin/plugin.json
```

Marketplace entry:

```json
{
  "name": "dokki-mcp",
  "source": {
    "source": "local",
    "path": "./plugins/dokki-mcp"
  },
  "policy": {
    "installation": "AVAILABLE",
    "authentication": "ON_INSTALL"
  },
  "category": "Productivity"
}
```

## Contributing and support

Bug reports, examples and focused improvements are welcome. Read the [contribution guide](https://github.com/Dokki-lab/.github/blob/main/CONTRIBUTING.md), use this repository's Issues for reproducible problems, and follow [private security reporting](https://github.com/Dokki-lab/.github/blob/main/SECURITY.md) for vulnerabilities.

[Dokki](https://dokki.one) · [Documentation](https://dokki.one/pub/docs) · [All projects](https://github.com/Dokki-lab) · [Support](https://github.com/Dokki-lab/.github/blob/main/SUPPORT.md)

## License

The plugin and package manifests declare MIT. This repository does not yet include a standalone LICENSE file; maintainers should add the intended license text and copyright details.
