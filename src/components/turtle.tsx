import { IconPlayerPlay, IconReload } from "@tabler/icons-react";
import type { FC } from "react";
import { useCallback } from "react";
import { usePyodideManager } from "../hooks/usePyodideManager";
import { useTurtleCanvas } from "../hooks/useTurtleCanvas";

interface TurtleProps {
  code?: string;
}

export const Turtle: FC<TurtleProps> = ({ code }) => {
  const { isLoading } = usePyodideManager();
  const { runWithDisplay, clearScene, svgContent, isRunning } =
    useTurtleCanvas();

  const runCode = useCallback(async () => {
    if (!code?.trim()) return;

    try {
      await runWithDisplay(code);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error running turtle code:", errorMessage);
    }
  }, [code, runWithDisplay]);

  const handleClear = useCallback(() => {
    clearScene();
  }, [clearScene]);

  return (
    <div className="flex flex-col gap-4 not-prose">
      <div className="border border-gray-300 rounded-lg p-4 relative">
        {svgContent ? (
          <>
            <div
              className="[&>svg]:h-64"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: SVGの要素を埋め込む必要がある
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-4 right-4 p-2 rounded-md border border-gray-300 shadow-xs cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <IconReload className="text-gray-500" size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-y-2 text-gray-500">
            <p className="m-0">Turtle graphics will appear here</p>
            <button
              type="button"
              onClick={runCode}
              disabled={!code?.trim() || isRunning || isLoading}
              className="flex items-center gap-x-2 ps-3 pe-4 cursor-pointer hover:bg-amber-700 transition-colors py-2 rounded-lg bg-amber-600 text-white"
            >
              <IconPlayerPlay />
              Run Turtle Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
