const links = [
  { label: "GitHub", href: "https://github.com/moadim-io/daemon" },
  { label: "crates.io", href: "https://crates.io/crates/moadim" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-black/[.06] bg-zinc-50 dark:border-white/[.1] dark:bg-black">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 dark:text-zinc-400">
        <p>© 2026 Moadim</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  className="inline-flex items-center gap-1 transition-colors hover:text-zinc-800 dark:hover:text-zinc-200"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
