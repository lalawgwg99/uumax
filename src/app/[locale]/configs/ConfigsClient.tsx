"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { ConfigMeta, Framework, UseCase } from "@/lib/types";
import { FRAMEWORK_LABELS, USECASE_LABELS } from "@/lib/types";
import { ConfigCard } from "@/components/configs/ConfigCard";

const FRAMEWORKS: Framework[] = [
  "claude-code",
  "cursor",
  "openclaw",
  "windsurf",
];
const USE_CASES: UseCase[] = [
  "frontend",
  "backend",
  "fullstack",
  "devops",
  "data",
  "mobile",
  "writing",
  "security",
];

interface Props {
  configs: ConfigMeta[];
}

export function ConfigsClient({ configs }: Props) {
  const t = useTranslations("configs");
  const [framework, setFramework] = useState<string>("");
  const [useCase, setUseCase] = useState<string>("");
  const [search, setSearch] = useState("");
  const [pricing, setPricing] = useState<string>("");
  const [sort, setSort] = useState<string>("latest");

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fw = params.get("framework");
    const uc = params.get("useCase");
    const q = params.get("q");
    const p = params.get("pricing");
    const s = params.get("sort");
    if (fw) setFramework(fw);
    if (uc) setUseCase(uc);
    if (q) setSearch(q);
    if (p) setPricing(p);
    if (s) setSort(s);
  }, []);

  // Sync state to URL
  const syncUrl = useCallback(
    (fw: string, uc: string, q: string, p?: string, s?: string) => {
      const params = new URLSearchParams();
      if (fw) params.set("framework", fw);
      if (uc) params.set("useCase", uc);
      if (q) params.set("q", q);
      if (p) params.set("pricing", p);
      if (s && s !== "latest") params.set("sort", s);
      const qs = params.toString();
      const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      window.history.replaceState(null, "", url);
    },
    []
  );

  const handleFramework = (fw: string) => {
    const next = framework === fw ? "" : fw;
    setFramework(next);
    syncUrl(next, useCase, search, pricing, sort);
  };

  const handleUseCase = (uc: string) => {
    const next = useCase === uc ? "" : uc;
    setUseCase(next);
    syncUrl(framework, next, search, pricing, sort);
  };

  const handleSearch = (q: string) => {
    setSearch(q);
    syncUrl(framework, useCase, q, pricing, sort);
  };

  let filtered = configs;
  if (framework) {
    filtered = filtered.filter((c) => c.framework === framework);
  }
  if (useCase) {
    filtered = filtered.filter((c) => c.useCases.includes(useCase as UseCase));
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (pricing) {
    filtered = filtered.filter((c) => c.pricing === pricing);
  }
  if (sort === "az") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-[var(--fg-muted)] mb-8">
        {t("count", { count: filtered.length })}
      </p>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder={t("search")}
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--color-brand)]"
        />
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            syncUrl(framework, useCase, search, pricing, e.target.value);
          }}
          className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--fg)] outline-none focus:border-[var(--color-brand)]"
        >
          <option value="latest">{t("sortLatest")}</option>
          <option value="az">{t("sortAZ")}</option>
        </select>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-[var(--fg-muted)] self-center mr-1">
            {t("framework")}
          </span>
          {FRAMEWORKS.map((fw) => (
            <button
              key={fw}
              onClick={() => handleFramework(fw)}
              className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                framework === fw
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                  : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--fg-muted)]"
              }`}
            >
              {FRAMEWORK_LABELS[fw]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-[var(--fg-muted)] self-center mr-1">
            {t("useCase")}
          </span>
          {USE_CASES.map((uc) => (
            <button
              key={uc}
              onClick={() => handleUseCase(uc)}
              className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                useCase === uc
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                  : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--fg-muted)]"
              }`}
            >
              {USECASE_LABELS[uc]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-[var(--fg-muted)] self-center mr-1">
            {t("pricing")}
          </span>
          {["free", "premium"].map((p) => (
            <button
              key={p}
              onClick={() => {
                const next = pricing === p ? "" : p;
                setPricing(next);
                syncUrl(framework, useCase, search, next, sort);
              }}
              className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                pricing === p
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                  : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--fg-muted)]"
              }`}
            >
              {p === "free" ? t("priceFree") : t("pricePremium")}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--fg-muted)]">
          <p>{t("empty")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((config) => (
            <ConfigCard key={config.slug} config={config} />
          ))}
        </div>
      )}
    </div>
  );
}
