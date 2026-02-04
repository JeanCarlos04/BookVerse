import { defineConfig } from "vite";
import { mergeConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(
  mergeConfig(
    {
      plugins: [react(), tailwindcss()],
    },
    {
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTest.ts",
      },
    },
  ),
);
