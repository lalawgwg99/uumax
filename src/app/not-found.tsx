import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-[var(--color-brand)] mb-4">404</h1>
      <p className="text-lg text-[var(--fg-muted)] mb-8">
        This config doesn&apos;t exist yet.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-brand)] text-white font-medium hover:bg-[var(--color-brand-dark)] transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
