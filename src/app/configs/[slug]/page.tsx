import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSlugs, getConfigBySlug } from "@/lib/configs";
import { ConfigContent } from "@/components/configs/ConfigContent";
import { CopyButton } from "@/components/ui/CopyButton";
import { Badge } from "@/components/ui/Badge";
import { FRAMEWORK_LABELS, USECASE_LABELS } from "@/lib/types";
import { ArrowLeft, Download, ExternalLink, Calendar, User } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getConfigBySlug(slug);
  if (!config) return {};
  return {
    title: config.title,
    description: config.description,
  };
}

export default async function ConfigDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const config = getConfigBySlug(slug);
  if (!config) notFound();

  // Extract the main code block for copy button
  const codeMatch = config.content.match(/```[\w]*\n([\s\S]*?)```/);
  const mainCode = codeMatch ? codeMatch[1].trim() : "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/configs"
        className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to configs
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="brand">
            {FRAMEWORK_LABELS[config.framework]}
          </Badge>
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

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-8 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
        {mainCode && <CopyButton text={mainCode} label="Copy Config" />}

        {mainCode && (
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(mainCode)}`}
            download={config.includes[0] || `${config.slug}.md`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--border)] transition-colors"
          >
            <Download size={14} />
            Download
          </a>
        )}

        {config.pricing === "premium" && config.purchaseUrl && (
          <a
            href={config.purchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)] transition-colors"
          >
            <ExternalLink size={14} />
            Purchase ${config.price}
          </a>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {config.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      {/* Content */}
      <ConfigContent content={config.content} />
    </div>
  );
}
