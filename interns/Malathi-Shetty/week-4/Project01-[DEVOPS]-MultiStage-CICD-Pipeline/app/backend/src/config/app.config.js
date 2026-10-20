require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  appName: process.env.APP_NAME || "FlavorForge Backend",
  appVersion: process.env.APP_VERSION || "development",
  buildVersion: process.env.BUILD_VERSION || "local",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
};