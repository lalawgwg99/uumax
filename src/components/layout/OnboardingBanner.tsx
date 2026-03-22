"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, HelpCircle } from "lucide-react";

const STORAGE_KEY = "uumax-onboarding-dismissed";

export function OnboardingBanner() {
  const t = useTranslations("onboarding");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setShow(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="bg-[var(--color-brand)]/5 border-b border-[var(--color-brand)]/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-start gap-3">
        <HelpCircle size={20} className="text-[var(--color-brand)] shrink-0 mt-0.5" />
        <div className="flex-1 text-sm">
          <p className="font-medium text-[var(--fg)] mb-1">{t("title")}</p>
          <p className="text-[var(--fg-muted)]">{t("description")}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-xs text-[var(--fg-muted)]">
            <span className="inline-flex items-center gap-1">
              <span className="w-5 h-5 rounded bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center font-bold">1</span>
              {t("step1")}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-5 h-5 rounded bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center font-bold">2</span>
              {t("step2")}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-5 h-5 rounded bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center font-bold">3</span>
              {t("step3")}
            </span>
          </div>
        </div>
        <button
          onClick={dismiss}
          className="p-1 rounded hover:bg-[var(--bg-secondary)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
