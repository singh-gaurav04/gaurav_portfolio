import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("@tanstack/react-query")) return "query";
          if (id.includes("react-router") || id.includes("react-dom") || id.includes("/react/")) return "vendor";
          if (id.includes("lucide-react")) return "icons";
          return undefined;
        },
      },
    },
  },
})
