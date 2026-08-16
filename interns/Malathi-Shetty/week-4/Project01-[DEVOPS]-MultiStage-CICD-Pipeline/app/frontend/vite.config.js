import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    define: {
      __API__: JSON.stringify(env.VITE_API_BASE_URL),
    },

    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.js",

      coverage: {
        provider: "v8",
        reporter: ["text", "lcov", "html"],
      },
    },
  };
});