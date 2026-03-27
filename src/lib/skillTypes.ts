export type SkillCategory =
  | "code"
  | "data"
  | "browser"
  | "communication"
  | "search"
  | "ai"
  | "productivity"
  | "other";

export interface SkillMeta {
  slug: string;
  name: string;
  description: string;
  author: string;
  authorGithub?: string;
  category: SkillCategory;
  tags: string[];
  pricing: "free" | "premium";
  price?: number;
  installCmd?: string;
  repoUrl?: string;
  docsUrl?: string;
  installUrl?: string;
  compatibleWith?: string[];
  version?: string;
  lastUpdated: string;
  featured?: boolean;
  verified?: boolean;
}

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  code: "Code & Git",
  data: "Databases",
  browser: "Browser & Web",
  communication: "Communication",
  search: "Search",
  ai: "AI & Models",
  productivity: "Productivity",
  other: "Other",
};

export const CATEGORY_COLOR: Record<SkillCategory, string> = {
  code: "text-orange-500 bg-orange-500/10",
  data: "text-blue-500 bg-blue-500/10",
  browser: "text-cyan-500 bg-cyan-500/10",
  communication: "text-purple-500 bg-purple-500/10",
  search: "text-yellow-500 bg-yellow-500/10",
  ai: "text-pink-500 bg-pink-500/10",
  productivity: "text-teal-500 bg-teal-500/10",
  other: "text-gray-500 bg-gray-500/10",
};
