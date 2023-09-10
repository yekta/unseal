"use client";
import { emails } from "@ts/email";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const email = emails.find((email) => email.id === id);
  const router = useRouter();
  useHotkeys("esc", () => router.push("/"));
  useHotkeys(["arrowLeft", "arrowUp"], () => {
    if (!email) return;
    const index = emails.indexOf(email);
    if (index <= 0) return;
    const nextId = emails[index - 1].id;
    router.push(`/inbox/${nextId}`);
  });
  useHotkeys(["arrowRight", "arrowDown"], () => {
    if (!email) return;
    const index = emails.indexOf(email);
    if (index >= emails.length - 1) return;
    const nextId = emails[index + 1].id;
    router.push(`/inbox/${nextId}`);
  });

  return (
    <div className="w-full flex-1 flex flex-row items-start justify-center">
      <Link
        href="/"
        className="flex-1 min-w-[4rem] min-h-full cursor-default"
      />
      <div className="w-full max-w-6xl flex md:px-4 flex-col relative pt-6 pb-24">
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
