import { breakpoints } from "@ts/constants/breakpoints";
import { useWindowSize } from "usehooks-ts";
import { useCallback, useEffect } from "react";
import {
  PartialKeys,
  VirtualizerOptions,
  useVirtualizer,
} from "@tanstack/react-virtual";

export const virtualizerStateCache = new Map<
  string,
  { anchorItemIndex: number; anchorItemProgress: number; offset?: number }
>();

export function useSmartVirtualizer<
  TScrollElement extends Element,
  TItemElement extends Element
>(
  virtualizerKey: string[],
  options: PartialKeys<
    VirtualizerOptions<TScrollElement, TItemElement>,
    "observeElementRect" | "observeElementOffset" | "scrollToFn"
  >
) {
  const { width: windowWidth } = useWindowSize();
  const windowType = windowWidth >= breakpoints.md ? "md" : "sm";

  const getItemKey = useCallback((i: number) => windowType + i, [windowType]);
  const virtualizer = useVirtualizer({
    ...options,
    getItemKey,
  });
  const virtualizerKeyString = virtualizerKey.toString();

  useEffect(() => {
    const scrollInfo = virtualizerStateCache.get(virtualizerKeyString);
    if (!scrollInfo) return;

    const offset = virtualizer.getOffsetForIndex(
      scrollInfo.anchorItemIndex,
      "start"
    )[0];
    const item = virtualizer.getVirtualItemForOffset(offset);
    const adjustedOffset =
      item.start + Math.round(scrollInfo.anchorItemProgress * item.size);
    if (adjustedOffset === virtualizer.scrollOffset) return;

    virtualizer.scrollToOffset(adjustedOffset);
  }, [windowType]);

  useEffect(() => {
    const scrollOffset = virtualizer.scrollOffset;
    const item = virtualizer.getVirtualItemForOffset(scrollOffset);
    const anchorItemProgress = (scrollOffset - item.start) / item.size;
    virtualizerStateCache.set(virtualizerKeyString, {
      anchorItemIndex: item.index,
      anchorItemProgress,
      offset: scrollOffset,
    });
  }, [virtualizer.scrollOffset]);

  return virtualizer;
}
