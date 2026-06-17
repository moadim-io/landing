const features = [
  {
    title: "MCP-native",
    body: "Expose cron jobs and routines as tools your AI agents can call directly over the Model Context Protocol.",
  },
  {
    title: "REST + OpenAPI",
    body: "Every operation is also a documented HTTP endpoint, with a Swagger UI baked into the daemon.",
  },
  {
    title: "Real cron, on your machine",
    body: "Schedules run against your OS crontab — no hidden queue, no vendor lock-in, fully open source.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col justify-center gap-12 px-6 py-24 sm:px-10">
        <header className="flex flex-col gap-6">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Open source · MCP &amp; REST
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl dark:text-zinc-50">
            Cron jobs your agents can actually schedule.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Moadim is a single daemon that manages cron jobs and recurring
            routines over both the Model Context Protocol and a REST API — so AI
            agents and developers share one source of truth for what runs, and
            when.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Install
          </span>
          <code className="w-fit rounded-lg border border-black/[.08] bg-white px-4 py-3 font-mono text-sm text-zinc-800 dark:border-white/[.145] dark:bg-zinc-950 dark:text-zinc-200">
            cargo install moadim
          </code>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-200"
            href="https://github.com/moadim-io/daemon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Deploy Now (opens in a new tab)"
          >
            View on GitHub
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-solid border-black/[.08] px-6 text-sm font-medium text-zinc-800 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-200 dark:hover:bg-white/[.06]"
            href="https://crates.io/crates/moadim"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Documentation (opens in a new tab)"
          >
            crates.io
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <section
          aria-labelledby="features-heading"
          className="border-t border-black/[.06] pt-12 dark:border-white/[.1]"
        >
          <h2 id="features-heading" className="sr-only">
            Features
          </h2>
          <ul className="grid gap-8 sm:grid-cols-3">
            {features.map((feature) => (
              <li key={feature.title} className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-black dark:text-zinc-50">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {feature.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
