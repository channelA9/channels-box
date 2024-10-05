import vikeSolid from "vike-solid/vite";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    vike({}),
    vikeSolid({
      extensions: [".md"],
    }),
    nodePolyfills(),
  ],
  assetsInclude: ['**/*.md']
});
