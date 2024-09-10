export const useDebounce = (func: Function, wait = 3000) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: unknown[]) {
    const context = this;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};
