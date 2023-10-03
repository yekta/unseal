import { useCommands } from "@components/CommandPalette/useCommands";
import { useHotkeys } from "@ts/hooks/useHotkeys";
import React from "react";

export default function GeneralHotkeyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { commandsForHotkeyBinding } = useCommands("");
  useHotkeys(
    commandsForHotkeyBinding.map((c) => ({
      hotkey: c.hotkey!,
      callback: c.onClick,
      options: { enableOnInput: c.isHotkeyEnabledInInput === true },
    }))
  );
  return children;
}
