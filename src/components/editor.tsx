import MonacoEditor from "@monaco-editor/react";
import type { Dispatch, FC, SetStateAction } from "react";

type EditorProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
};

export const Editor: FC<EditorProps> = ({ code, setCode }) => (
  <MonacoEditor
    className="p-4 rounded-lg border border-gray-300 shadow-xs"
    height="400px"
    language="python"
    theme="light"
    value={code}
    onChange={(value) => setCode(value ?? "")}
  />
);
