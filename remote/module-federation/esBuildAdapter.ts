import type { BuildAdapter } from "@softarc/native-federation/build";
import * as esbuild from "esbuild";
import inlineImage from "esbuild-plugin-inline-image";
import pluginVue from "esbuild-plugin-vue-next";

export const esBuildAdapter: BuildAdapter = async (options) => {
  const { entryPoint, external, outfile } = options;

  await esbuild.build({
    platform: "node",
    entryPoints: [entryPoint],
    external,
    outfile,
    bundle: true,
    sourcemap: false,
    minify: true,
    format: "esm",
    target: ["esnext"],
    plugins: [inlineImage(), pluginVue()],
    loader: { ".svg": "file" },
  });
};
