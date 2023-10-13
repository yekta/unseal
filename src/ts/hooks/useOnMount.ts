import { EffectCallback, useEffect } from "react";

export function useOnMount(effect: EffectCallback): void {
  useEffect(effect, []);
}
