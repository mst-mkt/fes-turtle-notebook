import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import init from "@wasm-fmt/ruff_fmt/vite";
import { PyodideManagerProvider } from "./hooks/usePyodideManager.tsx";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Root element not found");
}

await init();

createRoot(rootElement).render(
  <StrictMode>
    <PyodideManagerProvider>
      <App />
    </PyodideManagerProvider>
  </StrictMode>,
);
