export type Framework = "claude-code" | "cursor" | "openclaw" | "windsurf" | "copilot" | "continue" | "aider" | "generic";

export type UseCase =
  | "frontend"
  | "backend"
  | "fullstack"
  | "devops"
  | "writing"
  | "data"
  | "mobile"
  | "security";

export type PricingTier = "free" | "premium";

export type ConfigType =
  | "claude-md"
  | "cursor-rules"
  | "copilot-instructions"
  | "continue-config"
  | "aider-conf"
  | "mcp-config"
  | "hooks"
  | "system-prompt"
  | "bundle";

export interface ConfigMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorGithub?: string;
  framework: Framework;
  useCases: UseCase[];
  tags: string[];
  pricing: PricingTier;
  price?: number;
  purchaseUrl?: string;
  configType: ConfigType;
  includes: string[];
  version: string;
  lastUpdated: string;
  featured?: boolean;
  previewImage?: string;
  changelog?: { version: string; date: string; changes: string }[];
}

export interface ConfigItem extends ConfigMeta {
  content: string;
}

export const FRAMEWORK_LABELS: Record<Framework, string> = {
  "claude-code": "Claude Code",
  cursor: "Cursor",
  openclaw: "OpenClaw",
  windsurf: "Windsurf",
  copilot: "GitHub Copilot",
  continue: "Continue.dev",
  aider: "Aider",
  generic: "Generic",
};

export const USECASE_LABELS: Record<UseCase, string> = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Full-Stack",
  devops: "DevOps",
  writing: "Writing",
  data: "Data",
  mobile: "Mobile",
  security: "Security",
};
