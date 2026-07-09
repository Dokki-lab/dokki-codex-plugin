#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertFile(relativePath) {
  assert(fs.existsSync(path.join(repoRoot, relativePath)), `${relativePath} is missing`);
}

const plugin = readJson("plugins/dokki-mcp/.codex-plugin/plugin.json");
const mcp = readJson("plugins/dokki-mcp/.mcp.json");
const marketplace = readJson(".agents/plugins/marketplace.json");

assert(plugin.name === "dokki-mcp", "plugin name must be dokki-mcp");
assert(plugin.mcpServers === "./.mcp.json", "plugin must reference ./.mcp.json");
assert(plugin.homepage === "https://dokki.one", "plugin homepage must use dokki.one");
assert(
  plugin.repository === "https://github.com/Dokki-lab/dokki-codex-plugin",
  "plugin repository must point at dokki-codex-plugin"
);
assert(
  plugin.interface?.websiteURL === "https://dokki.one",
  "plugin interface websiteURL must use dokki.one"
);
assert(
  plugin.interface?.privacyPolicyURL === "https://dokki.one/privacy",
  "plugin privacyPolicyURL must use dokki.one/privacy"
);
assert(
  plugin.interface?.termsOfServiceURL === "https://dokki.one/terms",
  "plugin termsOfServiceURL must use dokki.one/terms"
);
assert(
  plugin.interface?.composerIcon === "./assets/icon.png",
  "plugin composerIcon must point at ./assets/icon.png"
);
assert(plugin.interface?.logo === "./assets/logo.png", "plugin logo must point at ./assets/logo.png");
assert(
  plugin.interface?.logoDark === "./assets/logo-dark.png",
  "plugin logoDark must point at ./assets/logo-dark.png"
);
assert(
  (plugin.keywords ?? []).includes("tables") &&
    (plugin.keywords ?? []).includes("artifacts") &&
    (plugin.keywords ?? []).includes("files"),
  "plugin keywords must include tables, artifacts, and files"
);
assert(
  Array.isArray(plugin.interface?.defaultPrompt) &&
    plugin.interface.defaultPrompt.length <= 3,
  "defaultPrompt must contain at most 3 entries"
);

for (const asset of [
  "plugins/dokki-mcp/assets/icon.png",
  "plugins/dokki-mcp/assets/logo.png",
  "plugins/dokki-mcp/assets/logo-dark.png",
]) {
  assertFile(asset);
}

for (const skill of [
  "dokki-workspace",
  "dokki-table",
  "dokki-artifact",
  "dokki-file",
  "dokki-publish",
]) {
  assertFile(`plugins/dokki-mcp/skills/${skill}/SKILL.md`);
}

const fileSkill = fs.readFileSync(
  path.join(repoRoot, "plugins/dokki-mcp/skills/dokki-file/SKILL.md"),
  "utf8"
);
assert(/download|action:\s*"file"/i.test(fileSkill), "dokki-file skill must cover reading/downloading a file");

const servers = mcp.mcpServers ?? {};
assert(
  JSON.stringify(Object.keys(servers).sort()) === JSON.stringify(["dokki"]),
  "plugin must declare only the primary Dokki MCP server"
);
for (const name of ["dokki"]) {
  const server = servers[name];
  assert(server, `missing MCP server: ${name}`);
  assert(server.type === "http", `${name} must be an HTTP MCP server`);
  assert(
    typeof server.url === "string" && server.url.startsWith("https://dokki.one/"),
    `${name} must point at a hosted Dokki MCP endpoint`
  );
  assert(!server.command, `${name} must not use a local stdio command`);
}

const entry = marketplace.plugins?.find((item) => item.name === "dokki-mcp");
assert(entry, "marketplace entry for dokki-mcp is missing");
assert(
  entry.policy?.authentication === "ON_INSTALL",
  "marketplace authentication must be ON_INSTALL so Codex starts OAuth during install"
);

console.log("Dokki MCP Codex plugin metadata is valid.");
