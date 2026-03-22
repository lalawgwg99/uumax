import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, GitCompareArrows } from "lucide-react";
import { CompareClient } from "./CompareClient";
import { getAllConfigs } from "@/lib/configs";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = { title: "Compare Configs — uumax" };

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const configs = getAllConfigs();
  return <CompareContent configs={configs} />;
}

function CompareContent({ configs }: { configs: ReturnType<typeof getAllConfigs> }) {
  const t = useTranslations("compare");
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] mb-6 transition-colors">
        <ArrowLeft size={14} /> {t("backHome")}
      </Link>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
          <GitCompareArrows size={20} className="text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
      </div>
      <p className="text-lg text-[var(--fg-muted)] mb-8">{t("subtitle")}</p>
      <CompareClient configs={configs} />
    </div>
  );
}
