"use client";

import { EmailLine } from "@components/EmailList/EmailLine/EmailLine";
import { EmailLinePlaceholder } from "@components/EmailList/EmailLine/EmailLinePlaceholder";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { breakpoints } from "@ts/constants/breakpoints";
import { TEmail } from "@ts/email";
import { getGroupLabelByDate } from "@ts/helpers/getGroupLabelByDate";
import { TEmailView, getEmails } from "@ts/queries/getEmails";
import { virtualizerScrollInfosAtom } from "@ts/stores/virtualizerScrollInfos";
import { useAtom } from "jotai";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

const placeholderEmails: TEmailPlaceholder[] = Array.from({
  length: 10,
}).map((_) => ({
  isPlaceholder: true,
}));
const placeholders: (TEmailPlaceholder | string)[] = [
  "Loading",
  ...placeholderEmails,
  "Loading",
  ...placeholderEmails,
];

export default function EmailList({
  accountId,
  view,
}: {
  accountId?: string;
  view: TEmailView;
}) {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isInitialLoading,
  } = useInfiniteQuery(
    ["emails", accountId, view],
    (ctx) => getEmails({ offset: ctx.pageParam, accountId, view }),
    {
      getNextPageParam: (_lastGroup) => _lastGroup.nextOffset,
    }
  );

  const allEmails = data ? data.pages.flatMap((d) => d.emails) : [];

  let lastDateLabel: string | undefined = undefined;
  let rows: (TEmail | string)[] = [];
  for (let i = 0; i < allEmails.length; i++) {
    const email = allEmails[i];
    const dateLabel = getGroupLabelByDate(new Date(email.date));
    if (lastDateLabel === undefined || dateLabel !== lastDateLabel) {
      lastDateLabel = getGroupLabelByDate(new Date(email.date));
      rows.push(lastDateLabel);
    }
    rows.push(email);
  }

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathnameKey = `${pathname}?${searchParams.toString()}`;
  const [virtualizerScrollInfos, setVirtualizerScrollInfos] = useAtom(
    virtualizerScrollInfosAtom
  );

  const parentRef = useRef<HTMLDivElement>(null);
  const loaderRowSize = 152;
  const labelSize = 68;
  const emailLineSize = 106;
  const emailLineSizeMd = 54;
  const overscan = 20;
  const { width: windowWidth } = useWindowSize();
  const rowVirtualizer = useVirtualizer({
    count: rows.length + 1,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) =>
      i > rows.length - 1
        ? loaderRowSize
        : typeof rows[i] === "string"
        ? labelSize
        : window.innerWidth > breakpoints.md
        ? emailLineSizeMd
        : emailLineSize,
    overscan,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    if (!lastItem) return;
    if (
      lastItem.index >= rows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    rows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  useEffect(() => {
    rowVirtualizer.measure();
    const adjustedOffset = getVirtualizerAdjustedScrollOffset();
    const offset = rowVirtualizer.scrollOffset;
    if (adjustedOffset === undefined) return;
    if (adjustedOffset === offset) return;
    rowVirtualizer.scrollToOffset(adjustedOffset);
  }, [windowWidth]);

  useEffect(() => {
    const { index, relativeOffset } = getVirtualizerScrollInfo();
    setVirtualizerScrollInfos((prev) => ({
      ...prev,
      [pathnameKey]: {
        index: index,
        relativeOffset,
        offset: rowVirtualizer.scrollOffset,
      },
    }));
  }, [rowVirtualizer.scrollOffset]);

  function getVirtualizerScrollInfo() {
    const offset = rowVirtualizer.scrollOffset;
    const item = rowVirtualizer.getVirtualItemForOffset(offset);
    const relativeOffset = offset - item.start;
    return {
      index: item.index,
      relativeOffset,
      offset,
    };
  }

  function getVirtualizerAdjustedScrollOffset() {
    const scrollInfo = virtualizerScrollInfos[pathnameKey];
    if (scrollInfo) {
      return (
        rowVirtualizer.getOffsetForIndex(scrollInfo.index, "start")[0] +
        scrollInfo.relativeOffset
      );
    }
    return undefined;
  }

  return (
    <div
      ref={parentRef}
      className="w-full flex-1 flex justify-center overflow-auto"
    >
      {isInitialLoading && (
        <div className="w-full max-w-6xl flex flex-col md:px-12 animate-pulse-placeholder">
          {placeholders.map((p, i) =>
            typeof p === "string" ? (
              <div key={i} className="w-full flex justify-start px-4 pt-8 pb-3">
                <p className="text-transparent bg-c-on-bg/20 rounded-full">
                  {p}
                </p>
              </div>
            ) : (
              <EmailLinePlaceholder key={i} />
            )
          )}
        </div>
      )}
      {!isInitialLoading && (
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
          className="w-full max-w-6xl flex flex-col"
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > rows.length - 1;
            const emailOrLabel = rows[virtualRow.index];
            return (
              <div
                key={virtualRow.index}
                data-index={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="md:px-12"
              >
                {(() => {
                  if (
                    isLoaderRow &&
                    !hasNextPage &&
                    rowVirtualizer.getVirtualItems().length === 1
                  ) {
                    return (
                      <div className="w-full flex items-center justify-center px-4 pt-8 pb-24 text-c-on-bg/60">
                        No matching emails.
                      </div>
                    );
                  }
                  if (isLoaderRow && !hasNextPage) {
                    return (
                      <div className="w-full flex items-center justify-center px-4 pt-8 pb-24 text-c-on-bg/60">
                        You've reached the end!
                      </div>
                    );
                  }
                  if (isLoaderRow) {
                    return (
                      <div className="w-full flex items-center justify-center px-4 pt-8 pb-24 text-c-on-bg/60">
                        Loading more...
                      </div>
                    );
                  }
                  if (typeof emailOrLabel === "string") {
                    return (
                      <div className="w-full px-4 text-c-on-bg/60 pt-8 pb-3">
                        {emailOrLabel}
                      </div>
                    );
                  }
                  return (
                    <div className="w-full">
                      <EmailLine {...emailOrLabel} />
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface TEmailPlaceholder {
  isPlaceholder: true;
}
