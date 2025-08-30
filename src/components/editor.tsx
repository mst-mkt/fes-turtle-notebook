import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import { format } from "@wasm-fmt/ruff_fmt/vite";
import type { Dispatch, FC, SetStateAction } from "react";

type EditorProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
};

export const Editor: FC<EditorProps> = ({ code, setCode }) => {
  const handleEditorMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const current = editor.getValue();
      const formatted = format(current);
      setCode(formatted);
    });
  };

  return (
    <MonacoEditor
      className="p-4 rounded-lg border border-gray-300 shadow-xs"
      height="400px"
      language="python"
      theme="light"
      value={code}
      onMount={handleEditorMount}
      onChange={(value) => setCode(value ?? "")}
    />
  );
};
