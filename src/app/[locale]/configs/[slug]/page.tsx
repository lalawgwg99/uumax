import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getAllSlugs, getConfigBySlug, getRelatedConfigs } from "@/lib/configs";
import { ConfigCard } from "@/components/configs/ConfigCard";
import { ConfigContent } from "@/components/configs/ConfigContent";
import { CopyButton } from "@/components/ui/CopyButton";
import { TryItButton } from "@/components/chat/TryItButton";
import { Badge } from "@/components/ui/Badge";
import { FRAMEWORK_LABELS, USECASE_LABELS } from "@/lib/types";
import { Giscus } from "@/components/configs/Giscus";
import { LemonSqueezyButton } from "@/components/configs/LemonSqueezyButton";
import { ArrowLeft, Download, Calendar, User, History } from "lucide-react";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import type { ConfigItem } from "@/lib/types";

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getConfigBySlug(slug);
  if (!config) return {};
  return {
    title: config.title,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      images: [{ url: `/og/${slug}.svg`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [`/og/${slug}.svg`] },
  };
}

export default async function ConfigDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const config = getConfigBySlug(slug);
  if (!config) notFound();
  const related = getRelatedConfigs(slug);
  return <ConfigDetailContent config={config} related={related} />;
}

import type { ConfigMeta } from "@/lib/types";

function ConfigDetailContent({ config, related }: { config: ConfigItem; related: ConfigMeta[] }) {
  const t = useTranslations("configs");
  const codeMatch = config.content.match(/```[\w]*\n([\s\S]*?)```/);
  const mainCode = codeMatch ? codeMatch[1].trim() : "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/configs"
        className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        {t("backToConfigs")}
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="brand">{FRAMEWORK_LABELS[config.framework]}</Badge>
          {config.useCases.map((uc) => (
            <Badge key={uc}>{USECASE_LABELS[uc]}</Badge>
          ))}
          {config.pricing === "free" ? (
            <Badge variant="green">Free</Badge>
          ) : (
            <Badge variant="amber">${config.price}</Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
        <p className="text-lg text-[var(--fg-muted)] mb-4">
          {config.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--fg-muted)]">
          <span className="inline-flex items-center gap-1">
            <User size={14} />
            {config.author}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={14} />
            {config.lastUpdated}
          </span>
          <span>v{config.version}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
        {mainCode && <TryItButton systemPrompt={mainCode} />}
        {mainCode && <CopyButton text={mainCode} label={t("copyConfig")} />}
        {mainCode && (
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(mainCode)}`}
            download={config.includes[0] || `${config.slug}.md`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--border)] transition-colors"
          >
            <Download size={14} />
            {t("download")}
          </a>
        )}
        {config.pricing === "premium" && config.purchaseUrl && (
          <LemonSqueezyButton
            purchaseUrl={config.purchaseUrl}
            label={t("purchase", { price: config.price ?? 0 })}
          />
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-8">
        {config.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      {/* How to use - beginner guide */}
      <div className="mb-8 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
        <h3 className="font-semibold mb-3">{t("howToUse")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="flex gap-2">
            <span className="w-6 h-6 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <div>
              <p className="font-medium">{t("step1Title")}</p>
              <p className="text-[var(--fg-muted)]">{t("step1Desc")}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="w-6 h-6 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <div>
              <p className="font-medium">{t("step2Title")}</p>
              <p className="text-[var(--fg-muted)]">{t(`step2${config.framework}`)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="w-6 h-6 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <div>
              <p className="font-medium">{t("step3Title")}</p>
              <p className="text-[var(--fg-muted)]">{t("step3Desc")}</p>
            </div>
          </div>
        </div>
      </div>

      <ConfigContent content={config.content} />

      {/* Version History */}
      {config.changelog && config.changelog.length > 0 && (
        <div className="mt-8 pt-6 border-t border-[var(--border)]">
          <h2 className="text-lg font-semibold mb-3 inline-flex items-center gap-2">
            <History size={18} />
            {t("versionHistory")}
          </h2>
          <div className="space-y-2">
            {config.changelog.map((entry) => (
              <div key={entry.version} className="flex gap-3 text-sm">
                <span className="font-mono text-[var(--color-brand)] shrink-0">v{entry.version}</span>
                <span className="text-[var(--fg-muted)] shrink-0">{entry.date}</span>
                <span className="text-[var(--fg-muted)]">{entry.changes}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments & Ratings */}
      <div className="mt-8 pt-6 border-t border-[var(--border)]">
        <h2 className="text-lg font-semibold mb-3">{t("comments")}</h2>
        <Giscus slug={config.slug} />
      </div>

      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <h2 className="text-xl font-bold mb-4">{t("related")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r) => (
              <ConfigCard key={r.slug} config={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
