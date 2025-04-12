import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@connector": path.resolve(__dirname, "src/connector"),
      "@warehouse": path.resolve(__dirname, "src/warehouse"),
    },
  },
  test: {
    exclude: [],
  },
});
