"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { GitCompareArrows } from "lucide-react";
import { FREE_MODELS, streamChat } from "@/lib/openrouter";
import type { ConfigMeta } from "@/lib/types";

const COMPARE_PROMPT = `You are comparing two AI agent configurations. Analyze both and provide:

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

export function CompareClient({ configs }: Props) {
  const t = useTranslations("compare");
  const [slugA, setSlugA] = useState("");
  const [slugB, setSlugB] = useState("");
  const [result, setResult] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = useCallback(async () => {
    const apiKey = localStorage.getItem("openrouter-api-key");
    if (!apiKey) { setError(t("needApiKey")); return; }
    if (!slugA || !slugB) return;

    setIsComparing(true);
    setError(null);
    setResult("");

    const configA = configs.find((c) => c.slug === slugA);
    const configB = configs.find((c) => c.slug === slugB);
    if (!configA || !configB) return;

    const prompt = `Compare these two configs:

**Config A: ${configA.title}**
Framework: ${configA.framework}, Tags: ${configA.tags.join(", ")}, Use Cases: ${configA.useCases.join(", ")}
Description: ${configA.description}

**Config B: ${configB.title}**
Framework: ${configB.framework}, Tags: ${configB.tags.join(", ")}, Use Cases: ${configB.useCases.join(", ")}
Description: ${configB.description}`;

    try {
      const model = localStorage.getItem("openrouter-model") || FREE_MODELS[0].id;
      const stream = streamChat(apiKey, model, COMPARE_PROMPT, [{ role: "user", content: prompt }]);
      let full = "";
      for await (const chunk of stream) { full += chunk; setResult(full); }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsComparing(false);
    }
  }, [slugA, slugB, configs, t]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t("configA")}</label>
          <select
            value={slugA}
            onChange={(e) => setSlugA(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm outline-none"
          >
            <option value="">{t("select")}</option>
            {configs.map((c) => (
              <option key={c.slug} value={c.slug} disabled={c.slug === slugB}>
                {c.title} ({c.framework})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t("configB")}</label>
          <select
            value={slugB}
            onChange={(e) => setSlugB(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm outline-none"
          >
            <option value="">{t("select")}</option>
            {configs.map((c) => (
              <option key={c.slug} value={c.slug} disabled={c.slug === slugA}>
                {c.title} ({c.framework})
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-500">{error}</div>
      )}

      <button
        onClick={handleCompare}
        disabled={!slugA || !slugB || isComparing}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        <GitCompareArrows size={16} />
        {isComparing ? t("comparing") : t("compare")}
      </button>

      {result && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">{result}</pre>
        </div>
      )}
    </div>
  );
}
