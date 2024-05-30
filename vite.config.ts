/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { OutgoingHttpHeaders } from "http";
import sitemap from "vite-plugin-sitemap";

const variables = loadEnv("develpoment", process.cwd());
const environment = variables?.VITE_RUNNING_ENV;
const noIndexHeader: OutgoingHttpHeaders = {};

if (environment === "development") {
  noIndexHeader["X-Robots-Tag"] = "noindex";
}

const routes = [
  "/",
];

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  test: {
    include: ["./**/*.test.ts", "./**/*.test.tsx"],
    globals: true,
    setupFiles: './src/tests/setup.ts',
    environment: "jsdom"
  },
  base: command === "build" ? "/static/" : "/",

  plugins: [
    react(),
    svgr(),
    sitemap({
      exclude: ["/404"],
      dynamicRoutes: routes,
    }),
  ],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@shared-components": path.resolve(__dirname, "./src/shared-components"),
      "@shared-components-mui": path.resolve(__dirname, "./src/components-materialUi/shared-components"),
      "@shared-components-antd": path.resolve(__dirname, "./src/components-antd/shared-components"),
      "@apis": path.resolve(__dirname, "./src/api-hooks"),
    },
  },
  server: {
    headers: { ...noIndexHeader },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
