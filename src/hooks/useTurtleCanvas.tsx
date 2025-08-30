import { useCallback, useEffect, useMemo, useState } from "react";
import { createTurtleDisplayBridge } from "../lib/turtleBridge";
import { usePyodideManager } from "./usePyodideManager";

interface TurtleCanvasHook {
  svgContent: string;
  isRunning: boolean;
  runWithDisplay: (code: string) => Promise<void>;
  clearScene: () => void;
}

export const useTurtleCanvas = (): TurtleCanvasHook => {
  const { pyodideInstance } = usePyodideManager();
  const [svgContent, setSvgContent] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const moduleId = useMemo(() => {
    return `turtle_display_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }, []);

  useEffect(() => {
    if (!pyodideInstance) return;

    const bridge = createTurtleDisplayBridge(pyodideInstance, setSvgContent);
    pyodideInstance.registerJsModule(moduleId, bridge);
  }, [pyodideInstance, moduleId]);

  const runWithDisplay = useCallback(
    async (code: string) => {
      if (!pyodideInstance || !moduleId) {
        throw new Error("Pyodide is not initialized");
      }

      setIsRunning(true);

      try {
        const modifiedCode = `
import turtle
turtle.shape("turtle")

${code}
`;

        await pyodideInstance.runPythonAsync(modifiedCode);

        await pyodideInstance.runPythonAsync(`
import turtle
import ${moduleId}

svg_dict = turtle.Screen().show_scene()
${moduleId}.kernel.display_event({ "display_type": "turtle", "content": svg_dict })
turtle.restart()
      `);
      } catch (error) {
        console.error("Python execution error:", error);
        throw error;
      } finally {
        setIsRunning(false);
      }
    },
    [pyodideInstance, moduleId],
  );

  const clearScene = useCallback(() => {
    setSvgContent("");
  }, []);

  return {
    svgContent,
    isRunning,
    runWithDisplay,
    clearScene,
  };
};
