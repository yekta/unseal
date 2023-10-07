import EmailList from "@components/EmailList/EmailList";

export default function UnreadPage() {
  return <EmailList filters={["unread"]} />;
}
