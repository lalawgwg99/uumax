"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GitCompareArrows } from "lucide-react";
import { useAI } from "@/lib/useAI";
import type { ConfigMeta } from "@/lib/types";

const SYSTEM_PROMPT = `You are comparing two AI agent configurations. Analyze both and provide:

## Side-by-Side Summary

| Aspect | Config A | Config B |
|--------|----------|----------|
| Focus | ... | ... |
| Strengths | ... | ... |
| Best for | ... | ... |

## Key Differences
- (list 3-5 main differences)

## Which to Choose?
- Choose A if: ...
- Choose B if: ...
- Combine both if: ...

Be concise and practical. Respond in the same language the user writes in.`;

interface Props {
  configs: ConfigMeta[];
}

export function CompareTab({ configs }: Props) {
  const t = useTranslations("compare");
  const [slugA, setSlugA] = useState("");
  const [slugB, setSlugB] = useState("");
  const { result, isStreaming, error, run } = useAI({ systemPrompt: SYSTEM_PROMPT });

  const handleCompare = () => {
    if (!slugA || !slugB) return;
    const a = configs.find((c) => c.slug === slugA);
    const b = configs.find((c) => c.slug === slugB);
    if (!a || !b) return;

    run([{
      role: "user",
      content: `Compare:\n\n**Config A: ${a.title}**\nFramework: ${a.framework}, Tags: ${a.tags.join(", ")}, Use Cases: ${a.useCases.join(", ")}\nDescription: ${a.description}\n\n**Config B: ${b.title}**\nFramework: ${b.framework}, Tags: ${b.tags.join(", ")}, Use Cases: ${b.useCases.join(", ")}\nDescription: ${b.description}`,
    }]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t("configA")}</label>
          <select value={slugA} onChange={(e) => setSlugA(e.target.value)} className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm outline-none">
            <option value="">{t("select")}</option>
            {configs.map((c) => <option key={c.slug} value={c.slug} disabled={c.slug === slugB}>{c.title} ({c.framework})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t("configB")}</label>
          <select value={slugB} onChange={(e) => setSlugB(e.target.value)} className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm outline-none">
            <option value="">{t("select")}</option>
            {configs.map((c) => <option key={c.slug} value={c.slug} disabled={c.slug === slugA}>{c.title} ({c.framework})</option>)}
          </select>
        </div>
      </div>
      {error && error !== "NO_KEY" && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-500">{error}</div>
      )}
      {error === "NO_KEY" && (
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-sm text-amber-600">{t("needApiKey")}</div>
      )}
      <button
        onClick={handleCompare}
        disabled={!slugA || !slugB || isStreaming}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        <GitCompareArrows size={16} />
        {isStreaming ? t("comparing") : t("compare")}
      </button>
      {result && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">{result}</pre>
        </div>
      )}
    </div>
  );
}
