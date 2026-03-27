import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getFeaturedConfigs, getAllConfigs } from "@/lib/configs";
import { ConfigCard } from "@/components/configs/ConfigCard";
import { FRAMEWORK_LABELS, USECASE_LABELS } from "@/lib/types";
import type { Framework, UseCase } from "@/lib/types";
import {
  Zap, Copy, Share2, Layers, ArrowRight, AlertCircle, CheckCircle2,
  Terminal, MousePointer2, MessageSquare, Wind, Bot, Code2,
} from "lucide-react";

const FRAMEWORK_ICON: Record<Framework, React.ElementType> = {
  "claude-code": Terminal,
  cursor: MousePointer2,
  openclaw: MessageSquare,
  windsurf: Wind,
  copilot: Bot,
  continue: Zap,
  aider: Code2,
  generic: Terminal,
};

const FRAMEWORK_COLOR: Record<Framework, string> = {
  "claude-code": "text-orange-500 bg-orange-500/10",
  cursor: "text-blue-500 bg-blue-500/10",
  openclaw: "text-purple-500 bg-purple-500/10",
  windsurf: "text-cyan-500 bg-cyan-500/10",
  copilot: "text-green-500 bg-green-500/10",
  continue: "text-teal-500 bg-teal-500/10",
  aider: "text-rose-500 bg-rose-500/10",
  generic: "text-[var(--fg-muted)] bg-[var(--bg-secondary)]",
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featured = getFeaturedConfigs();
  const allConfigs = getAllConfigs();
  const frameworkCounts = allConfigs.reduce(
    (acc, c) => {
      acc[c.framework] = (acc[c.framework] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return <HomeContent featured={featured} frameworkCounts={frameworkCounts} />;
}

function HomeContent({
  featured,
  frameworkCounts,
}: {
  featured: ReturnType<typeof getFeaturedConfigs>;
  frameworkCounts: Record<string, number>;
}) {
  const t = useTranslations();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand)]/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-brand)]/20 bg-[var(--color-brand)]/5 text-sm text-[var(--color-brand)] mb-6">
            <Zap size={14} />
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            {t("hero.title1")}
            <br />
            <span className="text-[var(--color-brand)]">
              {t("hero.title2")}
            </span>
          </h1>
          <p className="text-lg text-[var(--fg-muted)] max-w-2xl mx-auto mb-8">
            {t("hero.description")}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/configs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-brand)] text-white font-medium hover:bg-[var(--color-brand-dark)] transition-colors"
            >
              {t("hero.browseCta")}
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://github.com/lalawgwg99/uumax"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--fg)] font-medium hover:bg-[var(--bg-secondary)] transition-colors"
            >
              {t("hero.contributeCta")}
            </a>
          </div>
        </div>
      </section>

      {/* What is an AI Agent Config? */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-4">
          {t("whatIs.title")}
        </h2>
        <p className="text-center text-[var(--fg-muted)] max-w-2xl mx-auto mb-8">
          {t("whatIs.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={18} className="text-red-500" />
              <h3 className="font-semibold text-red-500">{t("whatIs.without")}</h3>
            </div>
            <p className="text-sm text-[var(--fg-muted)]">{t("whatIs.withoutDesc")}</p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <h3 className="font-semibold text-emerald-500">{t("whatIs.with")}</h3>
            </div>
            <p className="text-sm text-[var(--fg-muted)]">{t("whatIs.withDesc")}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          {t("howItWorks.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Layers size={24} />,
              title: t("howItWorks.browse"),
              desc: t("howItWorks.browseDesc"),
            },
            {
              icon: <Copy size={24} />,
              title: t("howItWorks.copy"),
              desc: t("howItWorks.copyDesc"),
            },
            {
              icon: <Share2 size={24} />,
              title: t("howItWorks.share"),
              desc: t("howItWorks.shareDesc"),
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
          <h2 className="text-2xl font-bold">{t("featured.title")}</h2>
          <Link
            href="/configs"
            className="text-sm text-[var(--color-brand)] hover:underline inline-flex items-center gap-1"
          >
            {t("featured.viewAll")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((config) => (
            <ConfigCard key={config.slug} config={config} />
          ))}
        </div>
      </section>

      {/* Frameworks */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          {t("frameworks.title")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {(Object.entries(FRAMEWORK_LABELS) as [Framework, string][])
            .filter(([fw]) => fw !== "generic")
            .map(([fw, label]) => {
              const FwIcon = FRAMEWORK_ICON[fw];
              return (
                <Link
                  key={fw}
                  href={`/configs?framework=${fw}`}
                  className="flex flex-col items-center gap-2 p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--color-brand)]/40 transition-all"
                >
                  <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${FRAMEWORK_COLOR[fw]}`}>
                    <FwIcon size={22} />
                  </span>
                  <span className="font-medium text-sm text-center">{label}</span>
                  <span className="text-xs text-[var(--fg-muted)]">
                    {t("frameworks.configs", {
                      count: frameworkCounts[fw] || 0,
                    })}
                  </span>
                </Link>
              );
            })}
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          {t("useCases.title")}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {(Object.entries(USECASE_LABELS) as [UseCase, string][]).map(
            ([uc, label]) => (
              <Link
                key={uc}
                href={`/configs?useCase=${uc}`}
                className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-brand)]/5 transition-all text-sm font-medium"
              >
                {label}
              </Link>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-2xl bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-dark)] p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">{t("cta.title")}</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            {t("cta.description")}
          </p>
          <a
            href="https://github.com/lalawgwg99/uumax"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[var(--color-brand)] font-medium hover:bg-white/90 transition-colors"
          >
            {t("cta.button")}
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
