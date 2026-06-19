const REPO = "moadim-io/daemon";

const features = [
  {
    tag: "01",
    title: "A loop runs an agent",
    body: "A loop pairs a prompt, a schedule, and an agent — Claude, Codex, or Hermes. Each tick launches it in a fresh, isolated workbench, kills hung runs, and reaps the session when it's done.",
  },
  {
    tag: "02",
    title: "Runs locally, survives reboot",
    body: "Loops fire from your own OS crontab — no hidden queue, no cloud. One install command registers a launchd / systemd service so they keep running across logins and reboots.",
  },
  {
    tag: "03",
    title: "MCP · REST · OpenAPI",
    body: "Every loop is an MCP tool and a documented HTTP endpoint — Swagger UI, an iCal feed, and a web UI baked into the daemon.",
  },
];

const loopEngineeringReads = [
  {
    source: "MindStudio",
    title: "What Is Loop Engineering? The New Meta for AI Coding Agents",
    href: "https://www.mindstudio.ai/blog/what-is-loop-engineering-ai-coding-agents",
  },
  {
    source: "Shaam",
    title: "Why the Best AI Agents in 2026 Are Built as Loops, Not Prompts",
    href: "https://shaam.blog/articles/loop-engineering-ai-agents",
  },
  {
    source: "explainx.ai",
    title: "Loop Engineering: Beyond Prompt Engineering in 2026",
    href: "https://explainx.ai/blog/what-is-loop-engineering-ai-agents-2026",
  },
];

// Shared neobrutalist CTA button styling — the hard drop shadow plus the
// hover/active translate-and-shadow choreography. Extracted so the two hero
// buttons (and any future ones) can't drift out of sync; each call site adds
// only its own gap and fill color.
const ctaButton =
  "flex items-center justify-center border-4 border-black px-8 py-4 text-base font-black uppercase tracking-wide shadow-[6px_6px_0_0_#000] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10 sm:px-8 sm:py-16">
      <main className="flex w-full max-w-4xl flex-1 flex-col gap-10">
        <header className="border-4 border-black bg-white p-6 shadow-[10px_10px_0_0_#000] sm:p-10">
          <p className="mb-6 inline-block border-2 border-black bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
            Open source · Loop engine
          </p>
          <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            Put your
            <br />
            <span className="bg-accent box-decoration-clone px-1">agents</span>{" "}
            on a loop.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-7 sm:text-xl">
            Moadim is a loop engine for AI agents. Define a loop — a prompt, a
            schedule, an agent — and it runs Claude, Codex, or Hermes against
            your repo on every tick, in an isolated workbench, with a watchdog on
            every run. Loop engineering, not prompting by hand.
          </p>
        </header>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
          <div className="flex flex-1 flex-col gap-2 border-4 border-black bg-black p-5 shadow-[6px_6px_0_0_#000]">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Install
            </span>
            <code className="font-mono text-base text-white sm:text-lg">
              <span className="text-accent">$</span> cargo install moadim
            </code>
          </div>
          <a
            className={`${ctaButton} group gap-3 bg-accent`}
            href={`https://github.com/${REPO}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star moadim on GitHub (opens in a new tab)"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ★
            </span>
            Star on GitHub
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <a
            className={`${ctaButton} gap-2 bg-white`}
            href="https://crates.io/crates/moadim"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="crates.io (opens in a new tab)"
          >
            crates.io
            <span aria-hidden="true">↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>

        <section aria-labelledby="features-heading">
          {/* Visually hidden grouping heading: gives the three feature cards a
              labelled parent in the heading outline so they read as an h3 group
              under one h2 — not three unlabelled peer headings — without
              altering the neobrutalist layout. */}
          <h2 id="features-heading" className="sr-only">
            What moadim does
          </h2>
          <ul className="grid gap-0 border-4 border-black bg-white shadow-[10px_10px_0_0_#000] sm:grid-cols-3">
            {features.map((feature, i) => (
              <li
                key={feature.title}
                className={`flex flex-col gap-3 p-6 ${
                  i < features.length - 1
                    ? "border-b-4 border-black sm:border-b-0 sm:border-r-4"
                    : ""
                }`}
              >
                <span className="font-mono text-3xl font-black text-accent [-webkit-text-stroke:1px_#000]">
                  {feature.tag}
                </span>
                <h3 className="text-lg font-black uppercase leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm font-medium leading-6">{feature.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-4 border-black bg-white shadow-[10px_10px_0_0_#000]">
          <h2 className="border-b-4 border-black bg-black px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-accent">
            On loop engineering
          </h2>
          <ul className="flex flex-col">
            {loopEngineeringReads.map((read, i) => (
              <li
                key={read.href}
                className={
                  i < loopEngineeringReads.length - 1
                    ? "border-b-2 border-black/15"
                    : ""
                }
              >
                <a
                  className="group flex items-baseline gap-4 px-6 py-4 transition-colors hover:bg-accent"
                  href={read.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-widest text-black/70 group-hover:text-black">
                    {read.source}
                  </span>
                  <span className="font-medium leading-6">
                    {read.title}
                    <span aria-hidden="true" className="ml-2 font-black">
                      ↗
                    </span>
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
