export type PyodideMap = {
  get(key: string): string | PyodideMap[] | Iterable<[string, string]>;
};

export type PyodideDisplayEvent = {
  toJs: () => {
    get(key: string): PyodideMap;
  };
};
