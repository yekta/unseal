import { isCommandPaletteOpenAtom } from "@components/CommandPalette/commandPaletteSettings";
import { isComposeOpenAtom } from "@components/Compose/composeSettings";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function GeneralHotkeyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isComposeOpen, setIsComposeOpen] = useAtom(isComposeOpenAtom);
  const isCommandPaletteOpen = useAtomValue(isCommandPaletteOpenAtom);
  useHotkeys(["c"], () => setIsComposeOpen(true), {
    enabled: !isComposeOpen && !isCommandPaletteOpen,
  });
  return children;
}
