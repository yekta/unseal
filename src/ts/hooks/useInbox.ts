import { useInfiniteQuery } from "@tanstack/react-query";
import { emails } from "@ts/email";

export type TInboxFilter = "unread" | "starred";

export function useInbox({
  accountId,
  filters,
}: {
  accountId?: string;
  filters?: TInboxFilter[];
}) {
  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isInitialLoading,
  } = useInfiniteQuery(
    [
      "inbox",
      `account_id=${accountId}`,
      `filters=[${(filters || []).map((i) => `"${i}"`).join(",")}]`,
    ],
    (ctx) => getInbox({ accountId, filters, cursor: ctx.pageParam }),
    {
      getNextPageParam: (_lastGroup) => _lastGroup.nextCursor,
    }
  );

  const emails = data?.pages.flatMap((d) => d.emails);

  return {
    emails,
    isError,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isInitialLoading,
  };
}

async function getInbox({
  accountId,
  filters,
  cursor = 0,
}: {
  accountId?: string;
  filters?: TInboxFilter[];
  cursor?: number;
}) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let selectedEmails = emails;
  if (accountId !== undefined) {
    selectedEmails = selectedEmails.filter((e) => e.account.id === accountId);
  }
  if (filters?.includes("unread")) {
    selectedEmails = selectedEmails.filter((e) => !e.isRead);
  }
  if (filters?.includes("starred")) {
    selectedEmails = selectedEmails.filter((e) => e.isStarred);
  }
  const limit = 20;
  const lastCursor = selectedEmails.length - 1;
  let nextCursor: number | undefined;
  if (lastCursor > (cursor + 1) * limit) {
    nextCursor = cursor + 1;
  } else {
    nextCursor = undefined;
  }
  if (lastCursor > cursor * limit) {
    selectedEmails = selectedEmails.slice(cursor * limit, (cursor + 1) * limit);
  } else {
    selectedEmails = [];
  }
  return {
    emails: selectedEmails,
    nextCursor,
  };
}
