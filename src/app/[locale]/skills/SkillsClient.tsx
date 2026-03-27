"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Search, ExternalLink, Terminal, ShieldCheck, Star, Package } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { SkillMeta, SkillCategory } from "@/lib/skillTypes";
import { CATEGORY_LABELS, CATEGORY_COLOR } from "@/lib/skillTypes";

interface Props {
  skills: SkillMeta[];
}

export function SkillsClient({ skills }: Props) {
  const t = useTranslations("skills");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SkillCategory | "all">("all");

  const categories = useMemo(() => {
    const cats = new Set(skills.map((s) => s.category));
    return Array.from(cats) as SkillCategory[];
  }, [skills]);

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      const matchCat = category === "all" || s.category === category;
      const q = query.toLowerCase();
      const matchQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [skills, query, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)] mb-2">
          <Link href="/" className="hover:text-[var(--fg)] transition-colors">{t("backHome")}</Link>
          <span>/</span>
          <span>{t("title")}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-[var(--fg-muted)] max-w-2xl">{t("subtitle")}</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-sm outline-none focus:border-[var(--color-brand)]"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setCategory("all")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            category === "all"
              ? "bg-[var(--color-brand)] text-white"
              : "border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)]"
          }`}
        >
          {t("allCategories")} ({skills.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              category === cat
                ? "bg-[var(--color-brand)] text-white"
                : "border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-secondary)]"
            }`}
          >
            {CATEGORY_LABELS[cat]} ({skills.filter((s) => s.category === cat).length})
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--fg-muted)]">{t("empty")}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function SkillCard({ skill, t }: { skill: SkillMeta; t: ReturnType<typeof useTranslations<"skills">> }) {
  const colorClass = CATEGORY_COLOR[skill.category];

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 flex flex-col gap-3 hover:shadow-lg hover:shadow-black/5 transition-all hover:border-[var(--color-brand)]/30">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${colorClass}`}>
            <Package size={16} />
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm">{skill.name}</span>
              {skill.verified && (
                <ShieldCheck size={13} className="text-[var(--color-brand)] shrink-0" />
              )}
              {skill.featured && (
                <Star size={12} className="text-amber-500 fill-amber-500 shrink-0" />
              )}
            </div>
            <span className={`inline-block text-xs px-1.5 py-0.5 rounded-md mt-0.5 ${colorClass}`}>
              {CATEGORY_LABELS[skill.category]}
            </span>
          </div>
        </div>
        <span className="text-xs text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
          {t("free")}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--fg-muted)] line-clamp-3">{skill.description}</p>

      {/* Tags */}
      {skill.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {skill.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[var(--fg-muted)]">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Install command */}
      {skill.installCmd && (
        <div className="rounded-lg bg-[var(--bg-secondary)] px-3 py-2 flex items-center gap-2">
          <Terminal size={12} className="text-[var(--fg-muted)] shrink-0" />
          <code className="text-xs text-[var(--fg-muted)] truncate">{skill.installCmd}</code>
        </div>
      )}

      {/* Links */}
      <div className="flex items-center gap-2 mt-auto pt-1">
        {skill.repoUrl && (
          <a
            href={skill.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <ExternalLink size={11} />
            {t("repo")}
          </a>
        )}
        {skill.docsUrl && (
          <a
            href={skill.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <ExternalLink size={11} />
            {t("docs")}
          </a>
        )}
        {skill.installUrl && (
          <a
            href={skill.installUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)] transition-colors"
          >
            {t("install")}
          </a>
        )}
      </div>
    </div>
  );
}
