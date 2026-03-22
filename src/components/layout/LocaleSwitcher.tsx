"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  "zh-TW": "中",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale =
    locale === routing.locales[0] ? routing.locales[1] : routing.locales[0];

  return (
    <button
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors flex items-center gap-1 text-sm"
      aria-label="Switch language"
    >
      <Globe size={16} />
      <span className="hidden sm:inline">
        {LOCALE_LABELS[nextLocale]}
      </span>
    </button>
  );
}
