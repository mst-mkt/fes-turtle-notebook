import { useState } from "react";
import { Editor } from "./components/editor";
import { Turtle } from "./components/turtle";

export const App = () => {
  const [input, setInput] = useState(`import turtle

# 正方形を描く
turtle.forward(100)
turtle.right(90)
turtle.forward(100)
turtle.right(90)
turtle.forward(100)
turtle.right(90)
turtle.forward(100)
turtle.right(90)

# 少し移動して円を描く
turtle.penup()
turtle.forward(150)
turtle.pendown()
turtle.circle(50)`);

  return (
    <div className="max-w-[92svw] w-192 mx-auto flex flex-col gap-y-8 py-8">
      <h1 className="text-3xl font-bold text-center">
        Turtle Graphics Notebook
      </h1>
      <Editor code={input} setCode={setInput} />
      <Turtle code={input} />
    </div>
  );
};
