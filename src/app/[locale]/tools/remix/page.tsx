import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Shuffle } from "lucide-react";
import { RemixClient } from "./RemixClient";
import { getAllConfigs } from "@/lib/configs";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = { title: "Remix Config — uumax" };

export default async function RemixPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const configs = getAllConfigs();
  return <RemixContent configs={configs} />;
}

function RemixContent({ configs }: { configs: ReturnType<typeof getAllConfigs> }) {
  const t = useTranslations("remix");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] mb-6 transition-colors">
        <ArrowLeft size={14} /> {t("backHome")}
      </Link>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <Shuffle size={20} className="text-amber-500" />
        </div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
      </div>
      <p className="text-lg text-[var(--fg-muted)] mb-8">{t("subtitle")}</p>
      <RemixClient configs={configs} />
    </div>
  );
}
