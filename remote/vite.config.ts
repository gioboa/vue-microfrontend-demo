import { federation } from "@module-federation/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(async ({ command, mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());
  return {
    base: "http://localhost:4174",
    plugins: [
      federation({
        filename: "remoteEntry.js",
        name: "remote-app",
        exposes: {
          "./remote-app": "./src/App.vue",
        },
        remotes: {},
        shared: ["vue", "vue-router"],
      }),
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        pinia: path.resolve(__dirname, "./node_modules/pinia/dist/pinia.mjs"),
        shared: path.resolve(__dirname, "../shared/shared"),
      },
    },
    build: {
      target: "chrome89",
    },
  };
});
