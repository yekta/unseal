"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { isCommandPaletteOpenAtom } from "@components/CommandPalette/commandPaletteSettings";
import { useAtom } from "jotai";
import CommandPalette from "@components/CommandPalette/CommandPalette";
import { useHotkeys } from "@ts/hooks/useHotkeys";

export default function CommandPaletteModal() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useAtom(
    isCommandPaletteOpenAtom
  );
  useHotkeys([
    {
      hotkey: ["mod+k"],
      callback: () => setIsCommandPaletteOpen(!isCommandPaletteOpen),
      options: {
        enableOnInput: true,
      },
    },
  ]);

  return (
    <Dialog.Root
      onOpenChange={setIsCommandPaletteOpen}
      open={isCommandPaletteOpen}
    >
      <Dialog.Portal>
        <div className="z-[100] fixed left-0 top-0 w-full h-full flex flex-col items-center overflow-hidden">
          <Dialog.Overlay
            className={`absolute left-0 top-0 w-full h-full
              overflow-auto flex flex-col items-center py-18 px-3 md:px-12`}
          >
            <Dialog.Content
              className="w-full flex flex-col max-w-2xl flex-1 justify-start my-auto
              max-h-[22.8rem] min-h-[12.7rem] relative"
            >
              <Dialog.Title className="sr-only">Command Palette</Dialog.Title>
              <Dialog.Description className="sr-only">
                Search for commands
              </Dialog.Description>
              <CommandPalette />
            </Dialog.Content>
          </Dialog.Overlay>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
