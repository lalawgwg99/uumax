import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, GitPullRequest } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Config",
};

export default async function SubmitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SubmitContent />;
}

function SubmitContent() {
  const t = useTranslations("submit");

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        {t("backHome")}
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-brand)]/10 flex items-center justify-center">
          <GitPullRequest size={20} className="text-[var(--color-brand)]" />
        </div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
      </div>

      <div className="prose max-w-none">
        <p>{t("description")}</p>

        <h2>How to Submit</h2>
        <ol>
          <li>
            Fork the{" "}
            <a href="https://github.com/lalawgwg99/uumax" target="_blank" rel="noopener noreferrer">
              uumax repository
            </a>
          </li>
          <li>
            Create a new <code>.md</code> file in <code>content/configs/&lt;framework&gt;/</code>
          </li>
          <li>Add frontmatter and content (see template below)</li>
          <li>Submit a Pull Request</li>
        </ol>

        <h2>File Template</h2>
        <pre>
          <code>{`---
title: "Your Config Name"
description: "One-line description of what this config does."
author: "your-name"
authorGithub: "your-github-username"
framework: "claude-code"
useCases: ["fullstack"]
tags: ["typescript", "react"]
pricing: "free"
configType: "claude-md"
includes: ["CLAUDE.md"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: false
---

## Overview
Explain what this config does and who it's for.

## The Config
\`\`\`markdown
# Your actual config content here
\`\`\`

## Usage
Steps to use this config.`}</code>
        </pre>

        <h2>Guidelines</h2>
        <ul>
          <li><strong>Quality over quantity</strong> — only submit configs you actually use and have tested</li>
          <li><strong>Be specific</strong> — &quot;React Developer&quot; is too vague</li>
          <li><strong>Include context</strong> — explain why certain rules exist</li>
          <li><strong>No secrets</strong> — never include API keys or credentials</li>
        </ul>

        <h2>Premium Configs</h2>
        <p>
          Set <code>pricing: &quot;premium&quot;</code> and add your payment link.
          You keep 100% of the revenue.
        </p>
      </div>
    </div>
  );
}
