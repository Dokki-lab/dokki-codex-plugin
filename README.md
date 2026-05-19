# Dokki SDK

SDKs, MCP bridges, and Codex plugins for Dokki.

## Codex Plugin: Dokki MCP

The `dokki-mcp` plugin exposes Dokki's remote MCP endpoints to Codex through a local stdio bridge.

Default endpoint:

```bash
https://dokki.one/api/mcp
```

Configure a Dokki connector token or API key before using the plugin:

```bash
export DOKKI_MCP_TOKEN="dkc_..."
```

Switch to the memory MCP flavor:

```bash
export DOKKI_MCP_FLAVOR=memory
```

Override the endpoint directly:

```bash
export DOKKI_MCP_URL="https://dokki.one/api/mem-mcp"
```

## Development

Install dependencies:

```bash
npm install
```

Validate the bridge script:

```bash
npm run check
```

The Codex marketplace entry lives at `.agents/plugins/marketplace.json`; the plugin itself lives under `plugins/dokki-mcp`.
