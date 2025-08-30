import type { PyodideInterface } from "pyodide";
import { loadPyodide } from "pyodide";
import {
  createContext,
  type FC,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import turtle from "../../turtle/turtle-0.0.1-py3-none-any.whl";

interface PyodideManagerContextType {
  isLoading: boolean;
  pyodideInstance: PyodideInterface | null;
  exec: (code: string) => Promise<unknown>;
}

const PyodideManagerContext = createContext<PyodideManagerContextType | null>(
  null,
);

interface PyodideManagerProviderProps {
  children: ReactNode;
}

export const PyodideManagerProvider: FC<PyodideManagerProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pyodideInstance, setPyodideInstance] =
    useState<PyodideInterface | null>(null);
  const initPromiseRef = useRef<Promise<PyodideInterface> | null>(null);

  const initializePyodide = useCallback(async () => {
    const pyodideInstance = await loadPyodide({
      indexURL: import.meta.env.DEV
        ? "../../node_modules/pyodide/"
        : "/pyodide/",
    });

    await pyodideInstance.loadPackage(turtle);

    return pyodideInstance;
  }, []);

  useEffect(() => {
    if (initPromiseRef.current) return;

    initPromiseRef.current = initializePyodide();

    initPromiseRef.current
      .then((instance) => {
        setPyodideInstance(instance);
      })
      .catch((error) => console.error("Failed to initialize Pyodide:", error))
      .finally(() => setIsLoading(false));
  }, [initializePyodide]);

  const exec = async (code: string) => {
    if (pyodideInstance === null) {
      throw new Error("Pyodide is not initialized");
    }

    try {
      const result = await pyodideInstance.runPythonAsync(code);
      return result;
    } catch (error) {
      console.error("Python execution error:", error);
      throw error;
    }
  };

  const contextValue: PyodideManagerContextType = {
    isLoading,
    pyodideInstance,
    exec,
  };

  return (
    <PyodideManagerContext.Provider value={contextValue}>
      {children}
    </PyodideManagerContext.Provider>
  );
};

export const usePyodideManager = (): PyodideManagerContextType => {
  const context = useContext(PyodideManagerContext);
  if (!context) {
    throw new Error(
      "usePyodideManager must be used within a PyodideManagerProvider",
    );
  }
  return context;
};
