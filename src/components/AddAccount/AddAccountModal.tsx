import * as Dialog from "@radix-ui/react-dialog";
import { atom, useAtom } from "jotai";
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
    title: "Microsoft",
    Icon: ({ className }: { className: string }) =>
      IconEmailProvider({ type: "microsoft", className }),
  },
];

export default function AddAccountModal() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useAtom(
    isAddAccountModalOpenAtom
  );
  return (
    <Dialog.Root onOpenChange={setIsAccountModalOpen} open={isAccountModalOpen}>
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
                        <div className="w-14 h-14 rounded-lg -mt-1">
                          <Icon className="w-full h-full" />
                        </div>
                        <h3 className="mt-1 font-medium w-full whitespace-nowrap text-center overflow-hidden overflow-ellipsis">
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
