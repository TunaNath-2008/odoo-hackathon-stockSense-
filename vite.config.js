import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The requested project structure uses .js files that contain JSX
// (e.g. src/pages/Dashboard.js). Vite's esbuild transform only treats
// .jsx/.tsx as JSX by default, so we widen the loader for .js files
// and make sure dependency pre-bundling does the same.
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
});