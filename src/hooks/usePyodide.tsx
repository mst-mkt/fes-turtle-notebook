import type { PyodideInterface } from "pyodide";
import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { initializePyodide } from "../lib/pyodideInit";

interface PyodideContextType {
  isLoading: boolean;
  svgContent: string;
  exec: (code: string) => Promise<unknown>;
  runWithDisplay: (code: string) => Promise<void>;
  clearScene: () => void;
}

const PyodideContext = createContext<PyodideContextType | null>(null);

interface PyodideProviderProps {
  children: React.ReactNode;
}

export const PyodideProvider: React.FC<PyodideProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [svgContent, setSvgContent] = useState<string>("");
  const pyodideRef = useRef<PyodideInterface | null>(null);
  const initPromiseRef = useRef<Promise<PyodideInterface> | null>(null);

  useEffect(() => {
    // 初期化が既に開始されている場合は何もしない
    if (initPromiseRef.current) return;

    // 初期化プロミスを作成して保存
    initPromiseRef.current = initializePyodide(setSvgContent);

    initPromiseRef.current
      .then((pyodideInstance) => {
        pyodideRef.current = pyodideInstance;
      })
      .catch((error) => console.error("Failed to initialize Pyodide:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const exec = async (code: string) => {
    const currentPyodide = pyodideRef.current;
    if (currentPyodide === null) {
      throw new Error("Pyodide is not initialized");
    }

    try {
      const result = await currentPyodide.runPythonAsync(code);
      return result;
    } catch (error) {
      console.error("Python execution error:", error);
      throw error;
    }
  };

  const runWithDisplay = async (code: string) => {
    const currentPyodide = pyodideRef.current;
    if (currentPyodide === null) {
      throw new Error("Pyodide is not initialized");
    }

    try {
      const modifiedCode = `
import turtle
turtle.shape("turtle")

${code}
`;

      await currentPyodide.runPythonAsync(modifiedCode);

      await currentPyodide.runPythonAsync(`
import turtle
import turtle_display

svg_dict = turtle.Screen().show_scene()
turtle_display.kernel.display_event({ "display_type": "turtle", "content": svg_dict })
turtle.restart()
      `);
    } catch (error) {
      console.error("Python execution error:", error);
      throw error;
    }
  };

  const clearScene = () => {
    setSvgContent("");
  };

  const contextValue: PyodideContextType = {
    isLoading,
    svgContent,
    exec,
    runWithDisplay,
    clearScene,
  };

  return (
    <PyodideContext.Provider value={contextValue}>
      {children}
    </PyodideContext.Provider>
  );
};

export const usePyodide = (): PyodideContextType => {
  const context = useContext(PyodideContext);
  if (!context) {
    throw new Error("usePyodide must be used within a PyodideProvider");
  }
  return context;
};
