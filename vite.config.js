import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    watch: {
      usePolling: true, // Forces Vite to check for changes manually
      interval: 100, // Checks every 100ms
    },
  },
});
