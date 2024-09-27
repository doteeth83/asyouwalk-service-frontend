import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react(), mkcert()],
    https: true, // 로컬 개발 서버에서 HTTPS 사용
    define: {
      "process.env": {
        VITE_APP_REST_API_KEY: env.VITE_APP_REST_API_KEY,
        VITE_APP_REDIRECT_URI: env.VITE_APP_REDIRECT_URI,
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "https://asyouwork.com:8443", // 대상 서버 주소
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""), // 필요에 따라 API 경로 수정
        },
      },
    },
  };
});
