"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";
import { ChatPanel } from "./ChatPanel";

interface TryItButtonProps {
  systemPrompt: string;
}

export function TryItButton({ systemPrompt }: TryItButtonProps) {
  const t = useTranslations("tryIt");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)] transition-colors"
      >
        <MessageSquare size={14} />
        {t("button")}
      </button>
      <ChatPanel
        open={open}
        onClose={() => setOpen(false)}
        systemPrompt={systemPrompt}
      />
    </>
  );
}
