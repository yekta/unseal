import EmailIcon from "@components/EmailList/EmailLine/EmailIcon";
import { TIconColor, TIconType, accounts } from "@ts/email";
import { isSidebarOpenAtom } from "@components/navigation/navigation";
import { useAtom } from "jotai";
import ScrollArea from "@components/utils/ScrollArea";
import { Link, LinkPropsOptions } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Bars4Icon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function SidebarButtonWithModal({
  sidebarContainerRef,
}: {
  sidebarContainerRef: React.MutableRefObject<HTMLDivElement>;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  return (
    <Dialog.Root onOpenChange={setIsSidebarOpen} open={isSidebarOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="touch-manipulation py-1.5 px-0.75 flex cursor-default group electron-no-drag-zone"
        >
          <div
            className="p-1 flex items-center justify-center rounded-lg group-hover:bg-c-bg-highlight-hover
            group-focus-visible:ring-2 ring-c-primary/[var(--o-primary-focus-visible)]"
          >
            <Bars4Icon
              className={`text-c-on-bg w-8 h-8 transform transition ${
                isSidebarOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal container={sidebarContainerRef.current} forceMount>
        <Transition.Root show={isSidebarOpen}>
          <Dialog.Overlay
            className={`absolute left-0 top-0 w-full h-full z-50 data-[state=closed]:pointer-events-none
              overflow-hidden flex flex-col justify-start items-start`}
          >
            <Transition.Child
              as={Fragment}
              enterFrom="-translate-x-full"
              leaveTo="-translate-x-full"
            >
              <Dialog.Content asChild>
                <nav
                  onMouseLeave={() => setIsSidebarOpen(false)}
                  className="h-full transition transform bg-c-bg shadow-c-shadow/[var(--o-shadow-strong)]
                  w-64 overflow-hidden border-r-2 border-c-bg-border flex flex-col 
                  shadow-xl"
                >
                  <Dialog.Title className="sr-only">Sidebar</Dialog.Title>
                  <Dialog.Description className="sr-only">
                    Navigate to different inboxes
                  </Dialog.Description>
                  <ScrollArea
                    className="w-full flex-1 flex flex-col items-start justify-start"
                    viewportClass="pt-1.5 pb-24"
                  >
                    <ul className="w-full flex flex-col">
                      <li className="w-full">
                        <LinkLine
                          to={`/`}
                          text="All Inboxes"
                          iconType="inbox"
                          iconColor="on-bg"
                        />
                      </li>
                    </ul>
                    <div className="w-full px-3 py-1.5">
                      <div className="w-full h-2px rounded-full bg-c-bg-border"></div>
                    </div>
                    <ul className="w-full flex flex-col">
                      {accounts.map((account) => (
                        <li key={account.id} className="w-full">
                          <LinkLine
                            to={`/account/$accountId`}
                            params={{ accountId: account.id }}
                            text={account.title}
                            iconType={account.iconType}
                            iconColor={account.iconColor}
                          />
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </nav>
              </Dialog.Content>
            </Transition.Child>
          </Dialog.Overlay>
        </Transition.Root>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function LinkLine({
  text,
  iconType,
  iconColor,
  to,
  params,
}: {
  text: string;
  iconType: TIconType;
  iconColor: TIconColor;
  to: LinkPropsOptions["to"];
  params?: LinkPropsOptions["params"];
}) {
  return (
    <Link
      className="w-full group/link px-1.5 py-px flex flex-row cursor-default"
      to={to}
      params={params}
    >
      {({ isActive }) => (
        <div
          className={`w-full flex flex-row items-center px-3 py-2.5 rounded-lg gap-2 ${
            isActive
              ? "bg-c-bg-highlight-active"
              : "group-hover/link:bg-c-bg-highlight-hover"
          } group-focus-visible/link:ring-2 ring-c-primary/[var(--o-primary-focus-visible)]`}
        >
          <EmailIcon
            isActive={isActive}
            sizeClasses="w-5 h-5"
            type={iconType}
            color={iconColor}
            fadeOnPassive="light"
          />
          <p
            className={`flex-1 font-medium min-w-0 whitespace-nowrap 
            overflow-hidden overflow-ellipsis transition break-all
            ${isActive ? "text-c-on-bg" : "text-c-on-bg/75"}`}
          >
            {text}
          </p>
        </div>
      )}
    </Link>
  );
}
