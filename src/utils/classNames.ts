type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

export const classNames = (...args: ClassValue[]): string => {
  const classes: string[] = [];
  args.forEach((arg) => {
    if (!arg) {
      return;
    }
    if (typeof arg === "number" || typeof arg === "string") {
      classes.push(String(arg));
    }
    if (Array.isArray(arg)) {
      //recursively loop through arg arrays
      classes.push(classNames(...arg));
      return;
    }
    if (typeof arg === "object") {
      for (const key in arg) {
        if (
          //do not pass inherited properties
          Object.hasOwn(arg, key) &&
          arg[key]
        ) {
          classes.push(key);
        }
      }
    }
  });
  return classes.join(" ");
};
