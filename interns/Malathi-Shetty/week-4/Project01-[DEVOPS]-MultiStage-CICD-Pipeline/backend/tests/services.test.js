const healthService = require("../src/services/health.service");
const recipeService = require("../src/services/recipe.service");

describe("Health Service", () => {
  test("should return application health information", () => {
    const health = healthService.getHealthStatus();

    expect(health).toMatchObject({
      status: "UP",
      application: expect.any(String),
      version: expect.any(String),
      build: expect.any(String),
      environment: expect.any(String),
      port: expect.anything(),
      corsOrigin: expect.any(String),
    });

    expect(new Date(health.timestamp).toISOString()).toBe(health.timestamp);
  });
});

describe("Recipe Service", () => {
  test("should return recipe list", () => {
    const recipes = recipeService.getRecipes();

    expect(Array.isArray(recipes)).toBe(true);
    expect(recipes.length).toBeGreaterThan(0);

    recipes.forEach((recipe) => {
      expect(recipe).toHaveProperty("id");
      expect(recipe).toHaveProperty("name");
      expect(recipe).toHaveProperty("category");
      expect(recipe).toHaveProperty("difficulty");
      expect(recipe).toHaveProperty("cookTime");
      expect(recipe).toHaveProperty("image");
    });
  });

  test("recipe ids should be unique", () => {
    const recipes = recipeService.getRecipes();

    const ids = recipes.map((r) => r.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});