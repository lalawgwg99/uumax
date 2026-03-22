import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Zap size={20} className="text-[var(--color-brand)]" />
          <span>uumax</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/configs"
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/submit"
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            Submit
          </Link>
          <a
            href="https://github.com/lalawgwg99/uumax"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
