import EmailList from "@components/EmailList";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <EmailList view={"all"} accountId={id} />;
}
