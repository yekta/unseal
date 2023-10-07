import EmailList from "@components/EmailList/EmailList";

export default function AccountPage({ accountId }: { accountId: string }) {
  return <EmailList accountId={accountId} />;
}
