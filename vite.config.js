import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import remix from "vite-plugin-remix";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), remix()],
  server: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://localhost:3003",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    minify: "terser", // Minification for production builds
    sourcemap: true, // Enables source maps for easier debugging
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`, // SCSS variables and mixins
      },
    },
  },
  define: {
    "process.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL), // Environment variable for API URL
  },
});
