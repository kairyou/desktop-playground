import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(async () => ({
  plugins: [
    react({
      // Enable HMR for all React components, including from aliases
      include: ["src/**/*.tsx", "../../packages/**/*.tsx"],
    })
  ],
  clearScreen: false,
  resolve: {
    alias: {
      // Alias shared-ui to source code for hot reload
      "@desktop/shared-ui": resolve(__dirname, "../../packages/shared-ui/src"),
    },
  },
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
      // Watch shared packages for hot reload - use more specific patterns
      include: ["src/**/*", "../../packages/shared-ui/src/**/*"],
    },
    // Force HMR to work with external files
    hmr: {
      overlay: true,
    },
  },
  // Don't pre-bundle workspace packages in dev
  optimizeDeps: {
    exclude: ["@desktop/shared-ui"],
    // Force reload when dependencies change
    force: true,
  },
}))