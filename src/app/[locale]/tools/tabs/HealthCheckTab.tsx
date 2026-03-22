"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Stethoscope } from "lucide-react";
import { useAI } from "@/lib/useAI";

const SYSTEM_PROMPT = `You are an AI Agent Config reviewer. The user will paste their configuration file (CLAUDE.md, .cursorrules, system prompt, etc.).

Analyze it and respond with:

## Score: X/100

## Strengths
- (list 2-3 things done well)

## Issues Found
- 🔴 Critical: (things that will cause problems)
- 🟡 Warning: (things that could be better)
- 🟢 Suggestion: (nice-to-have improvements)

## Missing Sections
List any important sections that are missing (e.g., error handling rules, testing strategy, file organization, commit conventions, security rules).

## Improved Version
Provide a brief outline of what an improved version would include.

Be specific, actionable, and constructive. Respond in the same language as the config content.`;

export function HealthCheckTab() {
  const t = useTranslations("healthCheck");
  const [config, setConfig] = useState("");
  const { result, setResult, isStreaming, error, run } = useAI({ systemPrompt: SYSTEM_PROMPT });

  const handleCheck = () => {
    if (!config.trim()) return;
    run([{ role: "user", content: config }]);
  };

  return (
    <div className="space-y-6">
      {!result && (
        <>
          <textarea
            value={config}
            onChange={(e) => setConfig(e.target.value)}
            placeholder={t("placeholder")}
            rows={10}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm font-mono outline-none focus:border-[var(--color-brand)] resize-none"
          />
          {error && error !== "NO_KEY" && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-500">{error}</div>
          )}
          {error === "NO_KEY" && (
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-sm text-amber-600">{t("needApiKey")}</div>
          )}
          <button
            onClick={handleCheck}
            disabled={!config.trim() || isStreaming}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            <Stethoscope size={16} />
            {isStreaming ? t("checking") : t("check")}
          </button>
        </>
      )}
      {result && (
        <div className="space-y-4">
          <button
            onClick={() => { setResult(""); setConfig(""); }}
            className="text-sm text-[var(--color-brand)] hover:underline"
          >
            {t("checkAnother")}
          </button>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">{result}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
