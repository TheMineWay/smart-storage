import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@hooks": path.resolve(__dirname, "src/hooks/index.ts"),
      "@themineway/smart-storage-js": path.resolve(
        __dirname,
        "../smart-storage-js/src/index.ts"
      ),
    },
  },
  test: {
    exclude: ["node_modules", "dist"],
  },
  build: {
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React", // Global variable for React in UMD builds
        },
      },
    },
  },
});
