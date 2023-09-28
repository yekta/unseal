import { isComposeOpenAtom } from "@ts/stores/compose";
import { useAtom } from "jotai";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

export default function GeneralHotkeyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isComposeOpen, setIsComposeOpen] = useAtom(isComposeOpenAtom);
  useHotkeys(["c"], () => setIsComposeOpen(true), { enabled: !isComposeOpen });
  return children;
}
