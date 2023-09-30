"use client";

import EmailIcon from "@components/EmailList/EmailLine/EmailIcon";
import { TIconColor, TIconType, accounts } from "@ts/email";
import { useClickOutside } from "@ts/hooks/useClickOutside";
import { isSidebarOpenAtom } from "@components/navigation/navigation";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
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
        className={`h-full pt-1.5 pb-24 transition ${
          isSidebarOpen
            ? "translate-x-0 shadow-c-shadow/[var(--o-shadow-strong)]"
            : "-translate-x-full shadow-c-shadow/0"
        }
        w-64 overflow-auto border-r-2 bg-c-bg border-c-bg-secondary flex flex-col absolute 
        left-0 top-0 shadow-xl`}
      >
        <div className="w-full flex flex-col">
          <LinkLine
            href={`/`}
            text="All Inboxes"
            iconType="inbox"
            iconColor="on-bg"
            isActive={pathname === "/"}
          />
          <div className="w-full px-3 py-1.5">
            <div className="w-full h-2px rounded-full bg-c-bg-secondary"></div>
          </div>
          {accounts.map((account) => (
            <LinkLine
              key={account.id}
              href={`/account/${account.id}`}
              text={account.email}
              iconType={account.iconType}
              iconColor={account.iconColor}
              isActive={pathname === `/account/${account.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LinkLine({
  text,
  iconType,
  iconColor,
  href,
  isActive,
}: {
  text: string;
  iconType: TIconType;
  iconColor: TIconColor;
  href: string;
  isActive: boolean;
}) {
  return (
    <Link
      className="w-full group/link px-1.5 py-px overflow-hidden flex flex-row cursor-default"
      href={href}
    >
      <div
        className={`w-full flex flex-row items-center px-3 py-2.5 rounded-lg 
          group-hover/link:bg-c-bg-highlight-secondary gap-2 ${
            isActive ? "bg-c-bg-highlight" : ""
          }`}
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
          overflow-hidden overflow-ellipsis transition
          ${isActive ? "text-c-on-bg" : "text-c-on-bg/75"}`}
        >
          {text}
        </p>
      </div>
    </Link>
  );
}
