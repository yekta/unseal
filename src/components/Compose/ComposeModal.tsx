import Compose from "@components/Compose/Compose";
import * as Dialog from "@radix-ui/react-dialog";
import { isComposeOpenAtom } from "@components/Compose/composeSettings";
import { useAtom } from "jotai";

export default function ComposeModal() {
  const [isComposeOpen, setIsComposeOpen] = useAtom(isComposeOpenAtom);
  return (
    <Dialog.Root onOpenChange={setIsComposeOpen} open={isComposeOpen}>
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
