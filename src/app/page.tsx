import { EmailLine } from "@components/EmailLine/EmailLine";
import { emails } from "@ts/email";

export default function Home() {
  return (
    <div className="w-full flex justify-center pt-6 pb-24">
      <div className="w-full max-w-6xl flex flex-col md:px-2">
        {emails.map((email) => (
          <EmailLine {...email}></EmailLine>
        ))}
      </div>
    </div>
  );
}
