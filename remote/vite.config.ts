import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";
import { createEsBuildAdapter } from "@softarc/native-federation-esbuild";
import pluginVue from "esbuild-plugin-vue-next";

export default defineConfig(async ({ command }) => ({
  plugins: [
    await federation({
      options: {
        workspaceRoot: __dirname,
        outputPath: "dist",
        tsConfig: "tsconfig.json",
        federationConfig: "module-federation/federation.config.cjs",
        verbose: true,
        dev: command === "serve",
      },
      adapter: createEsBuildAdapter({ plugins: [pluginVue()] }),
    }),
    vue(),
  ],
}));
