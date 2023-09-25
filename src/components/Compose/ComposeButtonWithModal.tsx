import Compose from "@components/Compose/Compose";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function ComposeButtonWithModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog.Root onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className="text-c-primary flex items-center justify-center
          font-semibold cursor-default group py-1.5 px-0.75"
        >
          <div
            className="flex items-center justify-center px-3 py-2 group-hover:bg-c-primary/15
            bg-c-primary/10 rounded-lg gap-2"
          >
            <PencilIcon className="w-5 h-5 -ml-0.25" />
            <p>Compose</p>
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <div className="z-[100] fixed left-0 top-0 w-full h-full flex flex-col items-center overflow-hidden">
          <Dialog.Overlay
            className={`absolute left-0 top-0 w-full h-full bg-c-barrier/80 
            overflow-auto flex flex-row justify-center py-18 transition ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="md:px-4 max-w-6xl w-full my-auto flex flex-col items-center">
              <Dialog.Content
                className={`flex flex-col items-center bg-c-bg-secondary rounded-xl 
                shadow-xl shadow-c-shadow/[var(--o-shadow-strong)] w-full h-[calc((100vh-9rem)*0.95)] min-h-[25rem]
                transition transform ${
                  isOpen ? "translate-y-0" : "translate-y-8"
                }`}
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
