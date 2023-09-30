import { isComposeOpenAtom } from "@components/Compose/composeSettings";
import IconPenOnPaper from "@components/icons/IconPenOnPaper";
import {
  Cog6ToothIcon,
  EnvelopeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  StarIcon,
  MoonIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { useAtom, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { isCommandPaletteOpenAtom } from "@components/CommandPalette/commandPaletteSettings";
import Fuse from "fuse.js";
import { useAccounts } from "@ts/hooks/useAccounts";
import AccountAvatarIcon from "@components/icons/AccountAvatarIcon";

const fuseOptions = {
  keys: ["title", "description", "tags"],
};

export function useCommands(searchQuery: string) {
  const router = useRouter();
  const pathname = usePathname();
  const [isComposeOpen, setIsComposeOpen] = useAtom(isComposeOpenAtom);
  const setIsCommandPaletteOpen = useSetAtom(isCommandPaletteOpenAtom);
  const { accounts } = useAccounts();

  const commands: TCommand[] = useMemo(
    () => [
      {
        title: "Compose",
        description: "Compose a new email",
        tags: ["compose", "new", "email"],
        Icon: IconPenOnPaper,
        onClick: () => setIsComposeOpen(true),
        shouldFilterOut: () => isComposeOpen,
      },
      {
        title: "Search Emails",
        description: "Search your emails",
        tags: ["search", "find", "sift"],
        Icon: MagnifyingGlassIcon,
        onClick: () => null,
      },
      {
        title: "Go to All Inboxes",
        description: "Go to all inboxes",
        tags: ["inbox", "all inboxes"],
        Icon: InboxIcon,
        onClick: () => router.push("/"),
        shouldFilterOut: () => pathname === "/" && !isComposeOpen,
      },
      {
        title: "Go to Unread",
        description: "Go to your unread emails",
        tags: ["unread", "unopened"],
        Icon: EnvelopeIcon,
        onClick: () => router.push("/view/unread"),
        shouldFilterOut: () => pathname === "/view/unread",
      },
      {
        title: "Go to Favorites",
        description: "Go to your favorite emails",
        tags: ["starred", "favorite"],
        Icon: StarIcon,
        onClick: () => router.push("/view/favorites"),
        shouldFilterOut: () => pathname === "/view/favorites",
      },
      {
        title: "Settings",
        description: "Go to settings",
        tags: ["settings", "preferences"],
        Icon: Cog6ToothIcon,
        onClick: () => router.push("/settings"),
        shouldFilterOut: () => pathname === "/settings",
      },
      {
        title: "Toggle Dark Mode",
        description: "Toggle dark mode",
        tags: ["theme", "dark", "light"],
        Icon: MoonIcon,
        onClick: () => null,
      },
      {
        title: "Go to Archived",
        description: "Go to archived",
        tags: ["archived"],
        Icon: ArchiveBoxIcon,
        onClick: () => null,
        shouldFilterOut: () => pathname === "/view/archived",
      },
      ...(accounts?.map((a) => ({
        title: `Go to Inbox: ${a.title}`,
        description: `Go to Inbox: ${a.title}`,
        tags: [a.email, a.title],
        Icon: ({ className }: { className?: string }) =>
          AccountAvatarIcon({ type: a.iconType, className }),
        onClick: () => router.push(`/account/${a.id}`),
        shouldFilterOut: () => pathname === `/account/${a.id}`,
      })) ?? []),
    ],
    [pathname, isComposeOpen, accounts]
  );

  const commandsSimple: TCommandSimple[] = useMemo(
    () =>
      commands.map((c) => ({
        title: c.title,
        description: c.description,
        tags: c.tags,
      })),
    [commands]
  );

  const fuse = useMemo(
    () => new Fuse(commandsSimple, fuseOptions),
    [commandsSimple, fuseOptions]
  );

  const finalCommands = useMemo(() => {
    if (searchQuery === "" || searchQuery === undefined) {
      return commands.filter((c) => !c.shouldFilterOut || !c.shouldFilterOut());
    }
    const searchResults = fuse.search(searchQuery);
    const searched = searchResults.map(
      (r) => commands.find((c) => c.title === r.item.title)!
    );
    const filtered = searched.filter(
      (c) => c.shouldFilterOut === undefined || !c.shouldFilterOut()
    );
    return filtered;
  }, [commands, searchQuery]);

  const executeCommand = (command: TCommand) => {
    command.onClick();
    if (isComposeOpen) setIsComposeOpen(false);
    setIsCommandPaletteOpen(false);
  };

  return {
    commands: finalCommands,
    executeCommand,
  };
}

interface TCommandSimple {
  title: string;
  description: string;
  tags: string[];
}

interface TCommand extends TCommandSimple {
  Icon: React.ComponentType<any>;
  onClick: () => void;
  shouldFilterOut?: () => boolean;
}
