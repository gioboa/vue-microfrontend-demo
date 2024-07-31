import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { writeFileSync } from "fs";
import federation from "module-federation-vite";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import mfConfig from "./module-federation/federation.config.cjs";

export default defineConfig(async ({ command, mode }) => {
  const selfEnv = loadEnv(mode, process.cwd());
  return {
    server: {
      fs: {
        allow: [".", "../shared"],
      },
    },
    plugins: [
      {
        name: "generate-enviroment",
        options: function () {
          console.info("selfEnv", selfEnv);
          writeFileSync(
            "./src/enviroment.ts",
            `export default ${JSON.stringify(selfEnv, null, 2)};`
          );
        },
      },
      federation(mfConfig),
      vue(),
      vueJsx(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        vue: path.resolve(
          __dirname,
          "./node_modules/vue/dist/vue.runtime.esm-bundler.js"
        ),
        pinia: path.resolve(__dirname, "./node_modules/pinia/dist/pinia.mjs"),
        shared: path.resolve(__dirname, "../shared/shared"),
      },
    },
  };
});
