import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import manifest from "./src/manifest";

export default defineConfig({
  plugins: [tailwindcss(), crx({ manifest })],
  build: {
    outDir: "dist",
  },
});
