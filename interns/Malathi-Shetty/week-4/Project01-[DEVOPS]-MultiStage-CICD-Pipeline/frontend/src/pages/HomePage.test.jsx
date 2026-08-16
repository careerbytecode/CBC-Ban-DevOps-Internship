import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import HomePage from "./HomePage";
import { getHealthStatus } from "../services/healthService";

vi.mock("../services/healthService", () => ({
  getHealthStatus: vi.fn(),
}));

vi.mock("../components/Hero/Hero", () => ({
  default: () => <div>Hero Component</div>,
}));

vi.mock("../components/Features/Features", () => ({
  default: () => <div>Features Component</div>,
}));

vi.mock("../components/RecipeList/RecipeList", () => ({
  default: () => <div>Recipe List Component</div>,
}));

vi.mock("../components/BackendStatus/BackendStatus", () => ({
  default: ({ health, error }) => (
    <div>
      BackendStatus
      {health && <span>{health.status}</span>}
      {error && <span>{error}</span>}
    </div>
  ),
}));

describe("HomePage", () => {
  test("loads backend health successfully", async () => {
    getHealthStatus.mockResolvedValue({
      status: "UP",
    });

    render(<HomePage />);

    expect(screen.getByText("Hero Component")).toBeInTheDocument();
    expect(screen.getByText("Features Component")).toBeInTheDocument();
    expect(screen.getByText("Recipe List Component")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("UP")).toBeInTheDocument();
    });
  });
});