const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const recipeRoutes = require("./routes/recipe.routes");

const config = require("./config/app.config");

const app = express();
app.disable("x-powered-by");
app.use(
  cors({
    origin: config.corsOrigin,
  })
);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/recipes", recipeRoutes);

module.exports = app;