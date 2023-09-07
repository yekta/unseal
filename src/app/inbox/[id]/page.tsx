import { emails } from "@ts/email";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const email = emails.find((email) => email.id === id);
  return (
    <div className="w-full flex-1 flex flex-row items-start justify-center">
      <Link
        href="/"
        className="flex-1 min-w-[4rem] min-h-full cursor-default"
      />
      <div className="w-full max-w-6xl flex flex-col md:px-2 relative pt-6 pb-24">
        <div className="w-full bg-c-bg-secondary flex flex-col py-6 px-10 rounded-xl">
          <h1 className="w-full font-bold text-3xl">{email?.title}</h1>
          <p className="mt-2">{email?.body}</p>
        </div>
      </div>
      <Link
        href="/"
        className="flex-1 min-w-[4rem] min-h-full cursor-default"
      />
    </div>
  );
}
