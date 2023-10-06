"use client";

import { TAccountInboxProps } from "@app/account/types";
import EmailPage from "@components/EmailPage/EmailPage";
import { useSearch } from "@tanstack/react-router";
import { getPathnameWithAccount } from "@ts/helpers/getPathnameWithAccount";
import { TInboxFilter, useInbox } from "@ts/hooks/useInbox";

export default function Page({ params }: TAccountInboxProps) {
  const { emailId, accountId } = params;
  let filters: TInboxFilter[] = [];
  const searchParams = useSearch({ from: "__root__" });
  const from = searchParams.from || "/";
  if (from.endsWith("/unread")) {
    filters.push("unread");
  } else if (from.endsWith("/starred")) {
    filters.push("starred");
  }
  const { emails } = useInbox({ accountId, filters });
  const email = emails?.find((email) => email.id === emailId);
  const prevId = email ? emails?.[emails.indexOf(email) - 1]?.id : undefined;
  const nextId = email ? emails?.[emails.indexOf(email) + 1]?.id : undefined;
  const prevEmailPathname = prevId
    ? getPathnameWithAccount(`/inbox/${prevId}`, accountId)
    : undefined;
  const nextEmailPathname = nextId
    ? getPathnameWithAccount(`/inbox/${nextId}`, accountId)
    : undefined;
  if (!email) return <div></div>;
  if (!emails) return <div></div>;
  return (
    <EmailPage
      email={email}
      prevEmailPathname={prevEmailPathname}
      nextEmailPathname={nextEmailPathname}
      from={from}
    />
  );
}
