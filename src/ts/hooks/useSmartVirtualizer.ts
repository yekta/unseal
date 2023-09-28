import { breakpoints } from "@ts/constants/breakpoints";
import { useWindowSize } from "usehooks-ts";
import { useEffect } from "react";
import {
  PartialKeys,
  VirtualizerOptions,
  useVirtualizer,
} from "@tanstack/react-virtual";

export const virtualizerScrollInfoCache = new Map<
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

  const virtualizer = useVirtualizer(options);
  const virtualizerKeyString = virtualizerKey.toString();

  useEffect(() => {
    virtualizer.measure();
  }, [windowWidth]);

  useEffect(() => {
    const scrollInfo = virtualizerScrollInfoCache.get(virtualizerKeyString);
    if (!scrollInfo) return;

    const scrollIfNeeded = () => {
      const offsetForIndex = virtualizer.getOffsetForIndex(
        scrollInfo.anchorItemIndex,
        "start"
      )[0];
      const item = virtualizer.getVirtualItemForOffset(offsetForIndex);
      const adjustedOffset =
        offsetForIndex + Math.round(scrollInfo.anchorItemProgress * item.size);
      if (
        adjustedOffset === undefined ||
        adjustedOffset === virtualizer.scrollOffset
      ) {
        return;
      }

      virtualizer.scrollToOffset(adjustedOffset);
    };

    setTimeout(() => scrollIfNeeded());
  }, [windowType]);

  useEffect(() => {
    const scrollOffset = virtualizer.scrollOffset;
    const item = virtualizer.getVirtualItemForOffset(scrollOffset);
    const anchorItemProgress = (scrollOffset - item.start) / item.size;
    virtualizerScrollInfoCache.set(virtualizerKeyString, {
      anchorItemIndex: item.index,
      anchorItemProgress,
      offset: scrollOffset,
    });
  }, [virtualizer.scrollOffset]);

  return virtualizer;
}
