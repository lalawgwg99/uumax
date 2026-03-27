"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Zap, Menu, X } from "lucide-react";

export function Header() {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);

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
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors hidden sm:block"
          >
            {t("browse")}
          </Link>
          <Link
            href="/skills"
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors hidden sm:block"
          >
            {t("skills")}
          </Link>
          <Link
            href="/guide"
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors hidden sm:block"
          >
            {t("guide")}
          </Link>
          <Link
            href="/tools"
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors hidden sm:block"
          >
            {t("tools")}
          </Link>
          <Link
            href="/generate"
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors hidden sm:block"
          >
            {t("generate")}
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
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-1 text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-[var(--border)] bg-[var(--bg)]">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
            <Link
              href="/configs"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors py-1"
            >
              {t("browse")}
            </Link>
            <Link
              href="/skills"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors py-1"
            >
              {t("skills")}
            </Link>
            <Link
              href="/guide"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors py-1"
            >
              {t("guide")}
            </Link>
            <Link
              href="/tools"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors py-1"
            >
              {t("tools")}
            </Link>
            <Link
              href="/generate"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors py-1"
            >
              {t("generate")}
            </Link>
            <a
              href="https://github.com/lalawgwg99/uumax"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors py-1"
            >
              {t("github")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
