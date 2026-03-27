import { setRequestLocale } from "next-intl/server";
import { getAllSkills } from "@/lib/skills";
import { SkillsClient } from "./SkillsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill Marketplace",
  description: "Browse and install curated MCP servers and AI skills for Claude Code, Cursor, Continue.dev, and more.",
};

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const skills = getAllSkills();
  return <SkillsClient skills={skills} />;
}
