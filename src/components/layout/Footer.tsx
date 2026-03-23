"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t border-[var(--border)] py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-sm text-[var(--fg-muted)]">
          <div>
            <span className="font-semibold text-[var(--fg)]">uumax</span>
            <p className="mt-1">{t("tagline")}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/configs" className="hover:text-[var(--fg)] transition-colors">
              {nav("browse")}
            </Link>
            <Link href="/tools" className="hover:text-[var(--fg)] transition-colors">
              {nav("tools")}
            </Link>
            <Link href="/generate" className="hover:text-[var(--fg)] transition-colors">
              {nav("generate")}
            </Link>
            <Link href="/submit" className="hover:text-[var(--fg)] transition-colors">
              {nav("submit")}
            </Link>
            <a
              href="https://github.com/lalawgwg99/uumax"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--fg)] transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
        <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs text-[var(--fg-muted)] text-center sm:text-left">
          &copy; {new Date().getFullYear()} uumax. {t("tagline")}
        </div>
      </div>
    </footer>
  );
}
