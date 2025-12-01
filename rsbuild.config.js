// @ts-check
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

// Docs: https://rsbuild.rs/config/
// @ts-ignore
export default defineConfig({
  plugins: [pluginReact()],
});
