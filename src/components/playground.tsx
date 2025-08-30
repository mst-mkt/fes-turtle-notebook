import { type FC, useState } from "react";
import { Editor } from "./editor";
import { Turtle } from "./turtle";

type PlaygroundProps = {
  initialCode: string;
};

export const Playground: FC<PlaygroundProps> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode);

  return (
    <div className="flex flex-col gap-y-4">
      <Editor code={code} setCode={setCode} />
      <Turtle code={code} />
    </div>
  );
};
