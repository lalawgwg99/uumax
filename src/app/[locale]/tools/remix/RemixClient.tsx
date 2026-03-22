"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Shuffle, Copy, Check } from "lucide-react";
import { FREE_MODELS, streamChat } from "@/lib/openrouter";
import type { ConfigMeta } from "@/lib/types";

const REMIX_PROMPT = `You are a config remixer. The user selected a base AI agent configuration and wants to customize it.

Take the original config and modify it according to the user's instructions. Output ONLY the complete modified config in a single markdown code block. Do not explain — just output the remixed config.

Keep the same structure and quality as the original, but adapt it to the user's needs.`;

interface Props {
  configs: ConfigMeta[];
}

export function RemixClient({ configs }: Props) {
  const t = useTranslations("remix");
  const [slug, setSlug] = useState("");
  const [instruction, setInstruction] = useState("");
  const [result, setResult] = useState("");
  const [isRemixing, setIsRemixing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRemix = useCallback(async () => {
    const apiKey = localStorage.getItem("openrouter-api-key");
    if (!apiKey) { setError(t("needApiKey")); return; }
    if (!slug || !instruction.trim()) return;

    setIsRemixing(true);
    setError(null);
    setResult("");

    const config = configs.find((c) => c.slug === slug);
    if (!config) return;

    const prompt = `Base config: "${config.title}" (${config.framework})
Description: ${config.description}
Tags: ${config.tags.join(", ")}

User's customization request: ${instruction}

Generate the remixed config now.`;

    try {
      const model = localStorage.getItem("openrouter-model") || FREE_MODELS[0].id;
      const stream = streamChat(apiKey, model, REMIX_PROMPT, [{ role: "user", content: prompt }]);
      let full = "";
      for await (const chunk of stream) { full += chunk; setResult(full); }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsRemixing(false);
    }
  }, [slug, instruction, configs, t]);

  const handleCopy = async () => {
    const codeMatch = result.match(/```[\w]*\n([\s\S]*?)```/);
    const code = codeMatch ? codeMatch[1].trim() : result;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">{t("baseConfig")}</label>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm outline-none"
        >
          <option value="">{t("select")}</option>
          {configs.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title} ({c.framework})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("customize")}</label>
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder={t("customizePlaceholder")}
          rows={3}
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm outline-none focus:border-[var(--color-brand)] resize-none"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-500">{error}</div>
      )}

      <button
        onClick={handleRemix}
        disabled={!slug || !instruction.trim() || isRemixing}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors disabled:opacity-50"
      >
        <Shuffle size={16} />
        {isRemixing ? t("remixing") : t("remix")}
      </button>

      {result && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              {copied ? t("copied") : t("copy")}
            </button>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4">
            <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">{result}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
