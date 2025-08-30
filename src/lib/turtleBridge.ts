import type { PyodideInterface } from "pyodide";
import type { PyodideDisplayEvent } from "../types/pyodide";
import { elementFromProps } from "./svgConverter";

export const createTurtleDisplayBridge = (
  pyodideInstance: PyodideInterface,
  setSvgContent: (content: string) => void,
) => ({
  kernel: {
    display_event: (e: PyodideDisplayEvent) => {
      const content = e.toJs().get("content");
      const element = elementFromProps(content);
      if (element instanceof HTMLElement) {
        setSvgContent(element.outerHTML);
      }
    },
    locals: () => pyodideInstance.runPython("globals()"),
  },
});
