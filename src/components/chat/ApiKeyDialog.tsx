"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, Eye, EyeOff } from "lucide-react";

interface ApiKeyDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
}

export function ApiKeyDialog({ open, onClose, onSave }: ApiKeyDialogProps) {
  const t = useTranslations("tryIt");
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-2xl">
        <h3 className="text-lg font-semibold mb-2">{t("apiKeyTitle")}</h3>
        <p className="text-sm text-[var(--fg-muted)] mb-4">{t("apiKeyDesc")}</p>

        <div className="relative mb-3">
          <input
            type={show ? "text" : "password"}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-or-..."
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2 pr-10 text-sm outline-none focus:border-[var(--color-brand)]"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && key.trim()) onSave(key.trim());
            }}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--fg-muted)] hover:text-[var(--fg)]"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <a
          href="https://openrouter.ai/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-brand)] hover:underline mb-4"
        >
          {t("getKey")} <ExternalLink size={12} />
        </a>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors"
          >
            {t("cancel")}
          </button>
          <button
            onClick={() => key.trim() && onSave(key.trim())}
            disabled={!key.trim()}
            className="px-3 py-1.5 text-sm rounded-lg bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-50"
          >
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}
