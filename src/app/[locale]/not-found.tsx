import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-[var(--color-brand)] mb-4">
        {t("title")}
      </h1>
      <p className="text-lg text-[var(--fg-muted)] mb-8">{t("message")}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-brand)] text-white font-medium hover:bg-[var(--color-brand-dark)] transition-colors"
      >
        {t("goHome")}
      </Link>
    </div>
  );
}
