import React from "react";
import {
  EnvelopeIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import IconPenOnPaper from "@components/icons/IconPenOnPaper";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { isComposeOpenAtom } from "@components/Compose/composeSettings";
import { isCommandPanelOpenAtom } from "@components/CommandPanel/commandPanelSettings";

interface TCommand {
  title: string;
  description: string;
  Icon: React.ComponentType<any>;
  onClick: () => void;
}
export default function CommandPanel() {
  const router = useRouter();
  const setIsComposeOpen = useSetAtom(isComposeOpenAtom);
  const setIsCommandPanelOpen = useSetAtom(isCommandPanelOpenAtom);
  const commands: TCommand[] = [
    {
      title: "Compose",
      description: "Create a new email",
      Icon: IconPenOnPaper,
      onClick: () => setIsComposeOpen(true),
    },
    {
      title: "Search Emails",
      description: "Search your emails",
      Icon: MagnifyingGlassIcon,
      onClick: () => null,
    },
    {
      title: "Go to Unread",
      description: "Go to your unread emails",
      Icon: EnvelopeIcon,
      onClick: () => router.push("/view/unread"),
    },
    {
      title: "Go to Favorites",
      description: "Go to your favorite emails",
      Icon: StarIcon,
      onClick: () => router.push("/view/favorites"),
    },
  ];
  return (
    <div className="w-full flex-1 flex flex-col items-start justify-start text-c-on-bg/50">
      <div className="w-full relative">
        <input
          className="w-full font-medium px-5 text-lg py-3.5 bg-transparent text-c-on-bg 
          placeholder:text-c-on-bg/50 placeholder:font-normal overflow-ellipsis"
          placeholder="Search commands..."
        />
      </div>
      <ul className="w-full flex flex-col">
        {commands.map((command) => {
          return (
            <li className="w-full">
              <button
                onClick={() => {
                  command.onClick();
                  setIsCommandPanelOpen(false);
                }}
                className="w-full flex text-c-on-bg/75 focus:text-c-on-bg hover:text-c-on-bg px-1 py-px group"
              >
                <div
                  className="w-full flex items-center justify-start px-4 py-3 rounded-lg 
                  group-hover:bg-c-on-bg/10 group-focus:bg-c-on-bg/10"
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
