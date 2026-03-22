"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FRAMEWORK_LABELS, USECASE_LABELS } from "@/lib/types";
import type { Framework, UseCase } from "@/lib/types";

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
  "writing",
  "security",
];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFramework = searchParams.get("framework") || "";
  const activeUseCase = searchParams.get("useCase") || "";

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/configs?${params.toString()}`);
  };

  return (
    <div className="space-y-3 mb-8">
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-medium text-[var(--fg-muted)] self-center mr-1">
          Framework:
        </span>
        {FRAMEWORKS.map((fw) => (
          <button
            key={fw}
            onClick={() => setFilter("framework", fw)}
            className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
              activeFramework === fw
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
          Use Case:
        </span>
        {USE_CASES.map((uc) => (
          <button
            key={uc}
            onClick={() => setFilter("useCase", uc)}
            className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
              activeUseCase === uc
                ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--fg-muted)]"
            }`}
          >
            {USECASE_LABELS[uc]}
          </button>
        ))}
      </div>
    </div>
  );
}
