import { TAccountPageProps } from "@app/account/types";
import EmailList from "@components/EmailList/EmailList";

export default function Page({ params }: TAccountPageProps) {
  const { accountId } = params;
  return <EmailList accountId={accountId} filters={["starred"]} />;
}
