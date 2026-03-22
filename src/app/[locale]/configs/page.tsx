import { setRequestLocale } from "next-intl/server";
import { getAllConfigs } from "@/lib/configs";
import { ConfigsClient } from "./ConfigsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Configs",
};

export default async function ConfigsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const configs = getAllConfigs();
  return <ConfigsClient configs={configs} />;
}
