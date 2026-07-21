import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
// Named `ErrorBoundary` (not `Error`) so it can't shadow the global `Error`
// constructor this file also needs, below.
import ErrorBoundary from "./error";
import { eyebrowPill, statusBody, statusCard, statusCardWrapper } from "./page";

describe("ErrorBoundary", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a heading and logs the caught error", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new Error("boom");

    render(<ErrorBoundary error={error} reset={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /this loop hit a snag/i }),
    ).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(error);
  });

  it("calls reset() when the retry button is clicked", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const reset = vi.fn();

    render(<ErrorBoundary error={new Error("boom")} reset={reset} />);
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(reset).toHaveBeenCalledOnce();
  });

  // Mirrors not-found.test.tsx: assert this reuses the shared panel token
  // instead of a byte-identical copy that could silently drift.
  it("reuses the shared panel surface style instead of a duplicated copy", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(
      <ErrorBoundary error={new Error("boom")} reset={() => {}} />,
    );

    expect(container.querySelector("main")?.className).toBe(statusCard);
  });

  // Same drift risk as the `panel` guard above, for the rest of the "status
  // off-ramp" chrome this page shares with not-found.tsx.
  it("reuses the shared status-card wrapper, eyebrow, and body tokens", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(
      <ErrorBoundary error={new Error("boom")} reset={() => {}} />,
    );

    expect(container.firstElementChild?.className).toBe(statusCardWrapper);
    expect(screen.getByText("Error").className).toBe(eyebrowPill);
    expect(
      screen.getByText(/you can try again/i).className,
    ).toBe(statusBody);
  });
});
