"use client";

import { TAccountInboxProps } from "@app/account/types";
import EmailPage from "@components/EmailPage/EmailPage";
import { TInboxFilter, useInbox } from "@ts/hooks/useInbox";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: TAccountInboxProps) {
  const { emailId, accountId } = params;
  let filters: TInboxFilter[] = [];
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  if (from.endsWith("/unread")) {
    filters.push("unread");
  } else if (from.endsWith("/starred")) {
    filters.push("starred");
  }
  const { emails } = useInbox({ accountId, filters });
  const email = emails?.find((email) => email.id === emailId);
  if (!email) return <div></div>;
  if (!emails) return <div></div>;
  return <EmailPage email={email} emails={emails} from={from} />;
}
