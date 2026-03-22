import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ConfigMeta, ConfigItem, Framework, UseCase } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "configs");

function getFilesRecursive(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursive(full));
    } else if (entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

export function getAllConfigs(): ConfigMeta[] {
  const files = getFilesRecursive(CONTENT_DIR);
  const configs = files.map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    const slug = path.basename(filePath, ".md");
    return { slug, ...data } as ConfigMeta;
  });
  return configs.sort(
    (a, b) =>
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
}

export function getConfigBySlug(slug: string): ConfigItem | null {
  const files = getFilesRecursive(CONTENT_DIR);
  for (const filePath of files) {
    const name = path.basename(filePath, ".md");
    if (name === slug) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return { slug, ...data, content } as ConfigItem;
    }
  }
  return null;
}

export function getConfigsByFramework(framework: Framework): ConfigMeta[] {
  return getAllConfigs().filter((c) => c.framework === framework);
}

export function getConfigsByUseCase(useCase: UseCase): ConfigMeta[] {
  return getAllConfigs().filter((c) => c.useCases.includes(useCase));
}

export function getFeaturedConfigs(): ConfigMeta[] {
  return getAllConfigs().filter((c) => c.featured);
}

export function getAllSlugs(): string[] {
  return getAllConfigs().map((c) => c.slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const c of getAllConfigs()) {
    c.tags.forEach((t) => tags.add(t));
  }
  return Array.from(tags).sort();
}
