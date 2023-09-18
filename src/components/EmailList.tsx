"use client";

import { EmailLine } from "@components/EmailLine/EmailLine";
import { EmailLinePlaceholder } from "@components/EmailLine/EmailLinePlaceholder";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { TEmail } from "@ts/email";
import { getGroupLabelByDate } from "@ts/helpers/getGroupLabelByDate";
import { TEmailView, getEmails } from "@ts/queries/getEmails";
import { useEffect, useRef } from "react";

const placeholderEmails: TEmailPlaceholder[] = Array.from({
  length: 10,
}).map((i) => ({
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
  const parentRef = useRef<HTMLDivElement>(null);

  const estimatedSize = 54;
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

  return (
    <div
      ref={parentRef}
      className="w-full flex-1 flex justify-center pb-24 overflow-auto"
    >
      {isInitialLoading ? (
        <div className="w-full max-w-6xl flex flex-col md:px-8 animate-pulse-placeholder">
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
      ) : (
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
                className="md:px-8"
              >
                {(() => {
                  if (isLoaderRow && !hasNextPage) {
                    return (
                      <div className="w-full flex items-center justify-center px-4 py-8 text-c-on-bg/60">
                        You've reached the end!
                      </div>
                    );
                  }
                  if (isLoaderRow) {
                    return (
                      <div className="w-full flex items-center justify-center px-4 py-8 text-c-on-bg/60">
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
