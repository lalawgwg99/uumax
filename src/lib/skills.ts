import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { SkillMeta } from "./skillTypes";

const SKILLS_DIR = path.join(process.cwd(), "content", "skills");

export function getAllSkills(): SkillMeta[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  const files = fs.readdirSync(SKILLS_DIR).filter((f) => f.endsWith(".md"));
  const skills = files.map((file) => {
    const raw = fs.readFileSync(path.join(SKILLS_DIR, file), "utf-8");
    const { data } = matter(raw);
    const slug = path.basename(file, ".md");
    return { slug, ...data } as SkillMeta;
  });
  return skills.sort(
    (a, b) =>
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
}

export function getFeaturedSkills(): SkillMeta[] {
  return getAllSkills().filter((s) => s.featured);
}
