import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "src/hooks/index.ts"),
      "@providers": path.resolve(__dirname, "src/providers/index.ts"),
      "@types": path.resolve(__dirname, "src/types/index.ts"),
    },
  },
  test: {
    exclude: [],
  },
});
