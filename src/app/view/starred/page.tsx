import EmailList from "@components/EmailList/EmailList";

export default function Page() {
  return <EmailList filters={["starred"]} />;
}