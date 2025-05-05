import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "src/hooks/index.ts"),
    },
  },
  test: {
    exclude: ["node_modules", "dist"],
  },
});
