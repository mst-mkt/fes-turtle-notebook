import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/pyodide/pyodide-lock.json",
          dest: "pyodide",
        },
      ],
    }),
  ],
  assetsInclude: ["**/*.whl"],
  optimizeDeps: {
    exclude: ["pyodide"],
  },
});
