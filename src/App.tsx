import { useState } from "react";
import { Editor } from "./components/editor";

export const App = () => {
  const [input, setInput] = useState("");

  return (
    <div className="max-w-[92svw] w-192 mx-auto flex flex-col gap-y-8 py-8">
      <Editor code={input} setCode={setInput} />
      <p>{input}</p>
    </div>
  );
};
