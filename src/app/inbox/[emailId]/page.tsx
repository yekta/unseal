"use client";

import EmailPage from "@components/EmailPage/EmailPage";
import { TInboxFilter, useInbox } from "@ts/hooks/useInbox";
import next from "next";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { emailId: string } }) {
  const { emailId } = params;
  let filters: TInboxFilter[] = [];
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  if (from.endsWith("/unread")) {
    filters.push("unread");
  } else if (from.endsWith("/starred")) {
    filters.push("starred");
  }
  const { emails } = useInbox({ filters });
  const email = emails?.find((email) => email.id === emailId);
  const prevId = email ? emails?.[emails.indexOf(email) - 1]?.id : undefined;
  const nextId = email ? emails?.[emails.indexOf(email) + 1]?.id : undefined;
  const prevEmailPathname = prevId ? `/inbox/${prevId}` : undefined;
  const nextEmailPathname = nextId ? `/inbox/${nextId}` : undefined;
  if (!email) return <></>;
  if (!emails) return <></>;
  return (
    <EmailPage
      email={email}
      prevEmailPathname={prevEmailPathname}
      nextEmailPathname={nextEmailPathname}
      from={from}
    />
  );
}
