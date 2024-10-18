import { federation } from "@module-federation/vite";
import { writeFileSync } from "fs";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

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
            `export default ${JSON.stringify(selfEnv, null, 2)};`,
          );
        },
      },
      federation({
        filename: "remoteEntry.js",
        name: "remote",
        exposes: {
          "./vue2": "./node_modules/vue/dist/vue.runtime.esm.js",
          "./remote-app": "./src/App.vue",
        },
        remotes: {},
      }),
      createVuePlugin(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        vue: path.resolve(
          __dirname,
          "./node_modules/vue/dist/vue.runtime.esm.js",
        ),
        shared: path.resolve(__dirname, "../shared/shared"),
      },
    },
    build: {
      target: "chrome89",
    },
  };
});
