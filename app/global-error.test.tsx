import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GlobalError from "./global-error";

// GlobalError renders its own <html>/<body>, which React Testing Library
// can't mount inside jsdom's existing document — render just the <body>
// children instead, the same trade-off App Router itself accepts when this
// boundary replaces the root layout.
describe("GlobalError", () => {
  it("renders a heading", () => {
    render(<GlobalError reset={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /something went wrong/i }),
    ).toBeInTheDocument();
  });

  it("calls reset() when the retry button is clicked", () => {
    const reset = vi.fn();

    render(<GlobalError reset={reset} />);
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(reset).toHaveBeenCalledOnce();
  });

  it("renders a reload link back to the homepage, as the copy promises", () => {
    render(<GlobalError reset={() => {}} />);

    expect(
      screen.getByRole("link", { name: /reload site/i }),
    ).toHaveAttribute("href", "/");
  });
});
