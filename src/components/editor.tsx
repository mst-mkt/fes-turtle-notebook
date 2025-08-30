import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import { format } from "@wasm-fmt/ruff_fmt/vite";
import type { Dispatch, FC, SetStateAction } from "react";
import { useMemo } from "react";

type EditorProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
};

export const Editor: FC<EditorProps> = ({ code, setCode }) => {
  const lineHeight = 16;
  const fontSize = 12;
  const paddingTop = 8;
  const paddingBottom = 8;

  const editorHeight = useMemo(() => {
    const lines = code.split("\n").length;
    const minLines = 3;
    const maxLines = 30;
    const actualLines = Math.max(minLines, Math.min(maxLines, lines));
    return actualLines * lineHeight + paddingTop + paddingBottom;
  }, [code]);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const current = editor.getValue();
      const formatted = format(current);
      setCode(formatted);
    });
  };

  return (
    <div className="p-4 rounded-lg border border-gray-300 shadow-xs">
      <MonacoEditor
        height={`${editorHeight}px`}
        language="python"
        theme="light"
        value={code}
        onMount={handleEditorMount}
        onChange={(value) => setCode(value ?? "")}
        options={{
          fontSize,
          lineHeight,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
        }}
      />
    </div>
  );
};
