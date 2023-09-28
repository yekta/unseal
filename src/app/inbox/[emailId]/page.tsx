"use client";

import EmailPage from "@components/EmailPage/EmailPage";
import { TEmail, emails, favoritedEmails, unreadEmails } from "@ts/email";
import { useSearchParams } from "next/navigation";

export default function Page({ params }: { params: { emailId: string } }) {
  const { emailId } = params;
  const email = emails.find((email) => email.id === emailId);
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  let selectedEmails: TEmail[];
  if (from === "/unread") {
    selectedEmails = unreadEmails;
  } else if (from === "/favorites") {
    selectedEmails = favoritedEmails;
  } else {
    selectedEmails = emails;
  }
  return (
    email && (
      <EmailPage email={email} selectedEmails={selectedEmails} from={from} />
    )
  );
}
