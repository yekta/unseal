import Compose from "@components/Compose/Compose";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

export default function ComposeButtonWithModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="text-c-notification-blue bg-c-notification-blue/15 rounded-lg 
          px-3 py-2 font-semibold cursor-default transition hover:bg-c-notification-blue/25"
        >
          Compose
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <div className="fixed left-0 top-0 w-full h-full flex flex-col items-center overflow-hidden">
          <Dialog.Overlay className="absolute left-0 top-0 w-full h-full bg-c-barrier/25 z-[100]" />
          <Dialog.Content
            className="z-[101] absolute left-0 top-0 w-full h-full 
            overflow-hidden flex flex-row justify-center"
          >
            <div className="w-full h-full flex justify-center overflow-auto py-24">
              <div
                className="my-auto flex flex-col items-center bg-c-bg-secondary 
                rounded-xl w-full max-w-6xl h-[calc((100vh-12rem)*0.9)] min-h-[30rem]"
              >
                <Compose />
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
