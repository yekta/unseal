import { TEmailLineProps } from "@components/EmailLine/EmailLine";
import { emails } from "@ts/email";

const limit = 20;
const maxOffset = 3;
export async function getEmails(offset: number = 0): Promise<{
  emails: TEmailLineProps[];
  nextOffset: number | undefined;
}> {
  const _emails = [...emails.slice(offset * limit, (offset + 1) * limit)];
  await new Promise((r) => setTimeout(r, 500));
  const nextOffset = offset >= maxOffset ? undefined : offset + 1;
  return {
    emails: _emails,
    nextOffset,
  };
}
