import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  searchConfigs,
  getConfigBySlug,
  recommendConfigs,
  composeConfigs,
  getFrameworkCounts,
} from "./lib/store.js";
import { TARGET_FILES } from "./lib/types.js";
import type { ConfigType } from "./lib/types.js";

export async function startServer() {
  const server = new McpServer({
    name: "uumax",
    version: "0.1.0",
  });

  // search_configs
  server.tool(
    "search_configs",
    "Search AI agent configurations by keyword, framework, use case, or tags",
    {
      query: z.string().optional().describe("Search keyword"),
      framework: z.enum(["claude-code", "cursor", "openclaw", "windsurf", "generic"]).optional().describe("Filter by framework"),
      useCase: z.enum(["frontend", "backend", "fullstack", "devops", "writing", "data", "mobile", "security"]).optional().describe("Filter by use case"),
      tags: z.array(z.string()).optional().describe("Filter by tags"),
    },
    async (args) => {
      const results = searchConfigs(args);
      return {
        content: [{
          type: "text" as const,
          text: results.length
            ? JSON.stringify(results, null, 2)
            : "No configs found matching your criteria.",
        }],
      };
    }
  );

  // get_config
  server.tool(
    "get_config",
    "Get the full content of a specific configuration by its slug",
    {
      slug: z.string().describe("The config slug (e.g. 'fullstack-dev')"),
    },
    async ({ slug }) => {
      const config = getConfigBySlug(slug);
      if (!config) {
        return { content: [{ type: "text" as const, text: `Config "${slug}" not found.` }] };
      }
      return {
        content: [{ type: "text" as const, text: JSON.stringify(config, null, 2) }],
      };
    }
  );

  // recommend_config
  server.tool(
    "recommend_config",
    "Recommend configs based on project description or package.json dependencies. Pass either a text description or the content of package.json.",
    {
      projectDescription: z.string().optional().describe("Describe your project (e.g. 'React + TypeScript fullstack app with Prisma')"),
      packageJson: z.string().optional().describe("Content of package.json for automatic dependency analysis"),
    },
    async ({ projectDescription, packageJson }) => {
      const keywords: string[] = [];

      if (projectDescription) {
        keywords.push(...projectDescription.toLowerCase().split(/[\s,;]+/).filter((w) => w.length > 2));
      }

      if (packageJson) {
        try {
          const pkg = JSON.parse(packageJson);
          const deps = { ...pkg.dependencies, ...pkg.devDependencies };
          for (const dep of Object.keys(deps)) {
            const name = dep.replace(/^@[\w-]+\//, "");
            keywords.push(name.toLowerCase());
          }
        } catch {
          // ignore parse errors
        }
      }

      if (!keywords.length) {
        return { content: [{ type: "text" as const, text: "Please provide a project description or package.json content." }] };
      }

      const results = recommendConfigs(keywords);
      return {
        content: [{
          type: "text" as const,
          text: results.length
            ? JSON.stringify(results, null, 2)
            : "No matching configs found for your project.",
        }],
      };
    }
  );

  // compose_configs
  server.tool(
    "compose_configs",
    "Merge multiple configurations into a single combined config. Useful for combining framework rules with coding conventions.",
    {
      slugs: z.array(z.string()).min(2).describe("Array of config slugs to compose (e.g. ['fullstack-dev', 'git-conventions'])"),
    },
    async ({ slugs }) => {
      const result = composeConfigs(slugs);
      if (!result) {
        return { content: [{ type: "text" as const, text: "No valid configs found for the given slugs." }] };
      }
      return {
        content: [{ type: "text" as const, text: result }],
      };
    }
  );

  // list_frameworks
  server.tool(
    "list_frameworks",
    "List all available frameworks and how many configs each has",
    {},
    async () => {
      const frameworks = getFrameworkCounts();
      return {
        content: [{ type: "text" as const, text: JSON.stringify(frameworks, null, 2) }],
      };
    }
  );

  // install_config
  server.tool(
    "install_config",
    "Get a config's content and the target filename for installation. The agent should write the content to the specified file.",
    {
      slug: z.string().describe("The config slug to install"),
    },
    async ({ slug }) => {
      const config = getConfigBySlug(slug);
      if (!config) {
        return { content: [{ type: "text" as const, text: `Config "${slug}" not found.` }] };
      }

      const codeMatch = config.content.match(/```[\w]*\n([\s\S]*?)```/);
      const code = codeMatch ? codeMatch[1].trim() : config.content;
      const targetFile = config.includes[0] || TARGET_FILES[config.configType as ConfigType] || `${slug}.md`;

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            slug: config.slug,
            title: config.title,
            framework: config.framework,
            targetFilename: targetFile,
            content: code,
            instruction: `Write the content above to "${targetFile}" in the project root.`,
          }, null, 2),
        }],
      };
    }
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
