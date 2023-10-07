import EmailList from "@components/EmailList/EmailList";
import { useParams } from "@tanstack/react-router";

export default function AccountStarredPage() {
  const { accountId } = useParams({ from: "__root__" });
  return <EmailList accountId={accountId} filters={["starred"]} />;
}
