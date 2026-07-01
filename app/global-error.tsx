"use client";

// Last-resort error boundary: only renders if an error escapes even the root
// layout (app/layout.tsx) itself. Next.js requires this file to declare its
// own <html>/<body> tags — while active it *replaces* the root layout rather
// than rendering inside it, since the layout is what just failed. Kept
// deliberately plain (inline styles, no Tailwind/font setup) so it can't
// depend on anything the failed render chain might have broken.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "2rem",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: 900, margin: 0 }}>
          Something went wrong.
        </h1>
        <p style={{ maxWidth: "32rem", fontSize: "1.125rem", margin: 0 }}>
          Moadim hit an unexpected error. Try reloading the page.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            border: "4px solid #000",
            background: "#ffd400",
            padding: "1rem 2rem",
            fontWeight: 900,
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
