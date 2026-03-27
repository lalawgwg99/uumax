import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { FRAMEWORK_LABELS } from "@/lib/types";
import type { ConfigMeta, Framework } from "@/lib/types";
import { ArrowRight, Terminal, MousePointer2, MessageSquare, Wind, FileText, Bot, Zap, Code2 } from "lucide-react";

const FRAMEWORK_ICON: Record<Framework, React.ElementType> = {
  "claude-code": Terminal,
  cursor: MousePointer2,
  openclaw: MessageSquare,
  windsurf: Wind,
  copilot: Bot,
  continue: Zap,
  aider: Code2,
  generic: FileText,
};

const FRAMEWORK_ACCENT: Record<Framework, { icon: string; border: string }> = {
  "claude-code": { icon: "text-orange-500 bg-orange-500/10", border: "hover:border-orange-400/50" },
  cursor: { icon: "text-blue-500 bg-blue-500/10", border: "hover:border-blue-400/50" },
  openclaw: { icon: "text-purple-500 bg-purple-500/10", border: "hover:border-purple-400/50" },
  windsurf: { icon: "text-cyan-500 bg-cyan-500/10", border: "hover:border-cyan-400/50" },
  copilot: { icon: "text-green-500 bg-green-500/10", border: "hover:border-green-400/50" },
  continue: { icon: "text-teal-500 bg-teal-500/10", border: "hover:border-teal-400/50" },
  aider: { icon: "text-rose-500 bg-rose-500/10", border: "hover:border-rose-400/50" },
  generic: { icon: "text-[var(--fg-muted)] bg-[var(--bg-secondary)]", border: "hover:border-[var(--color-brand)]/40" },
};

interface ConfigCardProps {
  config: ConfigMeta;
}

export function ConfigCard({ config }: ConfigCardProps) {
  const Icon = FRAMEWORK_ICON[config.framework];
  const accent = FRAMEWORK_ACCENT[config.framework];

  return (
    <Link
      href={`/configs/${config.slug}`}
      className={`group block rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 transition-all hover:shadow-lg hover:shadow-black/5 ${accent.border}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className={`inline-flex p-1.5 rounded-md shrink-0 ${accent.icon}`}>
            <Icon size={14} />
          </span>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="brand">{FRAMEWORK_LABELS[config.framework]}</Badge>
            {config.pricing === "premium" && (
              <Badge variant="amber">${config.price}</Badge>
            )}
            {config.pricing === "free" && <Badge variant="green">Free</Badge>}
          </div>
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
