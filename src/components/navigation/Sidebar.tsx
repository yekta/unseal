import EmailIcon from "@components/EmailLine/EmailIcon";
import { TAccountIconColor, TAccountIconType, accounts } from "@ts/email";
import Link from "next/link";
import React from "react";

function LinkLine({
  text,
  iconType,
  iconColor,
  href,
}: {
  text: string;
  iconType: TAccountIconType;
  iconColor: TAccountIconColor;
  href: string;
}) {
  return (
    <Link
      className="w-full group/link p-1 overflow-hidden flex flex-row cursor-default"
      href={href}
    >
      <div
        className="w-full flex flex-row items-center px-3 py-2.5 rounded-lg 
        transition group-hover/link:bg-c-bg-highlight gap-2"
      >
        <EmailIcon sizeClasses="w-5 h-5" type={iconType} color={iconColor} />
        <p className="flex-1 font-medium min-w-0 overflow-hidden overflow-ellipsis text-sm">
          {text}
        </p>
      </div>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col group w-2 absolute left-0 top-0 z-10">
      <div
        className="h-full pt-1 pb-24 transition -translate-x-full group-hover:translate-x-0
        w-64 overflow-auto border-r-2 bg-c-bg border-c-bg-secondary flex flex-col absolute 
        left-0 top-0 shadow-xl shadow-c-shadow/[var(--o-shadow-strongest)]"
      >
        <div className="w-full flex flex-col">
          <LinkLine
            href={`/`}
            text="All Inboxes"
            iconType="inbox"
            iconColor="on-bg"
          />
          <div className="w-full px-3 py-1">
            <div className="w-full h-2px rounded-full bg-c-bg-secondary"></div>
          </div>
          {accounts.map((account) => (
            <LinkLine
              href={`/account/${account.id}`}
              text={account.email}
              iconType={account.iconType}
              iconColor={account.iconColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
