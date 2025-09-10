import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["**/node_modules/**"],
    globalSetup: ["./testing/global-teardown.ts"],
    clearMocks: true,
    testTimeout: 10_000,
    environment: "node",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      v1: path.resolve(__dirname, "./src/v1"),
      testing: path.resolve(__dirname, "./testing"),
    },
  },
});
