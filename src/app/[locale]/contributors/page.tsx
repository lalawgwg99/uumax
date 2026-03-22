import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getAllConfigs } from "@/lib/configs";
import { ArrowLeft, Github, Package } from "lucide-react";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Contributors — uumax",
};

interface Contributor {
  name: string;
  github?: string;
  configCount: number;
  configs: string[];
}

function getContributors(): Contributor[] {
  const configs = getAllConfigs();
  const map = new Map<string, Contributor>();

  for (const c of configs) {
    const key = c.author;
    const existing = map.get(key);
    if (existing) {
      existing.configCount++;
      existing.configs.push(c.title);
    } else {
      map.set(key, {
        name: c.author,
        github: c.authorGithub,
        configCount: 1,
        configs: [c.title],
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => b.configCount - a.configCount);
}

export default async function ContributorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const contributors = getContributors();
  return <ContributorsContent contributors={contributors} />;
}

function ContributorsContent({ contributors }: { contributors: Contributor[] }) {
  const t = useTranslations("contributors");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        {t("backHome")}
      </Link>

      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-[var(--fg-muted)] mb-8">{t("subtitle")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributors.map((c) => (
          <div
            key={c.name}
            className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              {c.github ? (
                <img
                  src={`https://github.com/${c.github}.png?size=48`}
                  alt={c.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--fg-muted)]">
                  {c.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                {c.github && (
                  <a
                    href={`https://github.com/${c.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[var(--fg-muted)] hover:text-[var(--color-brand)]"
                  >
                    <Github size={12} />
                    @{c.github}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-[var(--fg-muted)]">
              <Package size={14} />
              {t("configCount", { count: c.configCount })}
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {c.configs.slice(0, 4).map((title) => (
                <span
                  key={title}
                  className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[var(--fg-muted)]"
                >
                  {title}
                </span>
              ))}
              {c.configs.length > 4 && (
                <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[var(--fg-muted)]">
                  +{c.configs.length - 4}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
