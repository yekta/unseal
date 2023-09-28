import { isCommandPanelOpenAtom } from "@components/CommandPanel/commandPanelSettings";
import { isComposeOpenAtom } from "@components/Compose/composeSettings";
import { useAtom } from "jotai";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function GeneralHotkeyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isComposeOpen, setIsComposeOpen] = useAtom(isComposeOpenAtom);
  const [isCommandPanelOpen, setIsCommandPanelOpen] = useAtom(
    isCommandPanelOpenAtom
  );
  useHotkeys(["c"], () => setIsComposeOpen(true), {
    enabled: !isComposeOpen && !isCommandPanelOpen,
  });
  useHotkeys(["meta+k"], () => setIsCommandPanelOpen(true));
  return children;
}
