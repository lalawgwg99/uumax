import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { getAllConfigs } from "@/lib/configs";
import { ToolsClient } from "./ToolsClient";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = { title: "AI Tools — uumax" };

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const configs = getAllConfigs();
  return <ToolsContent configs={configs} />;
}

function ToolsContent({ configs }: { configs: ReturnType<typeof getAllConfigs> }) {
  const t = useTranslations("tools");
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-lg text-[var(--fg-muted)] mb-8">{t("subtitle")}</p>
      <ToolsClient configs={configs} />
    </div>
  );
}
