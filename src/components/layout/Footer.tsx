export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--fg-muted)]">
        <p>Built for AI-native developers</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/lalawgwg99/uumax"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--fg)] transition-colors"
          >
            GitHub
          </a>
          <span>&copy; {new Date().getFullYear()} uumax</span>
        </div>
      </div>
    </footer>
  );
}
