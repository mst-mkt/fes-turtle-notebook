import type { FC } from "react";
import { useCallback, useState } from "react";
import { usePyodide } from "../hooks/usePyodide";

interface TurtleProps {
  code?: string;
}

export const Turtle: FC<TurtleProps> = ({ code }) => {
  const { runWithDisplay, clearScene, svgContent } = usePyodide();
  const [isRunning, setIsRunning] = useState(false);

  const runCode = useCallback(async () => {
    if (!code?.trim()) return;

    setIsRunning(true);

    try {
      await runWithDisplay(code);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error running turtle code:", errorMessage);
    } finally {
      setIsRunning(false);
    }
  }, [code, runWithDisplay]);

  const handleClear = useCallback(() => {
    clearScene();
  }, [clearScene]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={runCode}
          disabled={!code?.trim() || isRunning}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isRunning ? "Running..." : "Run Turtle Code"}
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={isRunning}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="border border-gray-300 rounded-lg p-4">
        {svgContent ? (
          <div
            className="flex justify-center [&>svg]:h-64"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: SVGの要素を埋め込む必要がある
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Turtle graphics will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};
