import { breakpoints } from "@ts/constants/breakpoints";
import { useWindowSize } from "usehooks-ts";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Virtualizer } from "@tanstack/react-virtual";

export const virtualizerScrollInfos = new Map<
  string,
  { itemIndex: number; itemProgress: number; offset?: number }
>();

export function useSmartVirtualizer(
  virtualizer: Virtualizer<HTMLDivElement, Element>
) {
  const { width: windowWidth } = useWindowSize();
  const windowType = windowWidth >= breakpoints.md ? "md" : "sm";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathnameKey = `${pathname}${searchParams.toString()}`;

  useEffect(() => {
    virtualizer.measure();
  }, [windowWidth]);

  useEffect(() => {
    const scrollInfo = virtualizerScrollInfos.get(pathnameKey);
    if (!scrollInfo) return;

    const scrollIfNeeded = () => {
      const offsetForIndex = virtualizer.getOffsetForIndex(
        scrollInfo.itemIndex,
        "start"
      )[0];
      const item = virtualizer.getVirtualItemForOffset(offsetForIndex);
      const adjustedOffset =
        offsetForIndex + Math.round(scrollInfo.itemProgress * item.size);
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
    const itemProgress = (scrollOffset - item.start) / item.size;
    virtualizerScrollInfos.set(pathnameKey, {
      itemIndex: item.index,
      itemProgress,
      offset: scrollOffset,
    });
  }, [virtualizer.scrollOffset]);
}
