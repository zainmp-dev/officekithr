import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import {
  FLOWPILOT_BLOG_API_URL,
  FLOWPILOT_BLOG_DEV_PROXY,
} from "./src/lib/flowpilot-blog-api";

/** Load built CSS asynchronously so it does not block first paint. */
function asyncCssPlugin(): Plugin {
  return {
    name: "async-css",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html.replace(
          /<link rel="stylesheet"(?: crossorigin)? href="(\/assets\/[^"]+\.css)">/g,
          (_match, href) =>
            `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all';this.onload=null">` +
            `<noscript><link rel="stylesheet" href="${href}"></noscript>`
        );
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const blogApiKey = env.VITE_BLOG_API_KEY?.trim();

  return {
  server: {
    host: "::",
    port: 8085,
    proxy: {
      [FLOWPILOT_BLOG_DEV_PROXY]: {
        target: new URL(FLOWPILOT_BLOG_API_URL).origin,
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            new RegExp(`^${FLOWPILOT_BLOG_DEV_PROXY.replace(/\//g, "\\/")}`),
            new URL(FLOWPILOT_BLOG_API_URL).pathname,
          ),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("Content-Type", "application/json");
            if (blogApiKey) {
              proxyReq.setHeader("Authorization", `Bearer ${blogApiKey}`);
            }
          });
        },
      },
    },
  },
  plugins: [react(), asyncCssPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "motion/react": "framer-motion",
      // lottie-web's main entry is UMD; lottie-react expects a default ESM export.
      "lottie-web": path.resolve(
        __dirname,
        "node_modules/lottie-web/build/player/esm/lottie.min.js"
      ),
    },
    dedupe: ["react", "react-dom", "framer-motion"],
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("framer-motion") ||
            id.includes("motion/") ||
            id.includes("motion-dom")
          ) {
            return "motion-vendor";
          }
          if (id.includes("gsap")) return "gsap-vendor";
          if (id.includes("lottie")) return "lottie-vendor";
          if (id.includes("axios")) return "http-vendor";
          if (id.includes("@tanstack/react-query")) return "query-vendor";
          // Keep react-helmet-async in react-vendor — a separate chunk causes a
          // circular import TDZ crash ("Cannot access 'i' before initialization").
          if (id.includes("react-helmet")) return "react-vendor";
          if (
            id.includes("react-dom") ||
            id.includes("react-router") ||
            /[/\\]react[/\\]/.test(id)
          ) {
            return "react-vendor";
          }
          if (id.includes("@radix-ui")) return "ui-vendor";
          if (id.includes("recharts") || id.includes("d3-")) {
            return "charts-vendor";
          }
          if (
            id.includes("lucide-react") ||
            id.includes("@tabler/icons") ||
            id.includes("react-icons")
          ) {
            return "icons-vendor";
          }
          if (id.includes("date-fns") || id.includes("zod")) {
            return "utils-vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
    sourcemap: "hidden",
    modulePreload: {
      polyfill: false,
      resolveDependencies: (_filename, deps) =>
        deps.filter(
          (dep) =>
            !/lottie-vendor|motion-vendor|gsap-vendor|charts-vendor|icons-vendor/.test(
              dep
            )
        ),
    },
    cssMinify: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "lottie-react", "lottie-web"],
  },
  };
});
