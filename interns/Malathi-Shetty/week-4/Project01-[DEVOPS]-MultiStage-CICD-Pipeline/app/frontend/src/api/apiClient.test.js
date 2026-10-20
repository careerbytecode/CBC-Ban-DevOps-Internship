import { describe, it, expect, vi, beforeEach } from "vitest";
import apiRequest from "./apiClient";

describe("apiRequest", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns JSON on success", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: {
        get: () => "application/json",
      },
      json: async () => ({ status: "UP" }),
    });

    const result = await apiRequest("/health");

    expect(result.status).toBe("UP");
  });

  it("throws HTTP error", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      headers: {
        get: () => "application/json",
      },
    });

    await expect(apiRequest("/health"))
      .rejects
      .toThrow("HTTP 500");
  });

  it("throws when HTML is returned", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: {
        get: () => "text/html",
      },
      text: async () => "<html></html>",
    });

    await expect(apiRequest("/health"))
      .rejects
      .toThrow("Backend returned HTML instead of JSON");
  });
});