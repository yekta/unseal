import { TEmail, emails, favoritedEmails, unreadEmails } from "@ts/email";

const limit = 20;
const maxOffset = 3;

export type TEmailFilter = "all" | "unread" | "favorites";

export async function getEmails(
  offset: number = 0,
  filter: "all" | "unread" | "favorites"
): Promise<{
  emails: TEmail[];
  nextOffset: number | undefined;
}> {
  let selectedEmails: TEmail[];
  if (filter === "unread") {
    selectedEmails = unreadEmails;
  } else if (filter === "favorites") {
    selectedEmails = favoritedEmails;
  } else {
    selectedEmails = emails;
  }
  const _emails = [
    ...selectedEmails.slice(offset * limit, (offset + 1) * limit),
  ];
  await new Promise((r) => setTimeout(r, 500));
  const nextOffset = offset >= maxOffset ? undefined : offset + 1;
  return {
    emails: _emails,
    nextOffset,
  };
}
