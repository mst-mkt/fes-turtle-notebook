import type { PyodideMap } from "../types/pyodide";

const isEntries = (value: unknown): value is Iterable<[string, string]> => {
  return (
    typeof value === "object" && value !== null && Symbol.iterator in value
  );
};

export const elementFromProps = (map: PyodideMap): HTMLElement | Text => {
  const tag = map.get("tag");
  if (typeof tag !== "string") {
    const text = map.get("text");
    return document.createTextNode(typeof text === "string" ? text : "");
  }

  const node = document.createElement(tag);

  const props = map.get("props");
  if (isEntries(props)) {
    for (const [key, value] of props) {
      node.setAttribute(key, value);
    }
  }

  const children = map.get("children");
  if (Array.isArray(children)) {
    for (const childProps of children) {
      const childElement = elementFromProps(childProps);
      if (childElement instanceof HTMLElement || childElement instanceof Text) {
        node.appendChild(childElement);
      }
    }
  }

  return node;
};
