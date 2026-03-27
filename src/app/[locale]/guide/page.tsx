import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const toolTableData = [
  { tool: "Claude Code", file: "CLAUDE.md", location: "Project root" },
  { tool: "Cursor", file: ".cursorrules", location: "Project root" },
  { tool: "Windsurf", file: ".windsurfrules", location: "Project root" },
  { tool: "GitHub Copilot", file: "copilot-instructions.md", location: ".github/" },
  { tool: "Continue.dev", file: "config.yaml", location: "~/.continue/" },
  { tool: "Aider", file: ".aider.conf.yml", location: "Project root" },
  { tool: "Google Antigravity", file: ".antigravity-rules", location: "Project root" },
];

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "guide" });

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Back to home (top) */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors mb-10"
        >
          ← {t("backHome")}
        </Link>

        {/* Hero */}
        <h1 className="text-4xl font-bold mb-3">{t("title")}</h1>
        <p className="text-lg text-[var(--fg-muted)] mb-14">{t("subtitle")}</p>

        {/* What is uumax */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">{t("whatTitle")}</h2>
          <p className="text-[var(--fg-muted)] leading-relaxed">{t("whatDesc")}</p>
        </section>

        {/* Quick Start — 3 steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
          <div className="space-y-4">
            {(
              [
                { title: t("step1Title"), desc: t("step1Desc") },
                { title: t("step2Title"), desc: t("step2Desc") },
                { title: t("step3Title"), desc: t("step3Desc") },
              ] as { title: string; desc: string }[]
            ).map((step, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-lg border border-[var(--border)]"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-[var(--fg-muted)]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tool Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t("toolTableTitle")}</h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 font-semibold">{t("toolTableTool")}</th>
                  <th className="text-left px-4 py-3 font-semibold">{t("toolTableFile")}</th>
                  <th className="text-left px-4 py-3 font-semibold">{t("toolTableWhere")}</th>
                </tr>
              </thead>
              <tbody>
                {toolTableData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">{row.tool}</td>
                    <td className="px-4 py-3 font-mono text-[var(--color-brand)]">{row.file}</td>
                    <td className="px-4 py-3 text-[var(--fg-muted)]">{row.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* AI Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">{t("aiToolsTitle")}</h2>
          <p className="text-[var(--fg-muted)] mb-6">{t("aiToolsDesc")}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {(
              [
                { title: t("generatorTitle"), desc: t("generatorDesc"), href: "/generate" },
                { title: t("remixTitle"), desc: t("remixDesc"), href: "/tools/remix" },
                { title: t("healthTitle"), desc: t("healthDesc"), href: "/tools/health-check" },
                { title: t("compareTitle"), desc: t("compareDesc"), href: "/tools/compare" },
              ] as { title: string; desc: string; href: string }[]
            ).map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="p-4 rounded-lg border border-[var(--border)] hover:border-[var(--color-brand)] transition-colors group"
              >
                <h3 className="font-semibold mb-1 group-hover:text-[var(--color-brand)] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-[var(--fg-muted)]">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Skills (MCP) */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">{t("skillsTitle")}</h2>
          <p className="text-[var(--fg-muted)] mb-5 leading-relaxed">{t("skillsDesc")}</p>
          <ol className="space-y-3">
            {([t("skillsStep1"), t("skillsStep2"), t("skillsStep3")] as string[]).map(
              (step, i) => (
                <li key={i} className="flex gap-3 text-sm text-[var(--fg-muted)]">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-[var(--border)] flex items-center justify-center text-xs font-bold text-[var(--fg)]">
                    {i + 1}
                  </span>
                  {step}
                </li>
              )
            )}
          </ol>
        </section>

        {/* API Key */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">{t("apiKeyTitle")}</h2>
          <p className="text-[var(--fg-muted)] leading-relaxed">{t("apiKeyDesc")}</p>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-6">{t("faqTitle")}</h2>
          <div className="space-y-4">
            {(
              [
                { q: t("faq1Q"), a: t("faq1A") },
                { q: t("faq2Q"), a: t("faq2A") },
                { q: t("faq3Q"), a: t("faq3A") },
                { q: t("faq4Q"), a: t("faq4A") },
                { q: t("faq5Q"), a: t("faq5A") },
              ] as { q: string; a: string }[]
            ).map((faq, i) => (
              <div
                key={i}
                className="border border-[var(--border)] rounded-lg p-4"
              >
                <p className="font-semibold mb-2">{faq.q}</p>
                <p className="text-sm text-[var(--fg-muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Back to home (bottom) */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
        >
          ← {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
