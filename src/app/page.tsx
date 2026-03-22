import Link from "next/link";
import { getFeaturedConfigs, getAllConfigs } from "@/lib/configs";
import { ConfigGrid } from "@/components/configs/ConfigGrid";
import { FRAMEWORK_LABELS } from "@/lib/types";
import type { Framework } from "@/lib/types";
import {
  Zap,
  Copy,
  Share2,
  Layers,
  ArrowRight,
} from "lucide-react";

const FRAMEWORK_ICONS: Record<Framework, string> = {
  "claude-code": "CC",
  cursor: "Cu",
  openclaw: "OC",
  windsurf: "WS",
  generic: "Gn",
};

export default function HomePage() {
  const featured = getFeaturedConfigs();
  const allConfigs = getAllConfigs();
  const frameworkCounts = allConfigs.reduce(
    (acc, c) => {
      acc[c.framework] = (acc[c.framework] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand)]/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-sm text-[var(--color-brand)] mb-6">
            <Zap size={14} />
            AI Agent Config Marketplace
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            Stop configuring.
            <br />
            <span className="text-[var(--color-brand)]">Start building.</span>
          </h1>

          <p className="text-lg text-[var(--fg-muted)] max-w-2xl mx-auto mb-8">
            Production-ready configurations for Claude Code, Cursor, OpenClaw,
            and more. Copy, paste, and let your AI agent work the way you want.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/configs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-brand)] text-white font-medium hover:bg-[var(--color-brand-dark)] transition-colors"
            >
              Browse Configs
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/lalawgwg99/uumax"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--fg)] font-medium hover:bg-[var(--bg-secondary)] transition-colors"
            >
              Contribute
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Layers size={24} />,
              title: "Browse",
              desc: "Find configs by framework, use case, or tags. Every config is reviewed for quality.",
            },
            {
              icon: <Copy size={24} />,
              title: "Copy & Paste",
              desc: "One-click copy. Drop it into your project as CLAUDE.md, .cursorrules, or any config file.",
            },
            {
              icon: <Share2 size={24} />,
              title: "Share & Sell",
              desc: "Submit your configs via GitHub PR. Free or premium — you set the price.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="text-center p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)] mb-4">
                {step.icon}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--fg-muted)]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Configs</h2>
          <Link
            href="/configs"
            className="text-sm text-[var(--color-brand)] hover:underline inline-flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <ConfigGrid configs={featured} />
      </section>

      {/* Frameworks */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          Supported Frameworks
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.entries(FRAMEWORK_LABELS) as [Framework, string][])
            .filter(([fw]) => fw !== "generic")
            .map(([fw, label]) => (
              <Link
                key={fw}
                href={`/configs?framework=${fw}`}
                className="flex flex-col items-center gap-2 p-6 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--color-brand)]/40 transition-all"
              >
                <span className="text-2xl font-bold text-[var(--color-brand)]">
                  {FRAMEWORK_ICONS[fw]}
                </span>
                <span className="font-medium">{label}</span>
                <span className="text-xs text-[var(--fg-muted)]">
                  {frameworkCounts[fw] || 0} configs
                </span>
              </Link>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-dark)] p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">
            Got a killer agent config?
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Share it with the community or sell it as a premium config. Your
            expertise, your rules, your revenue.
          </p>
          <a
            href="https://github.com/lalawgwg99/uumax"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[var(--color-brand)] font-medium hover:bg-white/90 transition-colors"
          >
            Submit via GitHub
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
