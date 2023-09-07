"use client";

import { EmailLine, TEmailLineProps } from "@components/EmailLine/EmailLine";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { emails } from "@ts/email";
import { useEffect, useRef } from "react";

async function fetchEmails(offset: number = 1): Promise<{
  emails: TEmailLineProps[];
  nextOffset: number | undefined;
}> {
  const maxOffset = 10;
  const _emails = [...emails];
  await new Promise((r) => setTimeout(r, 500));
  const nextOffset = offset > maxOffset ? undefined : offset + 1;
  return {
    emails: _emails,
    nextOffset,
  };
}

export default function EmailList() {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isInitialLoading,
  } = useInfiniteQuery(["emails"], (ctx) => fetchEmails(ctx.pageParam), {
    getNextPageParam: (_lastGroup) => _lastGroup.nextOffset,
  });

  const allEmails = data ? data.pages.flatMap((d) => d.emails) : [];
  const parentRef = useRef<HTMLDivElement>(null);

  const estimatedSize = 30;
  const overscan = 20;
  const rowVirtualizer = useVirtualizer({
    count: allEmails.length + 1,
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
      lastItem.index >= allEmails.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allEmails.length,
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
          const isLoaderRow = virtualRow.index > allEmails.length - 1;
          const email = allEmails[virtualRow.index];

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
              ) : (
                <div className="w-full">
                  <EmailLine {...email} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
