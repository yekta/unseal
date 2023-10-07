import { TEmail } from "@ts/email";
import InboxHotkeyProvider from "@components/providers/InboxHotkeyProvider";
import { Link, LinkPropsOptions } from "@tanstack/react-router";

export default function EmailPage({
  email,
  prevLink,
  nextLink,
  fromLink,
}: {
  email: TEmail;
  prevLink?: LinkPropsOptions;
  nextLink?: LinkPropsOptions;
  fromLink: LinkPropsOptions;
}) {
  return (
    <InboxHotkeyProvider
      email={email}
      prevLink={prevLink}
      nextLink={nextLink}
      fromLink={fromLink}
    >
      <div className="w-full flex-1 flex flex-row items-start justify-center">
        <Link
          to={fromLink.to}
          params={fromLink.params}
          search={fromLink.search}
          className="flex-1 min-w-[4rem] min-h-full cursor-default md:-mr-12 z-10"
        />
        <div className="w-full max-w-6xl flex md:px-12 flex-col relative pt-8 pb-24 z-0">
          <div className="w-full bg-c-bg-secondary flex flex-col py-6 px-10 rounded-xl">
            <h1 className="w-full font-bold text-3xl">{email?.title}</h1>
            <p className="mt-2">{email?.body}</p>
          </div>
        </div>
        <Link
          to={fromLink.to}
          params={fromLink.params}
          search={fromLink.search}
          className="flex-1 min-w-[4rem] min-h-full cursor-default md:-ml-12 z-10"
        />
      </div>
    </InboxHotkeyProvider>
  );
}
