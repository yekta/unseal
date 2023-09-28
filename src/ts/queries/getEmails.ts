import { TEmail, emails } from "@ts/email";

const limit = 20;
const maxOffset = 8;

export type TEmailView = "all" | "unread" | "favorites";

export async function getEmails({
  offset = 0,
  accountId,
  view,
}: {
  offset: number;
  accountId?: string;
  view: "all" | "unread" | "favorites";
}): Promise<{
  emails: TEmail[];
  nextOffset: number | undefined;
}> {
  let emailsFilteredByAccount: TEmail[];
  let emailsFilteredByView: TEmail[];
  if (accountId) {
    emailsFilteredByAccount = emails.filter(
      (email) => email.account.id === accountId
    );
  } else {
    emailsFilteredByAccount = emails;
  }
  if (view === "unread") {
    emailsFilteredByView = emailsFilteredByAccount.filter(
      (email) => !email.isRead
    );
  } else if (view === "favorites") {
    emailsFilteredByView = emailsFilteredByAccount.filter(
      (email) => email.isFavorited
    );
  } else {
    emailsFilteredByView = emailsFilteredByAccount;
  }
  const selectedEmails: TEmail[] = [
    ...emailsFilteredByView.slice(offset * limit, (offset + 1) * limit),
  ];
  await new Promise((r) => setTimeout(r, 500));
  const nextOffset = offset >= maxOffset ? undefined : offset + 1;
  return {
    emails: selectedEmails,
    nextOffset,
  };
}
