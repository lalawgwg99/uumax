import type { ConfigMeta } from "@/lib/types";
import { ConfigCard } from "./ConfigCard";

interface ConfigGridProps {
  configs: ConfigMeta[];
  emptyMessage?: string;
}

export function ConfigGrid({
  configs,
  emptyMessage = "No configs found.",
}: ConfigGridProps) {
  if (configs.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--fg-muted)]">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {configs.map((config) => (
        <ConfigCard key={config.slug} config={config} />
      ))}
    </div>
  );
}
