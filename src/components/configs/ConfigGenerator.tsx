"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Wand2, Copy, Check, ChevronRight } from "lucide-react";
import { FREE_MODELS, streamChat, getApiKey, consumeFreeTier } from "@/lib/openrouter";
import type { Framework } from "@/lib/types";
import { FRAMEWORK_LABELS } from "@/lib/types";

const FRAMEWORKS: Framework[] = ["claude-code", "cursor", "openclaw", "windsurf", "generic"];

const GENERATOR_SYSTEM_PROMPT = `You are an expert AI agent configuration generator. Given a user's requirements, generate a complete, production-ready agent configuration file.

Output format:
1. Start with a brief title and description
2. Output the full configuration in a markdown code block
3. The config should be detailed, specific, and immediately usable
4. Include clear sections: role, rules, conventions, tools, workflow
5. Be opinionated — good defaults matter more than flexibility

Always respond in the same language the user writes in.`;


export function ConfigGenerator() {
  const t = useTranslations("generator");
  const [framework, setFramework] = useState<Framework>("claude-code");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"input" | "result">("input");

  const handleGenerate = useCallback(async () => {
    const auth = getApiKey();
    if (!auth) {
      setError(t("needApiKey"));
      return;
    }
    if (!description.trim()) return;

    setIsGenerating(true);
    setError(null);
    setResult("");
    setStep("result");

    const prompt = `Generate a ${FRAMEWORK_LABELS[framework]} agent configuration for: ${description}

Framework: ${framework}
Config file format: ${framework === "claude-code" ? "CLAUDE.md" : framework === "cursor" ? ".cursorrules" : framework === "openclaw" ? "AGENTS.md" : framework === "windsurf" ? ".windsurfrules" : "system prompt"}`;

    try {
      const model = localStorage.getItem("openrouter-model") || FREE_MODELS[0].id;
      const stream = streamChat(auth.key, model, GENERATOR_SYSTEM_PROMPT, [
        { role: "user", content: prompt },
      ]);
      let full = "";
      for await (const chunk of stream) {
        full += chunk;
        setResult(full);
      }
      if (auth.isFreeTier) consumeFreeTier();
    } catch (e: unknown) {
      if (e instanceof Error && e.message === "INVALID_KEY") {
        localStorage.removeItem("openrouter-api-key");
        setError(t("invalidKey"));
      } else {
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    } finally {
      setIsGenerating(false);
    }
  }, [framework, description, t]);

  const handleCopy = async () => {
    const codeMatch = result.match(/```[\w]*\n([\s\S]*?)```/);
    const code = codeMatch ? codeMatch[1].trim() : result;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {step === "input" ? (
        <div className="space-y-6">
          {/* Framework selection */}
          <div>
            <label className="block text-sm font-medium mb-2">{t("framework")}</label>
            <div className="flex flex-wrap gap-2">
              {FRAMEWORKS.map((fw) => (
                <button
                  key={fw}
                  onClick={() => setFramework(fw)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    framework === fw
                      ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                      : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--fg-muted)]"
                  }`}
                >
                  {FRAMEWORK_LABELS[fw]}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">{t("describe")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("describePlaceholder")}
              rows={4}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-brand)] resize-none"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!description.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-brand)] text-white font-medium hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-50"
          >
            <Wand2 size={16} />
            {t("generate")}
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep("input")}
              className="text-sm text-[var(--color-brand)] hover:underline"
            >
              {t("back")}
            </button>
            <div className="flex gap-2">
              {result && !isGenerating && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  {copied ? t("copied") : t("copy")}
                </button>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 min-h-[300px]">
            {isGenerating && !result && (
              <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                <div className="w-4 h-4 border-2 border-[var(--color-brand)] border-t-transparent rounded-full animate-spin" />
                {t("generating")}
              </div>
            )}
            <pre className="whitespace-pre-wrap text-sm leading-relaxed">{result}</pre>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-500">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
