import { ExternalLink } from "./ExternalLink";
import { JsonLdScript } from "./JsonLdScript";
import { CRATE_NAME, CRATE_URL, REPO_URL } from "./site";

const features = [
  {
    tag: "01",
    title: "A loop runs an agent",
    body: "A loop pairs a prompt, a schedule, and an agent — Claude, Codex, or Hermes. Each tick launches it in a fresh, isolated workbench, kills hung runs, and reaps the session when it's done.",
  },
  {
    tag: "02",
    title: "Runs locally, survives reboot",
    body: "Loops fire from your own OS crontab — no hidden queue, no cloud. Run moadim install to register a launchd / systemd service so the daemon keeps running across logins and reboots.",
  },
  {
    tag: "03",
    // Matches the daemon's own "One port. Three interfaces." framing (UI,
    // REST, MCP — see its README and public/llms.txt). "OpenAPI" previously
    // stood in for the third interface here, but OpenAPI is the REST API's
    // doc format, not one of the three interfaces the daemon actually ships
    // — it silently dropped the built-in web UI dashboard from the one piece
    // of on-page copy visitors scan first (see #85).
    title: "UI · REST · MCP",
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

// Pre-install objections, answered on-page. Also emitted as FAQPage
// structured data (below) so search engines can surface them as rich results.
const faqs = [
  {
    q: "Is Moadim free? What's the license?",
    a: "Yes — Moadim is open source under the MIT license, free to use, modify, and self-host. There's no paid tier and no account to create.",
  },
  {
    q: "Is it self-hosted or a cloud service?",
    a: "It runs entirely on your own machine. Loops fire from your OS crontab — no hidden queue, no cloud, no sign-up. Run moadim install to register a launchd (macOS) or systemd (Linux) service so the daemon survives logins and reboots.",
  },
  {
    q: "Which agents does it support?",
    a: "Claude, Codex, and Hermes today. Each loop names the agent it runs, and Moadim launches it for you on every tick.",
  },
  {
    q: "Which operating systems are supported?",
    a: "macOS and Linux. Loops are scheduled through the OS crontab and run inside tmux; running moadim install registers a launchd (macOS) or systemd (Linux) service that keeps the daemon alive across reboots. Both crontab and tmux need to be on your PATH, or the install succeeds but nothing runs.",
  },
  {
    q: "How is each run isolated?",
    a: "Every tick launches the agent in a fresh, isolated workbench. A watchdog kills hung runs, and the session is reaped once it finishes — so one run can't leak state into the next.",
  },
];

// Exported so tests can assert the FAQPage structured data actually reflects
// the FAQ content rendered on the page, instead of only exercising the
// generic JsonLdScript component in isolation (see page.test.tsx).
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

// Shared neobrutalist CTA button styling — the hard drop shadow plus the
// hover/active translate-and-shadow choreography. Extracted so the two hero
// buttons (and any future ones) can't drift out of sync; each call site adds
// only its own gap and fill color. Exported so `not-found.tsx`'s "Back to
// home" link — which wears the exact same treatment — reuses it instead of
// hand-copying the class string (mirroring the `panel` export below).
export const ctaButton =
  "flex items-center justify-center border-4 border-black px-8 py-4 text-base font-black uppercase tracking-wide shadow-[6px_6px_0_0_#000] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[8px_8px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]";

// Shared neobrutalist panel surface — the 4px black frame, white fill, and
// 10px hard drop shadow worn by the hero header, the feature grid, the
// reading-list section, and the FAQ. Extracted (mirroring `ctaButton`) so the
// panels can't drift apart; each call site appends only its own padding/layout.
// Exported so `not-found.tsx`'s 404 card — which wears the exact same surface —
// reuses it instead of hand-copying the class string (see `faqJsonLd` above
// for the same export-for-reuse precedent).
export const panel = "border-4 border-black bg-white shadow-[10px_10px_0_0_#000]";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10 sm:px-8 sm:py-16">
      <main className="flex w-full max-w-4xl flex-1 flex-col gap-10">
        <header className={`${panel} p-6 sm:p-10`}>
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
            <code className="block font-mono text-base text-white sm:text-lg">
              {/* The shell prompt is decoration: hide it from screen readers and
                  exclude it from text selection so copying the line yields a
                  runnable `cargo install --locked moadim`, not
                  `$ cargo install --locked moadim`. `--locked` installs the
                  crate's tested Cargo.lock dependency set instead of
                  re-resolving to the newest semver-compatible versions. */}
              <span aria-hidden="true" className="select-none text-accent">
                ${" "}
              </span>
              {`cargo install --locked ${CRATE_NAME}`}
            </code>
            <code className="block font-mono text-base text-white sm:text-lg">
              {/* `cargo install` only compiles and installs the binary — nothing
                  runs until `moadim` itself is invoked, so the snippet stopped
                  one command short of a working daemon (#206). Same
                  aria-hidden/select-none prompt trick as the install line above. */}
              <span aria-hidden="true" className="select-none text-accent">
                ${" "}
              </span>
              moadim
            </code>
            <p className="mt-1 text-xs font-medium leading-snug text-white">
              Starts the server in the background at{" "}
              <code className="font-mono text-accent">
                http://localhost:5784/
              </code>
              . Requires a Unix-like OS with{" "}
              <code className="font-mono text-accent">tmux</code> and a cron
              daemon (cron / launchd / systemd) — loops fire from your OS crontab
              inside a tmux session, so without them the install succeeds but
              nothing runs.
            </p>
          </div>
          <ExternalLink
            className={`${ctaButton} group gap-3 bg-accent`}
            href={REPO_URL}
            aria-label="Star moadim on GitHub"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ★
            </span>
            Star on GitHub
          </ExternalLink>
          <ExternalLink
            className={`${ctaButton} gap-2 bg-white`}
            href={CRATE_URL}
            aria-label="crates.io"
          >
            crates.io
            <span aria-hidden="true">↗</span>
          </ExternalLink>
          <ExternalLink
            className="flex items-center justify-center border-4 border-black bg-white p-2 shadow-[6px_6px_0_0_#000]"
            href={CRATE_URL}
            aria-label="Latest published moadim release"
          >
            {/* A static shields.io badge — it renders the current crates.io
                version at request time, so it never needs a build-time fetch
                (and never breaks the build if crates.io is unreachable at
                build time). next/image needs a configured remote loader for
                arbitrary external hosts, which isn't worth wiring up for one
                badge image, so this is a deliberate exception to the
                next/no-img-element rule. See #183. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.shields.io/crates/v/${CRATE_NAME}.svg?label=version`}
              alt="moadim version on crates.io"
              width={104}
              height={20}
            />
          </ExternalLink>
        </div>

        {/* Unlike the reading-list and FAQ sections below, this grid has no
            visible heading of its own — the CTA row above flows straight
            into it. Without an accessible name it's an anonymous <ul>, so
            screen-reader users navigating by landmark region jump from the
            hero straight to "On loop engineering" and never learn a
            "features" region exists. `aria-label` (rather than
            `aria-labelledby` + a visible/sr-only <h2>) fixes that without
            introducing a heading above the per-card <h2> titles, which
            would otherwise sit at the wrong hierarchy level. */}
        <section aria-label="Features">
          {/* Tailwind's Preflight resets `list-style: none` on every <ul>,
              which in Safari/VoiceOver also strips the implicit
              `list`/`listitem` role — a long-documented WebKit quirk
              (https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html).
              `role="list"` restores it in the accessibility tree without
              changing anything visually. jsx-a11y flags this as a
              "redundant" role since <ul> already implies it per the ARIA
              spec — that mapping is correct, WebKit's actual behavior isn't,
              so the rule is disabled for this one, deliberate case. */}
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <ul className={`${panel} grid gap-0 sm:grid-cols-3`} role="list">
            {features.map((feature, i) => (
              <li
                key={feature.title}
                className={`flex flex-col gap-3 p-6 ${
                  i < features.length - 1
                    ? "border-b-4 border-black sm:border-b-0 sm:border-r-4"
                    : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-3xl font-black text-accent [-webkit-text-stroke:1px_#000]"
                >
                  {feature.tag}
                </span>
                <h2 className="text-lg font-black uppercase leading-tight">
                  {feature.title}
                </h2>
                <p className="text-sm font-medium leading-6">{feature.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={panel} aria-labelledby="reads-heading">
          <h2
            id="reads-heading"
            className="border-b-4 border-black bg-black px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-accent"
          >
            On loop engineering
          </h2>
          {/* See the "Features" <ul> above for why `role="list"` (and the
              matching lint disable) is needed. */}
          {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
          <ul className="flex flex-col" role="list">
            {loopEngineeringReads.map((read, i) => (
              <li
                key={read.href}
                className={
                  i < loopEngineeringReads.length - 1
                    ? "border-b-2 border-black/15"
                    : ""
                }
              >
                <ExternalLink
                  className="group flex items-baseline gap-4 px-6 py-4 transition-colors hover:bg-accent"
                  href={read.href}
                  // These are third-party blog posts, not Moadim properties.
                  // Mark them nofollow so the homepage doesn't pass ranking
                  // signal out to them (the GitHub / crates.io CTAs above are
                  // our own canonical destinations and stay dofollow).
                  relExtra="nofollow"
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
                </ExternalLink>
              </li>
            ))}
          </ul>
        </section>

        <section className={panel} aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="border-b-4 border-black bg-black px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-accent"
          >
            FAQ
          </h2>
          <dl className="flex flex-col">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className={`flex flex-col gap-2 px-6 py-5 ${
                  i < faqs.length - 1 ? "border-b-2 border-black/15" : ""
                }`}
              >
                <dt className="text-base font-black uppercase leading-tight">
                  {faq.q}
                </dt>
                <dd className="text-sm font-medium leading-6">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <JsonLdScript data={faqJsonLd} />
    </div>
  );
}
