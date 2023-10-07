import EmailList from "@components/EmailList/EmailList";

export default function AccountUnreadPage({
  accountId,
}: {
  accountId: string;
}) {
  return <EmailList accountId={accountId} filters={["unread"]} />;
}
