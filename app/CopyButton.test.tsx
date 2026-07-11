import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "./CopyButton";

describe("CopyButton", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("copies the given text and shows transient confirmation", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<CopyButton text="cargo install --locked moadim" />);
    fireEvent.click(
      screen.getByRole("button", { name: "Copy install command" }),
    );

    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith("cargo install --locked moadim"),
    );
    await waitFor(() =>
      expect(screen.getByText("Copied!")).toBeInTheDocument(),
    );
  });

  it("does not throw when the Clipboard API is unavailable", async () => {
    Object.assign(navigator, { clipboard: undefined });

    render(<CopyButton text="cargo install --locked moadim" />);

    expect(() =>
      fireEvent.click(
        screen.getByRole("button", { name: "Copy install command" }),
      ),
    ).not.toThrow();
    await waitFor(() =>
      expect(screen.queryByText("Copied!")).not.toBeInTheDocument(),
    );
  });
});
