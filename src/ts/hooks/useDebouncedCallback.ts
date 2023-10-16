import { useRef } from "react";

export function useDebouncedCallback<T, Z>(
  callback: (arg: T) => void,
  timeout?: number
) {
  let timer = useRef<ReturnType<typeof setTimeout>>();
  function debouncedCallback(arg: T) {
    timer.current = setTimeout(() => {
      callback(arg);
    }, timeout);
  }
  function cancel() {
    clearTimeout(timer.current);
  }
  return {
    callback: debouncedCallback,
    cancel,
  };
}
