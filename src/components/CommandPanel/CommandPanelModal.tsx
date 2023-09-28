"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { isCommandPanelOpenAtom } from "@components/CommandPanel/commandPanelSettings";
import { useAtom } from "jotai";
import CommandPanel from "@components/CommandPanel/CommandPanel";

export default function CommandPanelModal() {
  const [isCommandPanelOpen, setIsCommandPanelOpen] = useAtom(
    isCommandPanelOpenAtom
  );
  return (
    <Dialog.Root onOpenChange={setIsCommandPanelOpen} open={isCommandPanelOpen}>
      <Dialog.Portal>
        <div className="z-[100] fixed left-0 top-0 w-full h-full flex flex-col items-center overflow-hidden">
          <Dialog.Overlay
            className={`absolute left-0 top-0 w-full h-full
            overflow-auto flex flex-row items-start justify-center py-18 px-12`}
          >
            <div className="max-w-3xl my-auto w-full flex flex-col items-center">
              <Dialog.Content
                className={`flex flex-col items-center bg-c-bg-command-panel rounded-xl 
                shadow-3xl overflow-hidden z-0 shadow-c-shadow/[var(--o-shadow-command-panel)] w-full h-[calc((100vh-9rem)*0.6)] min-h-[18rem]`}
              >
                <CommandPanel />
              </Dialog.Content>
            </div>
          </Dialog.Overlay>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
