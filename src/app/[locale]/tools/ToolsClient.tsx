"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Stethoscope, GitCompareArrows, Shuffle, Sparkles, Lock, ExternalLink } from "lucide-react";
import { getFreeTierRemaining, getApiKey } from "@/lib/openrouter";
import { HealthCheckTab } from "./tabs/HealthCheckTab";
import { CompareTab } from "./tabs/CompareTab";
import { RemixTab } from "./tabs/RemixTab";
import type { ConfigMeta } from "@/lib/types";

type Tab = "health-check" | "compare" | "remix";

const TABS: { id: Tab; icon: typeof Stethoscope; color: string }[] = [
  { id: "health-check", icon: Stethoscope, color: "text-emerald-500" },
  { id: "compare", icon: GitCompareArrows, color: "text-blue-500" },
  { id: "remix", icon: Shuffle, color: "text-amber-500" },
];

interface Props {
  configs: ConfigMeta[];
}

export function ToolsClient({ configs }: Props) {
  const t = useTranslations("tools");
  const [tab, setTab] = useState<Tab>("health-check");
  const [remaining, setRemaining] = useState(5);
  const [hasOwnKey, setHasOwnKey] = useState(false);

  useEffect(() => {
    setRemaining(getFreeTierRemaining());
    const auth = getApiKey();
    setHasOwnKey(auth !== null && !auth.isFreeTier);
  }, [tab]);

  // Read initial tab from URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1) as Tab;
    if (TABS.some((t) => t.id === hash)) setTab(hash);
  }, []);

  const handleTab = (id: Tab) => {
    setTab(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div>
      {/* Free tier indicator */}
      <div className="mb-6 flex items-center gap-2 text-sm text-[var(--fg-muted)]">
        {hasOwnKey ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
            <Sparkles size={14} />
            {t("unlimitedKey")}
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
            <Lock size={14} />
            {t("freeRemaining", { count: remaining })}
            <span className="opacity-40">·</span>
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors underline underline-offset-2"
            >
              {t("setKeyHint")}
              <ExternalLink size={10} />
            </a>
          </span>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-[var(--border)] mb-6">
        {TABS.map(({ id, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => handleTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === id
                ? "border-[var(--color-brand)] text-[var(--fg)]"
                : "border-transparent text-[var(--fg-muted)] hover:text-[var(--fg)]"
            }`}
          >
            <Icon size={16} className={tab === id ? color : ""} />
            {t(id)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "health-check" && <HealthCheckTab />}
      {tab === "compare" && <CompareTab configs={configs} />}
      {tab === "remix" && <RemixTab configs={configs} />}
    </div>
  );
}
