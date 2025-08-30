import { useState } from "react";

export const App = () => {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <p>{input}</p>
    </div>
  );
};
