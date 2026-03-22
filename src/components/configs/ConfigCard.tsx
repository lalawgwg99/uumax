import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { FRAMEWORK_LABELS } from "@/lib/types";
import type { ConfigMeta } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface ConfigCardProps {
  config: ConfigMeta;
}

export function ConfigCard({ config }: ConfigCardProps) {
  return (
    <Link
      href={`/configs/${config.slug}`}
      className="group block rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 hover:border-[var(--color-brand)]/40 transition-all hover:shadow-lg hover:shadow-[var(--color-brand)]/5"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="brand">
            {FRAMEWORK_LABELS[config.framework]}
          </Badge>
          {config.pricing === "premium" && (
            <Badge variant="amber">${config.price}</Badge>
          )}
          {config.pricing === "free" && (
            <Badge variant="green">Free</Badge>
          )}
        </div>
      </div>

      <h3 className="font-semibold text-[var(--fg)] mb-1.5 group-hover:text-[var(--color-brand)] transition-colors">
        {config.title}
      </h3>

      <p className="text-sm text-[var(--fg-muted)] mb-4 line-clamp-2">
        {config.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {config.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
          {config.tags.length > 3 && (
            <Badge>+{config.tags.length - 3}</Badge>
          )}
        </div>
        <ArrowRight
          size={16}
          className="text-[var(--fg-muted)] group-hover:text-[var(--color-brand)] group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </Link>
  );
}
