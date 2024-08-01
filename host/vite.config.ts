import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import federation from "module-federation-vite";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(async ({ command }) => ({
  server: {
    fs: {
      allow: [".", "../shared"],
    },
    proxy: { "/src/remote_assets": "http://localhost:4174/" },
  },
  resolve: {
    alias: {
      vue: path.resolve(
        __dirname,
        "./node_modules/vue/dist/vue.runtime.esm-bundler.js",
      ),
      pinia: path.resolve(__dirname, "./node_modules/pinia/dist/pinia.mjs"),
      shared: path.resolve(__dirname, "../shared/shared"),
    },
  },
  build: {
    target: "chrome89",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.indexOf("/@module-federation/runtime") > -1) {
            return "mfruntime";
          }
        },
      },
    },
  },
  plugins: [
    await federation({
      name: "host",
      remotes: {
        remote: "http://localhost:4174/remoteEntry.js",
      },
      exposes: {},
      filename: "dd/remoteEntry.js",
    }),
    vue(),
    vueJsx(),
  ],
}));
