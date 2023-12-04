export function debounce(func: Function, ms: number) {
  let timeOut: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => func.apply(this, args), ms);
  };
}
