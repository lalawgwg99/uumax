"use client";

import { useEffect } from "react";
import { ExternalLink } from "lucide-react";

interface LemonSqueezyButtonProps {
  purchaseUrl: string;
  label: string;
}

export function LemonSqueezyButton({ purchaseUrl, label }: LemonSqueezyButtonProps) {
  useEffect(() => {
    // Load LemonSqueezy affiliate JS for overlay checkout
    if (document.getElementById("lemonsqueezy-js")) return;
    const script = document.createElement("script");
    script.id = "lemonsqueezy-js";
    script.src = "https://assets.lemonsqueezy.com/lemon.js";
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return (
    <a
      href={purchaseUrl}
      className="lemonsqueezy-button inline-flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)] transition-colors"
    >
      <ExternalLink size={14} />
      {label}
    </a>
  );
}
