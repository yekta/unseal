import { useRef } from "react";

export default function useRefWithCallback<T>(
  initialValue: T,
  callback: (node: T) => void
) {
  const ref = useRef<T>(initialValue);

  return new Proxy(ref, {
    set: (target, property, value) => {
      if (property === "current") callback(value as T);
      target[property as keyof typeof target] = value;
      return true;
    },
  });
}
