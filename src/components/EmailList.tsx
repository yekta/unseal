"use client";

import { EmailLine, TEmailLineProps } from "@components/EmailLine/EmailLine";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getGroupLabelByDate } from "@ts/helpers/getGroupLabelByDate";
import { TEmailFilter, getEmails } from "@ts/queries/getEmails";
import { useEffect, useRef } from "react";

export default function EmailList({ filter }: { filter: TEmailFilter }) {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isInitialLoading,
  } = useInfiniteQuery(
    ["emails", filter],
    (ctx) => getEmails(ctx.pageParam, filter),
    {
      getNextPageParam: (_lastGroup) => _lastGroup.nextOffset,
    }
  );

  const allEmails = data ? data.pages.flatMap((d) => d.emails) : [];
  let lastDateLabel: string | undefined = undefined;
  let rows: (TEmailLineProps | string)[] = [];
  for (let i = 0; i < allEmails.length; i++) {
    const email = allEmails[i];
    const dateLabel = getGroupLabelByDate(new Date(email.date));
    if (lastDateLabel === undefined || dateLabel !== lastDateLabel) {
      lastDateLabel = getGroupLabelByDate(new Date(email.date));
      rows.push(lastDateLabel);
    }
    rows.push(email);
  }
  const parentRef = useRef<HTMLDivElement>(null);

  const estimatedSize = 40;
  const overscan = 20;
  const rowVirtualizer = useVirtualizer({
    count: rows.length + 1,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedSize,
    overscan,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

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

  return isInitialLoading ? (
    <div className="w-full flex items-center justify-center px-4 py-8 text-c-on-bg/60">
      Loading emails...
    </div>
  ) : (
    <div
      ref={parentRef}
      className="w-full flex-1 flex justify-center pt-6 pb-24 overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
        className="w-full max-w-6xl flex flex-col md:px-2"
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index > rows.length - 1;
          const emailOrLabel = rows[virtualRow.index];

          return (
            <div
              ref={rowVirtualizer.measureElement}
              key={virtualRow.index}
              data-index={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {isLoaderRow ? (
                hasNextPage ? (
                  <div className="w-full flex items-center justify-center px-4 py-8 text-c-on-bg/60">
                    Loading more...
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-center px-4 py-8 text-c-on-bg/60">
                    You've reached the end!
                  </div>
                )
              ) : typeof emailOrLabel === "string" ? (
                <div className="px-4 md:px-8 text-c-on-bg/50 pt-8 pb-3">
                  {emailOrLabel}
                </div>
              ) : (
                <div className="w-full">
                  <EmailLine {...emailOrLabel} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
