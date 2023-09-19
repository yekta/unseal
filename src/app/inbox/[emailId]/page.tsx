"use client";

import InboxHotkeyProvider from "@components/providers/InboxHotkeyProvider";
import { TEmail, emails, favoritedEmails, unreadEmails } from "@ts/email";
import Link from "next/link";
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
      <InboxHotkeyProvider emails={selectedEmails} email={email} from={from}>
        <div className="w-full flex-1 flex flex-row items-start justify-center">
          <Link
            href={from}
            className="flex-1 min-w-[4rem] min-h-full cursor-default"
          />
          <div className="w-full max-w-6xl flex md:px-8 flex-col relative pt-8 pb-24">
            <div className="w-full bg-c-bg-secondary flex flex-col py-6 px-10 rounded-xl">
              <h1 className="w-full font-bold text-3xl">{email?.title}</h1>
              <p className="mt-2">{email?.body}</p>
            </div>
          </div>
          <Link
            href={from}
            className="flex-1 min-w-[4rem] min-h-full cursor-default"
          />
        </div>
      </InboxHotkeyProvider>
    )
  );
}
