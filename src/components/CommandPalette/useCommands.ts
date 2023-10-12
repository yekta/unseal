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
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { useAtom, useSetAtom } from "jotai";
import { useMemo } from "react";
import { isCommandPaletteOpenAtom } from "@components/CommandPalette/commandPaletteSettings";
import Fuse from "fuse.js";
import { useAccounts } from "@ts/hooks/useAccounts";
import AccountAvatarIcon from "@components/icons/AccountAvatarIcon";
import IconSystemLight from "@components/icons/IconSystemLight";
import IconSystemDark from "@components/icons/IconSystemDark";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { useTheme } from "@components/providers/ThemeProvider";
import { isAddAccountModalOpenAtom } from "@components/AddAccount/AddAccountModal";

const fuseOptions = {
  keys: ["title", "description", "tags"],
};

export function useCommands(searchQuery: string) {
  const router = useRouter();
  const {
    location: { pathname },
  } = useRouterState();
  const [isComposeOpen, setIsComposeOpen] = useAtom(isComposeOpenAtom);
  const [_, setIsAddAccountOpen] = useAtom(isAddAccountModalOpenAtom);
  const setIsCommandPaletteOpen = useSetAtom(isCommandPaletteOpenAtom);
  const { accounts } = useAccounts();
  const { theme, setTheme, systemTheme, themeString } = useTheme();

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
        onClick: () => router.navigate({ to: "/" }),
        shouldFilterOut: () => pathname === "/" && !isComposeOpen,
        hotkey: "g i",
        isHotkeyGlobal: true,
      },
      {
        title: "Go to Unread",
        description: "Go to your unread emails",
        tags: ["unread", "unopened"],
        Icon: EnvelopeIcon,
        onClick: () => router.navigate({ to: "/view/unread" }),
        shouldFilterOut: () => pathname === "/view/unread",
        hotkey: "g u",
        isHotkeyGlobal: true,
      },
      {
        title: "Go to Starred",
        description: "Go to your starred emails",
        tags: ["starred", "favorited"],
        Icon: StarIcon,
        onClick: () => router.navigate({ to: "/view/starred" }),
        shouldFilterOut: () => pathname === "/view/starred",
        hotkey: "g s",
        isHotkeyGlobal: true,
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
        onClick: () =>
          router.navigate({
            to: `/account/$accountId`,
            params: { accountId: a.id },
          }),
        shouldFilterOut: () => pathname === `/account/${a.id}`,
        hotkey: i < 9 ? `mod+${i + 1}` : undefined,
        isHotkeyGlobal: i < 9 ? true : false,
        isHotkeyEnabledInInput: true,
      })) ?? []),
      {
        title: "Add Account",
        description: "Add a new account",
        tags: ["add", "new", "account"],
        Icon: UserPlusIcon,
        onClick: () => setIsAddAccountOpen(true),
      },
      {
        title: "Settings",
        description: "Go to settings",
        tags: ["settings", "preferences"],
        Icon: Cog6ToothIcon,
        onClick: () => router.navigate({ to: "/settings" }),
        shouldFilterOut: () => pathname === "/settings",
      },
      {
        title: "Switch to Dark Theme",
        badge: `Current: ${themeString}`,
        description: "Switch to dark theme",
        tags: [
          "dark mode",
          "dark theme",
          "toggle theme",
          "light mode",
          "light theme",
        ],
        Icon: MoonIcon,
        onClick: () => setTheme("dark"),
        shouldFilterOut: () => theme === "dark",
      },
      {
        title: "Switch to Light Theme",
        badge: `Current: ${themeString}`,
        description: "Switch to light theme",
        tags: [
          "light mode",
          "light theme",
          "toggle theme",
          "dark mode",
          "dark theme",
        ],
        Icon: SunIcon,
        onClick: () => setTheme("light"),
        shouldFilterOut: () => theme === "light",
      },
      {
        title: "Switch to System Theme",
        badge: `Current: ${themeString}`,
        description: "Switch to System Theme",
        tags: [
          "system mode",
          "toggle theme",
          "system mode",
          "dark theme",
          "light theme",
          "dark mode",
          "light mode",
        ],
        Icon: systemTheme === "light" ? IconSystemLight : IconSystemDark,
        onClick: () => setTheme("system"),
        shouldFilterOut: () => theme === "system",
      },
    ],
    [pathname, isComposeOpen, accounts, theme, systemTheme]
  );

  const commandsForHotkeyBinding = useMemo(
    () =>
      commands.filter(
        (c) =>
          c.hotkey !== undefined &&
          c.isHotkeyGlobal &&
          (c.isHotkeyEnabled === undefined || c.isHotkeyEnabled())
      ),
    [commands]
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
  badge?: string;
  Icon: React.ComponentType<any>;
  onClick: () => void;
  shouldFilterOut?: () => boolean;
  hotkey?: string;
  isHotkeyGlobal?: boolean;
  isHotkeyEnabled?: () => boolean;
  isHotkeyEnabledInInput?: boolean;
}
