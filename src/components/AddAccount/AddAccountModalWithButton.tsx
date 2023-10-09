import * as Dialog from "@radix-ui/react-dialog";
import { atom, useAtom } from "jotai";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import IconEmailProvider from "@components/icons/IconEmailProvider";

interface TEmailProvider {
  title: string;
  Icon: React.ComponentType<any>;
}

export const isAddAccountModalOpenAtom = atom(false);

const emailProviders: TEmailProvider[] = [
  {
    title: "Google",
    Icon: ({ className }: { className: string }) =>
      IconEmailProvider({ type: "google", className }),
  },
  {
    title: "Outlook",
    Icon: ({ className }: { className: string }) =>
      IconEmailProvider({ type: "outlook", className }),
  },
];

export default function AddAccountModalWithButton() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useAtom(
    isAddAccountModalOpenAtom
  );
  return (
    <Dialog.Root onOpenChange={setIsAccountModalOpen} open={isAccountModalOpen}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setIsAccountModalOpen(true)}
          className="py-1.5 px-0.75 flex cursor-default group"
        >
          <div
            className="p-1.5 flex items-center justify-center rounded-lg group-hover:bg-c-bg-highlight-hover
            group-focus-visible:ring-2 ring-c-primary/[var(--o-primary-focus-visible)]"
          >
            <UserPlusIcon
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
            <div className="md:px-4 max-w-3xl my-auto flex flex-col items-center">
              <Dialog.Content
                onOpenAutoFocus={(e) => e.preventDefault()}
                className={`flex flex-col items-center bg-c-bg-secondary rounded-xl 
                shadow-xl shadow-c-shadow/[var(--o-shadow-strong)] w-full p-4`}
              >
                <Dialog.Title className="sr-only">
                  Add an email account
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  Add an email account to your Unseal account
                </Dialog.Description>
                <div className="w-full flex flex-wrap justify-center items-center">
                  {emailProviders.map((provider) => {
                    const Icon = provider.Icon;
                    return (
                      <button
                        key={provider.title}
                        onClick={() => null}
                        className="flex flex-col items-center justify-center w-40 pt-5 p-4 hover:bg-c-on-bg/6 rounded-lg
                        focus-visible:ring-2 ring-c-primary/[var(--o-primary-focus-visible)] cursor-default"
                      >
                        <div className="w-16 h-16 rounded-lg -mt-2.5">
                          <Icon className="w-full h-full" />
                        </div>
                        <h3 className="font-medium w-full whitespace-nowrap text-center overflow-hidden overflow-ellipsis">
                          {provider.title}
                        </h3>
                      </button>
                    );
                  })}
                </div>
              </Dialog.Content>
            </div>
          </Dialog.Overlay>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
