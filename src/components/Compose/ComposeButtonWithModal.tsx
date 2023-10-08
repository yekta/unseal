import Compose from "@components/Compose/Compose";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import IconPenOnPaper from "@components/icons/IconPenOnPaper";
import { isComposeOpenAtom } from "@components/Compose/composeSettings";
import { useAtom } from "jotai";

export default function ComposeButtonWithModal() {
  const [isComposeOpen, setIsComposeOpen] = useAtom(isComposeOpenAtom);
  return (
    <Dialog.Root onOpenChange={setIsComposeOpen} open={isComposeOpen}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setIsComposeOpen(true)}
          className="py-1.5 px-0.75 flex cursor-default group"
        >
          <div
            className="p-1.5 flex items-center justify-center rounded-lg group-hover:bg-c-bg-highlight-hover
            group-focus-visible:ring-2 ring-c-primary/[var(--o-primary-focus-visible)]"
          >
            <IconPenOnPaper
              className={`text-c-on-bg w-7 h-7 transform transition`}
            />
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <div className="z-[100] fixed left-0 top-0 w-full h-full flex flex-col items-center overflow-hidden">
          <Dialog.Overlay
            className={`absolute left-0 top-0 w-full h-full bg-c-barrier/[var(--o-barrier)] 
            overflow-auto flex flex-row justify-center py-18`}
          >
            <div className="md:px-4 max-w-6xl w-full my-auto flex flex-col items-center">
              <Dialog.Content
                className={`flex flex-col items-center bg-c-bg-secondary rounded-xl 
                shadow-xl shadow-c-shadow/[var(--o-shadow-strong)] w-full h-[calc((100vh-9rem)*0.95)] min-h-[25rem]`}
              >
                <Dialog.Title className="sr-only">Compose</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Compose a new email
                </Dialog.Description>
                <Compose />
              </Dialog.Content>
            </div>
          </Dialog.Overlay>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
