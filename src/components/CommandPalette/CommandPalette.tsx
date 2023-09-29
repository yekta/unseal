import React, { useState } from "react";
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
import { useHotkeys } from "react-hotkeys-hook";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(0);

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

  const filteredCommands = commands
    .filter((c) => c.shouldFilterOut === undefined || !c.shouldFilterOut())
    .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

  useHotkeys(
    ["tab", "down"],
    () => setActiveIndex((activeIndex + 1) % filteredCommands.length),
    { enableOnFormTags: true, enabled: filteredCommands.length > 0 }
  );

  useHotkeys(
    ["shift+tab", "up"],
    () =>
      setActiveIndex(
        (activeIndex - 1 + filteredCommands.length) % filteredCommands.length
      ),
    { enableOnFormTags: true, enabled: filteredCommands.length > 0 }
  );

  const executeCommand = (command: TCommand) => {
    command.onClick();
    if (isComposeOpen) setIsComposeOpen(false);
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-start justify-start text-c-on-bg/50 overflow-hidden">
      <form
        className="w-full"
        onSubmit={() => executeCommand(filteredCommands[activeIndex || 0])}
      >
        <input
          autoComplete="off"
          autoCorrect="off"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (activeIndex !== 0) setActiveIndex(0);
          }}
          className="w-full font-medium px-5 text-lg py-3.5 bg-transparent text-c-on-bg 
            placeholder:text-c-on-bg/50 placeholder:font-normal overflow-ellipsis"
          placeholder="Search commands..."
        />
      </form>
      <div className="w-full h-2px bg-c-on-bg/6" />
      <ul
        onMouseLeave={() => setActiveIndex(0)}
        className="w-full flex flex-col overflow-auto group/command-list"
      >
        {filteredCommands.length < 1 && (
          <li className={`w-full text-left px-1.5 py-px pt-1.5`}>
            <div className="w-full flex items-center justify-start px-4 py-3">
              <MagnifyingGlassIcon className="w-5 h-5 flex-shrink-0" />
              <p
                className="px-3 text-c-on-bg/50 flex-shrink min-w-0 overflow-hidden 
                overflow-ellipsis whitespace-nowrap"
              >
                No results
              </p>
            </div>
          </li>
        )}
        {filteredCommands.length >= 1 &&
          filteredCommands.map((command, i) => {
            return (
              <li key={command.title} className="w-full">
                <button
                  onMouseEnter={() => setActiveIndex(i)}
                  tabIndex={-1}
                  onClick={() => executeCommand(command)}
                  className={`text-left w-full flex px-1.5 py-px group/button cursor-default ${
                    i === 0 && "pt-1.5"
                  }`}
                >
                  <div
                    className={`w-full flex items-center justify-start px-4 py-3 rounded-lg ${
                      activeIndex === i
                        ? "text-c-on-bg bg-c-on-bg/10"
                        : "text-c-on-bg/75"
                    }`}
                  >
                    <command.Icon className="w-5 h-5 flex-shrink-0" />
                    <p className="px-3 flex-shrink min-w-0 overflow-hidden overflow-ellipsis whitespace-nowrap">
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
