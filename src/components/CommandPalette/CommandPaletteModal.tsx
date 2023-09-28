"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { isCommandPaletteOpenAtom } from "@components/CommandPalette/commandPaletteSettings";
import { useAtom } from "jotai";
import CommandPalette from "@components/CommandPalette/CommandPalette";
import { useHotkeys } from "react-hotkeys-hook";

export default function CommandPaletteModal() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useAtom(
    isCommandPaletteOpenAtom
  );
  useHotkeys(["mod+k"], () => setIsCommandPaletteOpen(!isCommandPaletteOpen), {
    enableOnFormTags: true,
  });
  return (
    <Dialog.Root
      onOpenChange={setIsCommandPaletteOpen}
      open={isCommandPaletteOpen}
    >
      <Dialog.Portal>
        <div className="z-[100] fixed left-0 top-0 w-full h-full flex flex-col items-center overflow-hidden">
          <Dialog.Overlay
            className={`absolute left-0 top-0 w-full h-full
              overflow-auto flex flex-row items-start justify-center py-18 px-3 md:px-12`}
          >
            <div className="max-w-2xl my-auto w-full flex flex-col items-center relative">
              <Dialog.Content
                className={`flex flex-col items-center bg-c-bg-command-palette rounded-xl relative
                shadow-3xl overflow-hidden z-0 shadow-c-shadow/[var(--o-shadow-command-palette)] w-full h-[calc((100vh-9rem)*0.6)] min-h-[18rem]`}
              >
                <CommandPalette />
              </Dialog.Content>
            </div>
          </Dialog.Overlay>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
