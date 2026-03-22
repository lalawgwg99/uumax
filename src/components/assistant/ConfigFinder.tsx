"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MessageSquareText, X, Send, Sparkles } from "lucide-react";
import { FREE_MODELS, streamChat } from "@/lib/openrouter";
import type { ChatMessage } from "@/lib/openrouter";
import type { ConfigMeta } from "@/lib/types";

const FINDER_SYSTEM_PROMPT = `You are the uumax Config Finder — a helpful assistant on uumax.pages.dev, an AI Agent Config Marketplace.

Your ONLY job is to help users find the right AI agent configuration. You have access to these configs:

{CONFIGS}

Based on what the user tells you about their tools and projects, recommend 1-3 configs from the list above. For each recommendation:
1. State the config name and link: [Title](/configs/slug)
2. Explain in 1 sentence why it's a good fit
3. If they should combine multiple configs, suggest that

Rules:
- Be concise and friendly
- Always link to configs using markdown: [Config Title](/configs/slug)
- If you're not sure, ask ONE clarifying question
- If nothing matches, suggest they try the Config Generator at /generate
- Respond in the same language the user writes in
- Do NOT make up configs that don't exist in the list above`;

interface ConfigFinderProps {
  configs: ConfigMeta[];
}

export function ConfigFinder({ configs }: ConfigFinderProps) {
  const t = useTranslations("finder");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const systemPrompt = FINDER_SYSTEM_PROMPT.replace(
    "{CONFIGS}",
    configs
      .map((c) => `- ${c.title} (slug: ${c.slug}, framework: ${c.framework}, tags: ${c.tags.join(", ")}, useCases: ${c.useCases.join(", ")})`)
      .join("\n")
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    const apiKey = localStorage.getItem("openrouter-api-key");
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: input.trim() },
        { role: "assistant", content: t("needApiKey") },
      ]);
      setInput("");
      return;
    }

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsStreaming(true);

    const assistantMsg: ChatMessage = { role: "assistant", content: "" };
    setMessages([...updated, assistantMsg]);

    const abort = new AbortController();
    abortRef.current = abort;

    try {
      const model = localStorage.getItem("openrouter-model") || FREE_MODELS[0].id;
      const stream = streamChat(apiKey, model, systemPrompt, updated, abort.signal);
      let full = "";
      for await (const chunk of stream) {
        full += chunk;
        setMessages([...updated, { role: "assistant", content: full }]);
      }
    } catch {
      // ignore errors silently
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [input, isStreaming, messages, systemPrompt, t]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[var(--color-brand)] text-white shadow-lg hover:bg-[var(--color-brand-dark)] transition-all hover:scale-105 flex items-center justify-center"
        title={t("title")}
      >
        <MessageSquareText size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--color-brand)] text-white">
        <Sparkles size={18} />
        <span className="font-semibold flex-1">{t("title")}</span>
        <button onClick={() => { abortRef.current?.abort(); setOpen(false); }} className="p-1 rounded hover:bg-white/20">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.length === 0 && (
          <div className="text-center py-6">
            <Sparkles size={32} className="mx-auto text-[var(--color-brand)] mb-3" />
            <p className="text-sm font-medium mb-1">{t("welcome")}</p>
            <p className="text-xs text-[var(--fg-muted)]">{t("hint")}</p>
            <div className="flex flex-wrap gap-1.5 justify-center mt-3">
              {[t("quick1"), t("quick2"), t("quick3")].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="text-xs px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[var(--color-brand)] text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--fg)]"
              }`}
              dangerouslySetInnerHTML={
                msg.role === "assistant"
                  ? { __html: renderLinks(msg.content || (isStreaming && i === messages.length - 1 ? "..." : "")) }
                  : undefined
              }
            >
              {msg.role === "user" ? msg.content : undefined}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-[var(--border)] p-2">
        <div className="flex gap-1.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder={t("placeholder")}
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm outline-none focus:border-[var(--color-brand)]"
            disabled={isStreaming}
          />
          <button
            onClick={handleSend}
            disabled={isStreaming || !input.trim()}
            className="rounded-lg bg-[var(--color-brand)] px-2.5 py-2 text-white disabled:opacity-50"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function renderLinks(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-[var(--color-brand)] underline hover:no-underline">$1</a>'
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>");
}
