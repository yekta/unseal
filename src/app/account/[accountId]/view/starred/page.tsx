import { TAccountPageProps } from "@app/account/types";
import EmailList from "@components/EmailList/EmailList";

export default function AccountStarredPage({
  accountId,
}: {
  accountId: string;
}) {
  return <EmailList accountId={accountId} filters={["starred"]} />;
}
