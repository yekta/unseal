import { RefObject, useRef } from "react";

import { useEventListener } from "usehooks-ts";

type Handler = (event: MouseEvent) => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>({
  handler,
  exclude,
  mouseEvent = "mousedown",
}: {
  handler: Handler;
  exclude?: string[];
  mouseEvent?: "mousedown" | "mouseup";
}): RefObject<T> {
  const ref = useRef<T>(null);
  useEventListener(mouseEvent, (event) => {
    const el = ref?.current;
    const target = event.target as Node;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(target)) {
      return;
    }

    // Do nothing if clicking excluded elements
    if (exclude?.length) {
      for (const selector of exclude) {
        const excludedEl = document.querySelector(selector);
        if (excludedEl && excludedEl.contains(target)) {
          return;
        }
      }
    }

    handler(event);
  });
  return ref;
}
