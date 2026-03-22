const VARIANT_STYLES: Record<string, string> = {
  default: "bg-[var(--bg-secondary)] text-[var(--fg-muted)] border border-[var(--border)]",
  brand: "bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/20",
  green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: keyof typeof VARIANT_STYLES;
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${VARIANT_STYLES[variant]}`}
    >
      {children}
    </span>
  );
}
