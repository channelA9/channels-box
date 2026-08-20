import { pages } from "vike-cloudflare";
import md from "unplugin-vue-markdown/vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import { execSync } from "node:child_process";
import type { Plugin } from "vite";

/**
 * Vite plugin that generates static JSON from content markdown/YAML
 * after the client build completes. This ensures content data is always
 * available as static assets on Cloudflare Pages, regardless of how
 * the build is invoked (npx vite build, npm run build, etc.)
 */
function generateContentPlugin(): Plugin {
  return {
    name: "generate-content",
    buildStart() {
      // Run at build start so the generated JSON files in public/data/
      // are picked up by Vite as static assets
      console.log("\n📦 Generating static content data...");
      try {
        execSync("node scripts/generate-content.mjs", {
          stdio: "inherit",
          cwd: process.cwd(),
        });
      } catch (e) {
        console.error("⚠️ Content generation failed, but build continues:", e);
      }
    },
  };
}

export default defineConfig({
  plugins: [
    vike(),
    devServer({
      entry: "hono-entry.ts",

      exclude: [
        /^\/@.+$/,
        /.*\.(ts|tsx|vue)($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /^\/favicon\.ico$/,
        /.*\.(svg|png|webp|jpg|jpeg|gif|ico)($|\?)/,
        /^\/(public|assets|static)\/.+/,
        /^\/data\/.+/,
        /^\/icons\/.+/,
        /^\/photos\/.+/,
        /^\/mika\/.+/,
        /^\/node_modules\/.*/,
      ],

      injectClientScript: false,
    }),
    tailwindcss(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    md({}),
    pages({
      server: {
        kind: "hono",
        entry: "hono-entry.ts",
      },
    }),
    generateContentPlugin(),
  ],
  build: {
    target: "es2022",
  },
});
