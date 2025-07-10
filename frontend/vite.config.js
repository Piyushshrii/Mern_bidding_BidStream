import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/", // 👈 Required for SPA routing to work under root domain
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
