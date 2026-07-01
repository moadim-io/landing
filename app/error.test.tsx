import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ErrorBoundary from "./error";

describe("ErrorBoundary", () => {
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // The boundary logs the caught error via `console.error` for
    // diagnostics on every render — silence that expected noise here and
    // assert on it directly in the dedicated test below.
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it("renders a heading explaining something broke", () => {
    render(<ErrorBoundary error={new Error("boom")} reset={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /something broke/i }),
    ).toBeInTheDocument();
  });

  it("logs the thrown error to the console for diagnostics", () => {
    const error = new Error("boom");

    render(<ErrorBoundary error={error} reset={() => {}} />);

    expect(consoleError).toHaveBeenCalledWith(error);
  });

  it("calls reset() when 'Try again' is clicked", () => {
    const reset = vi.fn();
    render(<ErrorBoundary error={new Error("boom")} reset={reset} />);

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(reset).toHaveBeenCalledOnce();
  });

  it("offers a working link back to the homepage", () => {
    render(<ErrorBoundary error={new Error("boom")} reset={() => {}} />);

    expect(
      screen.getByRole("link", { name: /back to home/i }),
    ).toHaveAttribute("href", "/");
  });
});
