#!/usr/bin/env node

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const DEFAULT_ORIGIN = "https://dokki.one";
const FLAVOR_PATHS = {
  documents: "/mcp/v2",
  publish: "/api/publish-mcp",
  memory: "/api/mem-mcp",
};

function getRemoteUrl() {
  if (process.env.DOKKI_MCP_URL) {
    return new URL(process.env.DOKKI_MCP_URL);
  }

  const origin = process.env.DOKKI_MCP_ORIGIN || DEFAULT_ORIGIN;
  const flavor = process.env.DOKKI_MCP_FLAVOR || "documents";
  const path = FLAVOR_PATHS[flavor];

  if (!path) {
    throw new Error(
      `Unsupported DOKKI_MCP_FLAVOR "${flavor}". Use "documents", "publish", or "memory".`
    );
  }

  return new URL(path, origin);
}

function getHeaders() {
  const token = process.env.DOKKI_MCP_TOKEN || process.env.DOKKI_API_KEY;
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}

let clientPromise;

async function getClient() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const url = getRemoteUrl();
      const client = new Client(
        { name: "dokki-mcp-bridge", version: "0.1.0" },
        { capabilities: {} }
      );
      const transport = new StreamableHTTPClientTransport(url, {
        requestInit: { headers: getHeaders() },
      });

      await client.connect(transport);
      console.error(`[dokki-mcp] connected to ${url.toString()}`);
      return client;
    })().catch((error) => {
      clientPromise = undefined;
      throw error;
    });
  }

  return clientPromise;
}

const server = new Server(
  { name: "dokki-mcp", version: "0.1.0" },
  {
    capabilities: { tools: {} },
    instructions:
      "Proxy for Dokki MCP. Configure DOKKI_MCP_TOKEN plus either DOKKI_MCP_URL or DOKKI_MCP_ORIGIN/DOKKI_MCP_FLAVOR.",
  }
);

server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  const client = await getClient();
  return client.listTools(request.params ?? {});
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const client = await getClient();
  return client.callTool(request.params);
});

const stdio = new StdioServerTransport();
await server.connect(stdio);
