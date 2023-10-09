import EmailPage from "@components/EmailPage/EmailPage";
import { LinkPropsOptions, useParams, useSearch } from "@tanstack/react-router";
import { TInboxFilter, useInbox } from "@ts/hooks/useInbox";

export default function AccountInboxPage() {
  const { emailId, accountId } = useParams({ from: "__root__" });
  let filters: TInboxFilter[] = [];
  const { from } = useSearch({
    from: "/app-layout/account/$accountId/inbox/$emailId",
  });
  let fromLinkTo: LinkPropsOptions["to"] = "/account/$accountId";
  if (from?.endsWith("/unread")) {
    filters.push("unread");
    fromLinkTo = "/account/$accountId/view/unread";
  } else if (from?.endsWith("/starred")) {
    filters.push("starred");
    fromLinkTo = "/account/$accountId/view/starred";
  }
  const { emails } = useInbox({ filters, accountId });
  const email = emails?.find((email) => email.id === emailId);
  const prevId = email ? emails?.[emails.indexOf(email) - 1]?.id : undefined;
  const nextId = email ? emails?.[emails.indexOf(email) + 1]?.id : undefined;
  const prevLink: LinkPropsOptions = prevId
    ? {
        to: `/account/$accountId/inbox/$emailId`,
        params: { emailId: prevId, accountId },
        search: { from },
      }
    : undefined;
  const nextLink: LinkPropsOptions = nextId
    ? {
        to: `/account/$accountId/inbox/$emailId`,
        params: { emailId: nextId, accountId },
        search: { from },
      }
    : undefined;
  const fromLink: LinkPropsOptions = {
    to: fromLinkTo,
    params: { accountId },
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
