"use client";

import { EmailLine } from "@components/EmailList/EmailLine/EmailLine";
import { EmailLinePlaceholder } from "@components/EmailList/EmailLine/EmailLinePlaceholder";
import { useInfiniteQuery } from "@tanstack/react-query";
import { breakpoints } from "@ts/constants/breakpoints";
import { TEmail } from "@ts/email";
import { getGroupLabelByDate } from "@ts/helpers/getGroupLabelByDate";
import {
  useSmartVirtualizer,
  virtualizerScrollInfoCache,
} from "@ts/hooks/useSmartVirtualizer";
import { TEmailView, getEmails } from "@ts/queries/getEmails";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

interface TEmailPlaceholder {
  isPlaceholder: true;
}

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

  const parentRef = useRef<HTMLDivElement>(null);
  const loaderRowSize = 152;
  const labelSize = 68;
  const emailLineSize = 106;
  const emailLineSizeMd = 54;
  const overscan = 20;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const virtualizerKey = ["email-list", pathname, searchParams.toString()];
  const rowVirtualizer = useSmartVirtualizer(virtualizerKey, {
    count: rows.length + 1,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => {
      return i > rows.length - 1
        ? loaderRowSize
        : typeof rows[i] === "string"
        ? labelSize
        : window.innerWidth >= breakpoints.md
        ? emailLineSizeMd
        : emailLineSize;
    },
    initialOffset: virtualizerScrollInfoCache.get(virtualizerKey.toString())
      ?.offset,
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
                <VirtualRow
                  isLoaderRow={isLoaderRow}
                  emailOrLabel={emailOrLabel}
                  hasNextPage={hasNextPage}
                  virtualItemsLength={rowVirtualizer.getVirtualItems().length}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function VirtualRow({
  isLoaderRow,
  emailOrLabel,
  hasNextPage,
  virtualItemsLength,
}: {
  isLoaderRow: boolean;
  emailOrLabel: TEmail | string;
  hasNextPage: boolean | undefined;
  virtualItemsLength: number;
}) {
  if (isLoaderRow) {
    return (
      <div className="w-full flex items-center justify-center px-4 pt-8 pb-24 text-c-on-bg/60">
        {!hasNextPage && virtualItemsLength === 1
          ? "No matching emails."
          : !hasNextPage
          ? "You've reached the end."
          : "Loading..."}
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
}
