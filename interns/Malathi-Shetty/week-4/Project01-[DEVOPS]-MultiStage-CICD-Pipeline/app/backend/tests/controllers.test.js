jest.mock("../src/services/health.service");
jest.mock("../src/services/recipe.service");

const healthService = require("../src/services/health.service");
const recipeService = require("../src/services/recipe.service");

const healthController = require("../src/controllers/health.controller");
const recipeController = require("../src/controllers/recipe.controller");

describe("Health Controller", () => {
  test("should return health response", () => {
    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockHealth = {
      status: "UP",
      application: "FlavorForge",
    };

    healthService.getHealthStatus.mockReturnValue(mockHealth);

    healthController.getHealth(req, res);

    expect(healthService.getHealthStatus).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockHealth);
  });
});

describe("Recipe Controller", () => {
  test("should return recipe response", () => {
    const req = {};

    const res = {
      json: jest.fn(),
    };

    const recipes = [
      {
        id: 1,
        name: "Pizza",
      },
    ];

    recipeService.getRecipes.mockReturnValue(recipes);

    recipeController.getRecipes(req, res);

    expect(recipeService.getRecipes).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      count: 1,
      data: recipes,
    });
  });
});