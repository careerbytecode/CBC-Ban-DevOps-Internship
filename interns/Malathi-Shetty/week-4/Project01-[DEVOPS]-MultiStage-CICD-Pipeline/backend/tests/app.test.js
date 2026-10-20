const request = require("supertest");
const app = require("../src/app");

describe("Health API", () => {
  test("GET /api/health should return application health", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("UP");
    expect(response.body.application).toBeDefined();
    expect(response.body.version).toBeDefined();
    expect(response.body.environment).toBeDefined();
    expect(response.body.timestamp).toBeDefined();
  });
});

describe("Recipe API", () => {
  test("GET /api/recipes should return recipes", async () => {
    const response = await request(app).get("/api/recipes");

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);
    expect(response.body.count).toBeGreaterThan(0);

    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);

    expect(response.body.data[0]).toHaveProperty("id");
    expect(response.body.data[0]).toHaveProperty("name");
    expect(response.body.data[0]).toHaveProperty("category");
    expect(response.body.data[0]).toHaveProperty("difficulty");
  });
});