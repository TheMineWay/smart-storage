import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@connector": path.resolve(__dirname, "src/connector/index.ts"),
      "@warehouse": path.resolve(__dirname, "src/warehouse/index.ts"),
      "@types": path.resolve(__dirname, "src/types/index.ts"),
      "@exceptions": path.resolve(__dirname, "src/exceptions/index.ts"),
    },
  },
  test: {
    exclude: ["node_modules", "dist"],
  },
});
