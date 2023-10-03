import { useEffect } from "react";
import Mousetrap from "mousetrap";

interface UseHotkeyOptions {
  enabled?: boolean;
  enableOnInput?: boolean;
}

interface HotkeyConfig {
  hotkey: string | string[];
  callback: () => void;
  options?: UseHotkeyOptions;
}

function shouldExecuteCallback(
  e: KeyboardEvent,
  enableOnInput?: boolean
): boolean {
  const element: Element = e.target as Element;

  if (enableOnInput && element.tagName === "INPUT") {
    return true;
  }
  if ((" " + element.className + " ").indexOf(" mousetrap ") > -1) {
    return true;
  }
  return !(
    element.tagName === "INPUT" ||
    element.tagName === "SELECT" ||
    element.tagName === "TEXTAREA" ||
    ((element as HTMLElement).contentEditable !== undefined &&
      (element as HTMLElement).contentEditable === "true")
  );
}

export function useHotkeys(configs: HotkeyConfig[]): void {
  useEffect(() => {
    Mousetrap.prototype.stopCallback = () => false;
    configs.forEach((config) => {
      const { hotkey, callback, options } = config;
      const wrappedCallback = (e: KeyboardEvent) => {
        if (shouldExecuteCallback(e, options?.enableOnInput)) {
          callback();
        }
      };

      if (options?.enabled === false) {
        Mousetrap.unbind(hotkey);
      } else {
        Mousetrap.bind(hotkey, wrappedCallback);
      }
    });

    return () => {
      configs.forEach(({ hotkey }) => {
        Mousetrap.unbind(hotkey);
      });
    };
  }, [configs]);
}
