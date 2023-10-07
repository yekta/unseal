import EmailList from "@components/EmailList/EmailList";

export default function StarredPage() {
  return <EmailList filters={["starred"]} />;
}
