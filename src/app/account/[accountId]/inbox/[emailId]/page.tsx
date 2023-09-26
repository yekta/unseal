"use client";

import { TAccountInboxProps } from "@app/account/types";
import EmailPage from "@components/EmailPage/EmailPage";
import { TEmail, emails, favoritedEmails, unreadEmails } from "@ts/email";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: TAccountInboxProps) {
  const { emailId, accountId } = params;
  const email = emails.find((email) => email.id === emailId);
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  let selectedEmails: TEmail[];
  if (from.endsWith("/unread")) {
    selectedEmails = unreadEmails;
  } else if (from.endsWith("/favorites")) {
    selectedEmails = favoritedEmails;
  } else {
    selectedEmails = emails;
  }
  if (accountId) {
    selectedEmails = selectedEmails.filter(
      (email) => email.account.id === accountId
    );
  }
  return (
    email && (
      <EmailPage email={email} selectedEmails={selectedEmails} from={from} />
    )
  );
}
