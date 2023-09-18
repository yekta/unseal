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
          className={`w-full flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3.5
          group-hover:bg-c-bg-highlight-secondary relative ${
            !isRead ? "bg-c-bg-highlight" : ""
          }
          md:rounded-xl z-0`}
        >
          <div className="w-full md:w-60 flex items-center gap-2 md:gap-2.5">
            <NotificationDot isRead={isRead} />
            <EmailIcon
              type={account.iconType}
              color={account.iconColor}
            ></EmailIcon>
            <p
              className={`flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis text-base
              ${
                isRead
                  ? "text-c-on-bg/75 font-medium"
                  : "text-c-on-bg font-semibold"
              }`}
            >
              {sender}
            </p>
            <p
              className={`md:hidden w-16 text-right text-base ${
                isRead ? "text-c-on-bg/55" : "text-c-on-bg"
              }`}
            >
              {getRelativeDate(date)}
            </p>
          </div>
          {/* Desktop */}
          <p className="hidden md:block whitespace-nowrap flex-1 overflow-hidden overflow-ellipsis text-c-on-bg/55 text-base">
            <span
              className={`${
                isRead
                  ? "text-c-on-bg/75 font-normal"
                  : "text-c-on-bg font-medium"
              }`}
            >
              {title}
            </span>
            <span className={`text-c-on-bg/25 px-0.3ch`}> | </span>
            <span
              className={`${isRead ? "text-c-on-bg/55" : "text-c-on-bg/75"}`}
            >
              {body}
            </span>
          </p>
          <p
            className={`hidden md:block w-18 text-right text-base ${
              isRead ? "text-c-on-bg/55" : "text-c-on-bg"
            }`}
          >
            {getRelativeDate(date)}
          </p>
          {/* Mobile */}
          <p
            className={`md:hidden w-full whitespace-nowrap overflow-hidden overflow-ellipsis mt-1 text-base
            text-c-on-bg ${
              isRead
                ? "text-c-on-bg/75 font-normal"
                : "text-c-on-bg font-medium"
            }`}
          >
            {title}
          </p>
          <p
            className={`md:hidden w-full whitespace-nowrap overflow-hidden overflow-ellipsis mt-1 text-base
            ${isRead ? "text-c-on-bg/55" : "text-c-on-bg/75"}`}
          >
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
    className={`w-2 h-2 md:absolute md:-left-4 md:top-1/2 transform md:-translate-y-1/2 
    rounded-full flex-shrink-0 ${
      isRead ? "bg-c-notification/0 hidden" : "bg-c-notification"
    } ${className ?? ""}`}
  />
);
