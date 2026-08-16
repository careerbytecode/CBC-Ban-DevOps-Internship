import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ErrorBoundary from "./ErrorBoundary";

function BrokenComponent() {
  throw new Error("Boom!");
}

describe("ErrorBoundary", () => {
  test("renders children normally", () => {
    render(
      <ErrorBoundary>
        <h1>Hello FlavorForge</h1>
      </ErrorBoundary>
    );

    expect(screen.getByText("Hello FlavorForge")).toBeInTheDocument();
  });

  test("shows fallback UI when a child crashes", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("Something went wrong")
    ).toBeInTheDocument();

    expect(
      screen.getByText("An unexpected error occurred.")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /reload page/i })
    ).toBeInTheDocument();

    spy.mockRestore();
  });
});