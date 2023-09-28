import React from "react";
import {
  EnvelopeIcon,
  MagnifyingGlassIcon,
  StarIcon,
  InboxIcon,
  Cog6ToothIcon as CogIcon,
} from "@heroicons/react/24/outline";
import IconPenOnPaper from "@components/icons/IconPenOnPaper";
import { usePathname, useRouter } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";
import { isComposeOpenAtom } from "@components/Compose/composeSettings";
import { isCommandPaletteOpenAtom } from "@components/CommandPalette/commandPaletteSettings";

interface TCommand {
  title: string;
  description: string;
  Icon: React.ComponentType<any>;
  onClick: () => void;
  shouldFilterOut?: () => boolean;
}
export default function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [isComposeOpen, setIsComposeOpen] = useAtom(isComposeOpenAtom);
  const setIsCommandPaletteOpen = useSetAtom(isCommandPaletteOpenAtom);
  const [searchQuery, setSearchQuery] = React.useState("");

  const commands: TCommand[] = [
    {
      title: "Compose",
      description: "Create a new email",
      Icon: IconPenOnPaper,
      onClick: () => setIsComposeOpen(true),
      shouldFilterOut: () => isComposeOpen,
    },
    {
      title: "Search Emails",
      description: "Search your emails",
      Icon: MagnifyingGlassIcon,
      onClick: () => null,
    },
    {
      title: "Go to All Inboxes",
      description: "Go to all inboxes",
      Icon: InboxIcon,
      onClick: () => router.push("/"),
      shouldFilterOut: () => pathname === "/",
    },
    {
      title: "Go to Unread",
      description: "Go to your unread emails",
      Icon: EnvelopeIcon,
      onClick: () => router.push("/view/unread"),
      shouldFilterOut: () => pathname === "/view/unread",
    },
    {
      title: "Go to Favorites",
      description: "Go to your favorite emails",
      Icon: StarIcon,
      onClick: () => router.push("/view/favorites"),
      shouldFilterOut: () => pathname === "/view/favorites",
    },
    {
      title: "Settings",
      description: "Go to your settings",
      Icon: CogIcon,
      onClick: () => router.push("/settings"),
      shouldFilterOut: () => pathname === "/settings",
    },
  ];

  const filteredCommands = React.useMemo(
    () =>
      commands
        .filter((c) => c.shouldFilterOut === undefined || !c.shouldFilterOut())
        .filter((c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    [searchQuery]
  );

  const executeCommand = (command: TCommand) => {
    command.onClick();
    if (isComposeOpen) setIsComposeOpen(false);
    setIsCommandPaletteOpen(false);
  };
  return (
    <div className="w-full flex-1 flex flex-col items-start justify-start text-c-on-bg/50 overflow-hidden">
      <div className="w-full relative">
        <form onSubmit={() => executeCommand(filteredCommands[0])}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full font-medium px-5 text-lg py-3.5 bg-transparent text-c-on-bg 
            placeholder:text-c-on-bg/50 placeholder:font-normal overflow-ellipsis"
            placeholder="Search commands..."
          />
        </form>
      </div>
      <ul className="w-full flex flex-col overflow-auto pb-12">
        {filteredCommands.length < 1 && (
          <li className="w-full text-left px-1.5 py-px">
            <div className="w-full flex items-center justify-start px-4 py-3">
              <MagnifyingGlassIcon className="w-5 h-5 flex-shrink-0" />
              <p className="px-3 text-c-on-bg/50">No results found</p>
            </div>
          </li>
        )}
        {filteredCommands.length >= 1 &&
          filteredCommands.map((command, i) => {
            return (
              <li key={command.title} className="w-full">
                <button
                  onClick={() => executeCommand(command)}
                  className="text-left w-full flex px-1.5 py-px group cursor-default"
                >
                  <div
                    className={`w-full flex items-center justify-start px-4 py-3 rounded-lg group-focus:text-c-on-bg group-hover:text-c-on-bg 
                  ${
                    i === 0
                      ? "bg-c-on-bg/8 text-c-on-bg group-hover:bg-c-on-bg/12 group-focus:bg-c-on-bg/12"
                      : "text-c-on-bg/75 group-hover:bg-c-on-bg/6 group-focus:bg-c-on-bg/6"
                  }`}
                  >
                    <command.Icon className="w-5 h-5 flex-shrink-0" />
                    <p className="px-3 flex-shrink min-w-0 overflow-hidden overflow-ellipsis">
                      {command.title}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
