import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

describe("GET /version.json", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("falls back to \"dev\" for commit, ref, and builtAt when the build env vars are unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_BUILD_COMMIT", undefined);
    vi.stubEnv("NEXT_PUBLIC_BUILD_REF", undefined);
    vi.stubEnv("NEXT_PUBLIC_BUILD_TIME", undefined);

    const response = await GET();

    await expect(response.json()).resolves.toEqual({
      commit: "dev",
      ref: "dev",
      builtAt: "dev",
    });
  });

  it("reports the commit, ref, and builtAt that deploy.yml stamps at build time", async () => {
    vi.stubEnv("NEXT_PUBLIC_BUILD_COMMIT", "abc1234");
    vi.stubEnv("NEXT_PUBLIC_BUILD_REF", "main");
    vi.stubEnv("NEXT_PUBLIC_BUILD_TIME", "2026-07-16T12:00:00Z");

    const response = await GET();

    await expect(response.json()).resolves.toEqual({
      commit: "abc1234",
      ref: "main",
      builtAt: "2026-07-16T12:00:00Z",
    });
  });
});
