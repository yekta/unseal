import EmailPage from "@components/EmailPage/EmailPage";
import { useParams, useSearch, LinkPropsOptions } from "@tanstack/react-router";
import { TInboxFilter, useInbox } from "@ts/hooks/useInbox";

export default function InboxPage() {
  const { emailId } = useParams({ from: "__root__" });
  let filters: TInboxFilter[] = [];
  const { from } = useSearch({ from: "/inbox/$emailId" });
  let fromLinkTo: LinkPropsOptions["to"] = "/";
  if (from?.endsWith("/unread")) {
    filters.push("unread");
    fromLinkTo = "/view/unread";
  } else if (from?.endsWith("/starred")) {
    filters.push("starred");
    fromLinkTo = "/view/starred";
  }
  const { emails } = useInbox({ filters });
  const email = emails?.find((email) => email.id === emailId);
  const prevId = email ? emails?.[emails.indexOf(email) - 1]?.id : undefined;
  const nextId = email ? emails?.[emails.indexOf(email) + 1]?.id : undefined;
  const prevLink: LinkPropsOptions = prevId
    ? {
        to: `/inbox/$emailId`,
        params: { emailId: prevId },
        search: { from },
      }
    : undefined;
  const nextLink: LinkPropsOptions = nextId
    ? {
        to: `/inbox/$emailId`,
        params: { emailId: nextId },
        search: { from },
      }
    : undefined;
  const fromLink: LinkPropsOptions = {
    to: fromLinkTo,
    params: { emailId },
  };
  if (!email) return <></>;
  if (!emails) return <></>;
  return (
    <EmailPage
      email={email}
      prevLink={prevLink}
      nextLink={nextLink}
      fromLink={fromLink}
    />
  );
}
