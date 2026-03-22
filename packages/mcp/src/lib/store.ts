import data from "../data/configs.json" with { type: "json" };
import type { ConfigItem, ConfigMeta, Framework, UseCase } from "./types.js";

const configs: ConfigItem[] = data.configs as ConfigItem[];

export function getAllConfigs(): ConfigMeta[] {
  return configs.map(({ content: _, ...meta }) => meta);
}

export function getConfigBySlug(slug: string): ConfigItem | null {
  return configs.find((c) => c.slug === slug) || null;
}

export function searchConfigs(opts: {
  query?: string;
  framework?: Framework;
  useCase?: UseCase;
  tags?: string[];
}): ConfigMeta[] {
  let results = configs as ConfigMeta[];

  if (opts.framework) {
    results = results.filter((c) => c.framework === opts.framework);
  }
  if (opts.useCase) {
    results = results.filter((c) => c.useCases.includes(opts.useCase!));
  }
  if (opts.tags?.length) {
    results = results.filter((c) =>
      opts.tags!.some((t) => c.tags.includes(t.toLowerCase()))
    );
  }
  if (opts.query) {
    const q = opts.query.toLowerCase();
    results = results
      .map((c) => {
        let score = 0;
        if (c.title.toLowerCase().includes(q)) score += 10;
        if (c.description.toLowerCase().includes(q)) score += 5;
        if (c.tags.some((t) => t.toLowerCase().includes(q))) score += 3;
        if (c.framework.includes(q)) score += 2;
        return { ...c, _score: score };
      })
      .filter((c) => c._score > 0)
      .sort((a, b) => b._score - a._score)
      .map(({ _score: _, ...c }) => c);
  }

  return results.map(({ content: _, ...meta }) => meta as ConfigMeta);
}

export function recommendConfigs(keywords: string[]): (ConfigMeta & { reason: string })[] {
  const kw = keywords.map((k) => k.toLowerCase());

  return configs
    .map((c) => {
      let score = 0;
      const reasons: string[] = [];

      for (const k of kw) {
        if (c.tags.some((t) => t.includes(k))) {
          score += 5;
          reasons.push(`matches tag "${k}"`);
        }
        if (c.title.toLowerCase().includes(k)) {
          score += 3;
          reasons.push(`title contains "${k}"`);
        }
        if (c.description.toLowerCase().includes(k)) {
          score += 2;
        }
        if (c.framework.includes(k)) {
          score += 4;
          reasons.push(`framework: ${c.framework}`);
        }
      }

      const { content: _, ...meta } = c;
      return { ...meta, _score: score, reason: reasons.slice(0, 3).join(", ") || "general match" };
    })
    .filter((c) => c._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 5)
    .map(({ _score: _, ...c }) => c);
}

export function composeConfigs(slugs: string[]): string {
  const parts: string[] = [];

  for (const slug of slugs) {
    const config = configs.find((c) => c.slug === slug);
    if (!config) continue;

    const codeMatch = config.content.match(/```[\w]*\n([\s\S]*?)```/);
    const code = codeMatch ? codeMatch[1].trim() : config.content;

    parts.push(`# === ${config.title} (${config.framework}) ===\n# Source: uumax.pages.dev/configs/${slug}\n\n${code}`);
  }

  return parts.join("\n\n---\n\n");
}

export function getFrameworkCounts(): { framework: string; label: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const c of configs) {
    counts[c.framework] = (counts[c.framework] || 0) + 1;
  }
  return Object.entries(counts).map(([fw, count]) => ({
    framework: fw,
    label: fw,
    count,
  }));
}
