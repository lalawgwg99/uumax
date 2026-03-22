import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ConfigGenerator } from "@/components/configs/ConfigGenerator";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Generate Config — uumax",
  description: "AI-powered config generator for Claude Code, Cursor, OpenClaw, and more.",
};

export default async function GeneratePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GenerateContent />;
}

function GenerateContent() {
  const t = useTranslations("generator");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        {t("backHome")}
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center">
          <Sparkles size={20} className="text-[var(--color-brand)]" />
        </div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
      </div>
      <p className="text-lg text-[var(--fg-muted)] mb-8">
        {t("subtitle")}
      </p>

      <ConfigGenerator />
    </div>
  );
}
