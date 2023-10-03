"use client";

import { isComposeOpenAtom } from "@components/Compose/composeSettings";
import IconPenOnPaper from "@components/icons/IconPenOnPaper";
import {
  Cog6ToothIcon,
  EnvelopeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  StarIcon,
  MoonIcon,
  SunIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { useAtom, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { isCommandPaletteOpenAtom } from "@components/CommandPalette/commandPaletteSettings";
import Fuse from "fuse.js";
import { useAccounts } from "@ts/hooks/useAccounts";
import AccountAvatarIcon from "@components/icons/AccountAvatarIcon";
import { useTheme } from "next-themes";
import IconSystemLight from "@components/icons/IconSystemLight";
import IconSystemDark from "@components/icons/IconSystemDark";

const fuseOptions = {
  keys: ["title", "description", "tags"],
};

export function useCommands(searchQuery: string) {
  const router = useRouter();
  const pathname = usePathname();
  const [isComposeOpen, setIsComposeOpen] = useAtom(isComposeOpenAtom);
  const setIsCommandPaletteOpen = useSetAtom(isCommandPaletteOpenAtom);
  const { accounts } = useAccounts();
  const { theme, setTheme, systemTheme } = useTheme();

  const commands: TCommand[] = useMemo<TCommand[]>(
    () => [
      {
        title: "Compose",
        description: "Compose a new email",
        tags: ["compose", "new", "email"],
        Icon: IconPenOnPaper,
        onClick: () => setIsComposeOpen(true),
        shouldFilterOut: () => isComposeOpen,
        hotkey: "c",
        isHotkeyGlobal: true,
        isHotkeyEnabled: () => !isComposeOpen,
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
        hotkey: "g i",
        isHotkeyGlobal: true,
      },
      {
        title: "Go to Unread",
        description: "Go to your unread emails",
        tags: ["unread", "unopened"],
        Icon: EnvelopeIcon,
        onClick: () => router.push("/view/unread"),
        shouldFilterOut: () => pathname === "/view/unread",
        hotkey: "g u",
        isHotkeyGlobal: true,
      },
      {
        title: "Go to Starred",
        description: "Go to your starred emails",
        tags: ["starred", "favorited"],
        Icon: StarIcon,
        onClick: () => router.push("/view/starred"),
        shouldFilterOut: () => pathname === "/view/starred",
        hotkey: "g s",
        isHotkeyGlobal: true,
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
        title:
          theme === "light" || (theme === "system" && systemTheme === "light")
            ? "Switch to Dark Mode"
            : "Switch to Light Mode",
        description:
          theme === "light" || (theme === "system" && systemTheme === "light")
            ? "Switch to Dark Mode"
            : "Switch to Light Mode",
        tags: ["theme", "dark", "light", "toggle theme"],
        Icon:
          theme === "light" || (theme === "system" && systemTheme === "light")
            ? MoonIcon
            : SunIcon,
        onClick: () =>
          setTheme(
            theme === "dark" || (theme === "system" && systemTheme === "dark")
              ? "light"
              : "dark"
          ),
      },
      {
        title: "Switch to System Theme",
        description: "Switch to System Theme",
        tags: ["theme", "dark", "light", "toggle theme", "system"],
        Icon: systemTheme === "light" ? IconSystemLight : IconSystemDark,
        onClick: () => setTheme("system"),
        shouldFilterOut: () => theme === "system",
      },
      {
        title: "Go to Archived",
        description: "Go to archived",
        tags: ["archived"],
        Icon: ArchiveBoxIcon,
        onClick: () => null,
        shouldFilterOut: () => pathname === "/view/archived",
      },
      ...(accounts?.map((a, i) => ({
        title: `Go to Inbox: ${a.title}`,
        description: `Go to Inbox: ${a.title}`,
        tags: [a.email, a.title],
        Icon: ({ className }: { className?: string }) =>
          AccountAvatarIcon({ type: a.iconType, className }),
        onClick: () => router.push(`/account/${a.id}`),
        shouldFilterOut: () => pathname === `/account/${a.id}`,
        hotkey: i < 9 ? `ctrl+${i + 1}` : undefined,
        isHotkeyGlobal: i < 9 ? true : false,
        isHotkeyEnabledInInput: true,
      })) ?? []),
    ],
    [pathname, isComposeOpen, accounts, theme, systemTheme]
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

  const commandsForHotkeyBinding = commands.filter(
    (c) =>
      c.hotkey !== undefined &&
      c.isHotkeyGlobal &&
      (c.isHotkeyEnabled === undefined || c.isHotkeyEnabled())
  );

  return {
    commands: finalCommands,
    commandsForHotkeyBinding,
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
  hotkey?: string;
  isHotkeyGlobal?: boolean;
  isHotkeyEnabled?: () => boolean;
  isHotkeyEnabledInInput?: boolean;
}
