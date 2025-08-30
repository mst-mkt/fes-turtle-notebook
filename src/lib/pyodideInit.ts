import { loadPyodide } from "pyodide";
import { createTurtleDisplayBridge } from "./turtleBridge";

export const initializePyodide = async (
  setSvgContent: (content: string) => void,
) => {
  const pyodideInstance = await loadPyodide({
    indexURL: "../../node_modules/pyodide/",
  });

  const turtleDisplayBridge = createTurtleDisplayBridge(
    pyodideInstance,
    setSvgContent,
  );

  pyodideInstance.registerJsModule("turtle_display", turtleDisplayBridge);
  await pyodideInstance.loadPackage(
    "../../turtle/turtle-0.0.1-py3-none-any.whl",
  );

  return pyodideInstance;
};
