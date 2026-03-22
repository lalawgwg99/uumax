import {
  searchConfigs,
  getConfigBySlug,
  composeConfigs,
  getFrameworkCounts,
  getAllConfigs,
} from "./lib/store.js";
import { TARGET_FILES } from "./lib/types.js";
import type { ConfigType, Framework, UseCase } from "./lib/types.js";
import fs from "fs";
import path from "path";

export function runCli(args: string[]) {
  const cmd = args[0];

  switch (cmd) {
    case "search":
      return cmdSearch(args.slice(1));
    case "list":
      return cmdList();
    case "install":
      return cmdInstall(args[1]);
    case "compose":
      return cmdCompose(args.slice(1));
    case "info":
      return cmdInfo(args[1]);
    case "help":
    case "--help":
    case "-h":
      return cmdHelp();
    default:
      console.log(`Unknown command: ${cmd}`);
      cmdHelp();
      process.exit(1);
  }
}

function cmdSearch(args: string[]) {
  const query = args.join(" ");
  const results = searchConfigs({ query: query || undefined });

  if (!results.length) {
    console.log("No configs found.");
    return;
  }

  for (const c of results) {
    console.log(`  ${c.slug.padEnd(25)} ${c.framework.padEnd(12)} ${c.title}`);
  }
  console.log(`\n${results.length} configs found.`);
}

function cmdList() {
  const frameworks = getFrameworkCounts();
  const all = getAllConfigs();

  console.log("\nFrameworks:");
  for (const fw of frameworks) {
    console.log(`  ${fw.framework.padEnd(15)} ${fw.count} configs`);
  }

  console.log(`\nAll configs (${all.length}):\n`);
  for (const c of all) {
    const price = c.pricing === "premium" ? `$${c.price}` : "free";
    console.log(`  ${c.slug.padEnd(25)} ${c.framework.padEnd(12)} ${price.padEnd(6)} ${c.title}`);
  }
}

function cmdInstall(slug: string | undefined) {
  if (!slug) {
    console.error("Usage: uumax-mcp install <slug>");
    process.exit(1);
  }

  const config = getConfigBySlug(slug);
  if (!config) {
    console.error(`Config "${slug}" not found.`);
    process.exit(1);
  }

  const codeMatch = config.content.match(/```[\w]*\n([\s\S]*?)```/);
  const code = codeMatch ? codeMatch[1].trim() : config.content;
  const targetFile = config.includes[0] || TARGET_FILES[config.configType as ConfigType] || `${slug}.md`;
  const targetPath = path.join(process.cwd(), targetFile);

  if (fs.existsSync(targetPath)) {
    console.log(`⚠ File already exists: ${targetFile}`);
    console.log(`  Overwriting...`);
  }

  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(targetPath, code);
  console.log(`✓ Installed "${config.title}" → ${targetFile}`);
}

function cmdCompose(slugs: string[]) {
  if (slugs.length < 2) {
    console.error("Usage: uumax-mcp compose <slug1> <slug2> [slug3...]");
    process.exit(1);
  }

  const result = composeConfigs(slugs);
  if (!result) {
    console.error("No valid configs found for the given slugs.");
    process.exit(1);
  }

  console.log(result);
}

function cmdInfo(slug: string | undefined) {
  if (!slug) {
    console.error("Usage: uumax-mcp info <slug>");
    process.exit(1);
  }

  const config = getConfigBySlug(slug);
  if (!config) {
    console.error(`Config "${slug}" not found.`);
    process.exit(1);
  }

  console.log(`\n  Title:       ${config.title}`);
  console.log(`  Description: ${config.description}`);
  console.log(`  Framework:   ${config.framework}`);
  console.log(`  Author:      ${config.author}`);
  console.log(`  Version:     ${config.version}`);
  console.log(`  Pricing:     ${config.pricing === "premium" ? `$${config.price}` : "free"}`);
  console.log(`  Tags:        ${config.tags.join(", ")}`);
  console.log(`  Use Cases:   ${config.useCases.join(", ")}`);
  console.log(`  Target File: ${config.includes[0] || TARGET_FILES[config.configType as ConfigType]}`);
}

function cmdHelp() {
  console.log(`
uumax-mcp — AI Agent Config Marketplace CLI & MCP Server

Usage:
  uumax-mcp                    Start MCP server (stdio)
  uumax-mcp search <query>     Search configs
  uumax-mcp list               List all configs
  uumax-mcp info <slug>        Show config details
  uumax-mcp install <slug>     Install config to current directory
  uumax-mcp compose <s1> <s2>  Compose multiple configs into one
  uumax-mcp help               Show this help

Examples:
  uumax-mcp search "react fullstack"
  uumax-mcp install fullstack-dev
  uumax-mcp compose fullstack-dev git-conventions
`);
}
