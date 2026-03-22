export type Framework = "claude-code" | "cursor" | "openclaw" | "windsurf" | "generic";

export type UseCase = "frontend" | "backend" | "fullstack" | "devops" | "writing" | "data" | "mobile" | "security";

export type ConfigType = "claude-md" | "cursor-rules" | "mcp-config" | "hooks" | "system-prompt" | "bundle";

export interface ConfigMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorGithub?: string;
  framework: Framework;
  useCases: UseCase[];
  tags: string[];
  pricing: "free" | "premium";
  price?: number;
  configType: ConfigType;
  includes: string[];
  version: string;
  lastUpdated: string;
  featured?: boolean;
}

export interface ConfigItem extends ConfigMeta {
  content: string;
}

export const TARGET_FILES: Record<ConfigType, string> = {
  "claude-md": "CLAUDE.md",
  "cursor-rules": ".cursorrules",
  "mcp-config": "mcp.json",
  "hooks": ".claude/hooks.json",
  "system-prompt": "system-prompt.md",
  "bundle": "config-bundle.md",
};

export const FRAMEWORK_LABELS: Record<Framework, string> = {
  "claude-code": "Claude Code",
  cursor: "Cursor",
  openclaw: "OpenClaw",
  windsurf: "Windsurf",
  generic: "Generic",
};
