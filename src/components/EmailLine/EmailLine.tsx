import Link from "next/link";
import EmailIcon from "./EmailIcon";
import { getRelativeDate } from "@ts/helpers/getRelativeDate";
import { usePathname } from "next/navigation";
import { TEmail } from "@ts/email";
import { getAccountIdFromPathname } from "@ts/helpers/getAccountIdFromPathname";
import { getPathnameWithAccount } from "@ts/helpers/getPathnameWithAccount";

export function EmailLine({
  id,
  sender,
  title,
  body,
  date,
  isRead,
  account,
}: TEmail) {
  const pathname = usePathname();
  const accountId = getAccountIdFromPathname(pathname);
  const href = `${getPathnameWithAccount(
    `/inbox/${id}`,
    accountId
  )}?from=${encodeURIComponent(pathname)}`;
  return (
    <Link
      href={href}
      className="w-full flex flex-row justify-center items-center group 
      cursor-default select-none"
    >
      <div className="w-full flex flex-row items-center md:py-px">
        <div
          className={`flex flex-col flex-1 md:flex-row md:items-center md:justify-between px-4 py-3.5
          group-hover:bg-c-primary/[var(--o-primary-highlight)] relative ${
            !isRead ? "bg-c-bg-secondary" : ""
          }
          overflow-hidden md:rounded-xl z-0`}
        >
          <div className="w-full md:w-60 flex items-center gap-2.5">
            <NotificationDot isRead={isRead} />
            <EmailIcon
              type={account.iconType}
              color={account.iconColor}
            ></EmailIcon>
            <p className="flex-1 font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis text-base">
              {sender}
            </p>
            <p className="md:hidden w-16 text-right text-c-on-bg/60 text-base">
              {getRelativeDate(date)}
            </p>
          </div>
          {/* Desktop */}
          <p className="hidden md:block whitespace-nowrap flex-1 overflow-hidden overflow-ellipsis text-c-on-bg/60 text-base">
            <span className="text-c-on-bg">{title}</span>
            <span className="text-c-on-bg/30 px-0.25ch"> | </span>
            <span className="text-c-on-bg/60">{body}</span>
          </p>
          <p className="hidden md:block w-18 text-right text-c-on-bg/60 text-base">
            {getRelativeDate(date)}
          </p>
          {/* Mobile */}
          <p className="md:hidden w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-c-on-bg mt-1 text-base">
            {title}
          </p>
          <p className="md:hidden w-full whitespace-nowrap overflow-hidden overflow-ellipsis text-c-on-bg/60 mt-1 text-base">
            {body}
          </p>
        </div>
      </div>
    </Link>
  );
}

const NotificationDot = ({
  isRead,
  className,
}: {
  isRead: boolean;
  className?: string;
}) => (
  <div
    className={`w-1.5 h-1.5 md:w-3px md:h-4.5 md:absolute md:left-0 md:top-1/2 transform md:-translate-y-1/2 
    rounded-full flex-shrink-0 ${
      isRead ? "bg-c-notification-blue/0 hidden" : "bg-c-notification-blue"
    } ${className ?? ""}`}
  />
);
