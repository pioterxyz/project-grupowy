// @ts-check
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";

// Docs: https://rsbuild.rs/config/
// @ts-ignore
export default defineConfig({
  plugins: [pluginReact()],
});
