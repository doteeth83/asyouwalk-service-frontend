import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react()],
    define: {
      "process.env": {
        VITE_APP_REST_API_KEY: env.VITE_APP_REST_API_KEY,
        VITE_APP_REDIRECT_URI: env.VITE_APP_REDIRECT_URI,
      },
    },
  };
});
