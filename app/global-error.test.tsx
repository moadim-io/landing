import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import GlobalError from "./global-error";

describe("GlobalError", () => {
  beforeEach(() => {
    // Suppress the expected "cannot nest <html>/<body>" warning: this route
    // is only ever mounted as the actual document root in production, but
    // React Testing Library renders it into a `<div>` inside the existing
    // test document.
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a heading explaining something went wrong", () => {
    render(<GlobalError error={new Error("boom")} reset={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /something went wrong/i }),
    ).toBeInTheDocument();
  });

  it("calls reset() when 'Try again' is clicked", () => {
    const reset = vi.fn();

    render(<GlobalError error={new Error("boom")} reset={reset} />);
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(reset).toHaveBeenCalledOnce();
  });
});
