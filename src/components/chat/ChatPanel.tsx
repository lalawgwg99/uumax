"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { X, Send, Settings, Trash2 } from "lucide-react";
import { ApiKeyDialog } from "./ApiKeyDialog";
import { FREE_MODELS, streamChat, getApiKey, consumeFreeTier } from "@/lib/openrouter";
import type { ChatMessage } from "@/lib/openrouter";

const STORAGE_KEY = "openrouter-api-key";
const MODEL_KEY = "openrouter-model";

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  systemPrompt: string;
}

export function ChatPanel({ open, onClose, systemPrompt }: ChatPanelProps) {
  const t = useTranslations("tryIt");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const [model, setModel] = useState(FREE_MODELS[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const auth = getApiKey();
    if (auth) {
      setApiKey(auth.key);
    } else {
      setShowKeyDialog(true);
    }
    const storedModel = localStorage.getItem(MODEL_KEY);
    if (storedModel && FREE_MODELS.some((m) => m.id === storedModel)) {
      setModel(storedModel);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const handleSaveKey = (key: string) => {
    localStorage.setItem(STORAGE_KEY, key);
    setApiKey(key);
    setShowKeyDialog(false);
    setError(null);
  };

  const handleModelChange = (id: string) => {
    setModel(id);
    localStorage.setItem(MODEL_KEY, id);
  };

  const handleSend = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    // Re-check auth at send time (free tier may have been exhausted)
    const auth = getApiKey();
    if (!auth) {
      setShowKeyDialog(true);
      return;
    }

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsStreaming(true);
    setError(null);

    const assistantMsg: ChatMessage = { role: "assistant", content: "" };
    setMessages([...updated, assistantMsg]);

    const abort = new AbortController();
    abortRef.current = abort;

    try {
      const stream = streamChat(auth.key, model, systemPrompt, updated, abort.signal);
      let full = "";
      for await (const chunk of stream) {
        full += chunk;
        setMessages([...updated, { role: "assistant", content: full }]);
      }
      if (auth.isFreeTier) consumeFreeTier();
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") return;
      if (e instanceof Error && e.message === "INVALID_KEY") {
        localStorage.removeItem(STORAGE_KEY);
        setApiKey(null);
        setShowKeyDialog(true);
        setError(null);
      } else {
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [input, isStreaming, messages, model, systemPrompt]);

  const handleClose = () => {
    abortRef.current?.abort();
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={handleClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[450px] flex flex-col border-l border-[var(--border)] bg-[var(--bg)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
          <select
            value={model}
            onChange={(e) => handleModelChange(e.target.value)}
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-2 py-1 text-sm outline-none"
          >
            {FREE_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowKeyDialog(true)}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            title={t("changeKey")}
          >
            <Settings size={16} />
          </button>
          <button
            onClick={() => { setMessages([]); setError(null); }}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            title={t("clearChat")}
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <p className="text-center text-sm text-[var(--fg-muted)] mt-8">
              {t("placeholder")}
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-[var(--color-brand)] text-white"
                    : "bg-[var(--bg-secondary)] text-[var(--fg)]"
                }`}
              >
                {msg.content || (isStreaming && i === messages.length - 1 ? t("thinking") : "")}
              </div>
            </div>
          ))}
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-500">
              {error}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-[var(--border)] p-3">
          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t("placeholder")}
              rows={1}
              className="flex-1 resize-none rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 text-sm outline-none focus:border-[var(--color-brand)]"
              disabled={isStreaming}
            />
            <button
              onClick={handleSend}
              disabled={isStreaming || !input.trim()}
              className="rounded-lg bg-[var(--color-brand)] px-3 py-2 text-white hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <ApiKeyDialog
        open={showKeyDialog}
        onClose={() => {
          setShowKeyDialog(false);
          if (!apiKey) handleClose();
        }}
        onSave={handleSaveKey}
      />
    </>
  );
}
