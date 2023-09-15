import Compose from "@components/Compose/Compose";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function ComposeButtonWithModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="text-c-primary bg-c-primary/10 rounded-lg flex items-center justify-center
          px-3 py-2 font-semibold cursor-default transition hover:bg-c-primary/20 gap-2"
        >
          <PencilIcon className="w-5 h-5 -ml-0.25" />
          <p>Compose</p>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <div className="fixed left-0 top-0 w-full h-full flex flex-col items-center overflow-hidden">
          <Dialog.Overlay
            className="absolute left-0 top-0 w-full h-full bg-c-barrier/80 
            z-[100] overflow-auto flex flex-row justify-center py-24"
          >
            <div className="md:px-4 max-w-6xl w-full my-auto flex flex-col items-center">
              <Dialog.Content
                className="flex flex-col items-center bg-c-bg-secondary
                rounded-xl shadow-xl shadow-c-shadow/[var(--o-shadow-strongest)] w-full h-[calc((100vh-12rem)*0.95)] min-h-[25rem]"
              >
                <Compose />
              </Dialog.Content>
            </div>
          </Dialog.Overlay>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
