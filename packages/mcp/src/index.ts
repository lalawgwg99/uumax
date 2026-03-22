import { startServer } from "./server.js";
import { runCli } from "./cli.js";

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "serve") {
  // Default: start MCP server
  startServer().catch((err) => {
    console.error("Failed to start MCP server:", err);
    process.exit(1);
  });
} else {
  // CLI mode
  runCli(args);
}
