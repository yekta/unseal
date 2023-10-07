import EmailPage from "@components/EmailPage/EmailPage";
import {
  useParams,
  useSearch,
  useRouterState,
  useRouter,
} from "@tanstack/react-router";
import { TInboxFilter, useInbox } from "@ts/hooks/useInbox";

export default function InboxPage() {
  const { emailId } = useParams({ from: "__root__" });
  let filters: TInboxFilter[] = [];
  const { from } = useSearch({ from: "/inbox/$emailId" });
  if (from?.endsWith("/unread")) {
    filters.push("unread");
  } else if (from?.endsWith("/starred")) {
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
