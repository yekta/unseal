"use client";

import EmailIcon from "@components/EmailList/EmailLine/EmailIcon";
import { TIconColor, TIconType, accounts } from "@ts/email";
import { useClickOutside } from "@ts/hooks/useClickOutside";
import { isSidebarOpenAtom } from "@components/navigation/navigation";
import { useAtom } from "jotai";
import ScrollArea from "@components/utils/ScrollArea";
import { Link, LinkPropsOptions } from "@tanstack/react-router";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const ref = useClickOutside<HTMLDivElement>({
    handler: () => setIsSidebarOpen(false),
    exclude: ["#sidebar-toggle-button"],
  });
  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
      className="h-full flex flex-col group w-2 absolute left-0 top-0 z-10"
    >
      <div
        className={`h-full transition ${
          isSidebarOpen
            ? "translate-x-0 shadow-c-shadow/[var(--o-shadow-strong)]"
            : "-translate-x-full shadow-c-shadow/0"
        }
        w-64 overflow-hidden border-r-2 bg-c-bg border-c-bg-border flex flex-col absolute 
        left-0 top-0 shadow-xl`}
      >
        <ScrollArea
          className="w-full flex-1 flex flex-col items-start justify-start"
          viewportClass="pt-1.5 pb-24"
        >
          <LinkLine
            to={`/`}
            text="All Inboxes"
            iconType="inbox"
            iconColor="on-bg"
          />
          <div className="w-full px-3 py-1.5">
            <div className="w-full h-2px rounded-full bg-c-bg-border"></div>
          </div>
          {accounts.map((account) => (
            <LinkLine
              key={account.id}
              to={`/account/$accountId`}
              params={{ accountId: account.id }}
              text={account.title}
              iconType={account.iconType}
              iconColor={account.iconColor}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
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
      {(route) => (
        <div
          className={`w-full flex flex-row items-center px-3 py-2.5 rounded-lg gap-2 ${
            route.isActive
              ? "bg-c-bg-highlight-active"
              : "group-hover/link:bg-c-bg-highlight-hover"
          } group-focus-visible/link:ring-2 ring-c-primary/[var(--o-primary-focus-visible)]`}
        >
          <EmailIcon
            isActive={route.isActive}
            sizeClasses="w-5 h-5"
            type={iconType}
            color={iconColor}
            fadeOnPassive="light"
          />
          <p
            className={`flex-1 font-medium min-w-0 whitespace-nowrap 
            overflow-hidden overflow-ellipsis transition break-all
            ${route.isActive ? "text-c-on-bg" : "text-c-on-bg/75"}`}
          >
            {text}
          </p>
        </div>
      )}
    </Link>
  );
}
