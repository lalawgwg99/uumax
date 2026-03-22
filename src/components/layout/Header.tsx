"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Zap, ChevronDown, Stethoscope, GitCompareArrows, Shuffle, Sparkles } from "lucide-react";

export function Header() {
  const t = useTranslations("nav");
  const tTools = useTranslations("tools");
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Zap size={20} className="text-[var(--color-brand)]" />
          <span>uumax</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/configs"
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            {t("browse")}
          </Link>
          <div className="relative" onMouseLeave={() => setToolsOpen(false)}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              onMouseEnter={() => setToolsOpen(true)}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-0.5"
            >
              {tTools("title")}
              <ChevronDown size={14} />
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-xl py-2 z-50">
                <Link href="/generate" onClick={() => setToolsOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--bg-secondary)] transition-colors">
                  <Sparkles size={14} className="text-[var(--color-brand)]" />
                  {t("generate")}
                </Link>
                <Link href="/tools/health-check" onClick={() => setToolsOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--bg-secondary)] transition-colors">
                  <Stethoscope size={14} className="text-emerald-500" />
                  {t("healthCheck")}
                </Link>
                <Link href="/tools/compare" onClick={() => setToolsOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--bg-secondary)] transition-colors">
                  <GitCompareArrows size={14} className="text-blue-500" />
                  {t("compare")}
                </Link>
                <Link href="/tools/remix" onClick={() => setToolsOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--bg-secondary)] transition-colors">
                  <Shuffle size={14} className="text-amber-500" />
                  {t("remix")}
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/submit"
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            {t("submit")}
          </Link>
          <a
            href="https://github.com/lalawgwg99/uumax"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors hidden sm:block"
          >
            {t("github")}
          </a>
          <LocaleSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
