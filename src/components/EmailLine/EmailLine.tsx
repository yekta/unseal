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
          className={`w-full flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3.5 md:py-4
          group-hover:bg-c-bg-highlight relative ${
            !isRead ? "bg-c-bg-unread" : ""
          }
          md:rounded-xl z-0`}
        >
          <div className="w-full md:w-60 flex items-center gap-2 md:gap-2.5">
            <div
              className={`w-2 h-2 md:absolute md:-left-4.5
                rounded-full flex-shrink-0 relative ${isRead && "hidden"}`}
            >
              <div className="w-full h-full rounded-full bg-c-notification/60 blur absolute left-0 top-0"></div>
              <div className={`w-full h-full rounded-full bg-c-notification`} />
            </div>
            <EmailIcon
              type={account.iconType}
              color={account.iconColor}
            ></EmailIcon>
            <p
              className={`flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis text-base
              text-c-on-bg font-medium`}
            >
              {sender}
            </p>
            <p
              className={`md:hidden w-16 text-right text-base text-c-on-bg/60`}
            >
              {getRelativeDate(date)}
            </p>
          </div>
          <p className="mt-0.5 md:mt-0 leading-relaxed md:leading-normal md:whitespace-nowrap flex-1 overflow-hidden overflow-ellipsis text-c-on-bg/60 text-base">
            <span
              className={`text-c-on-bg whitespace-nowrap overflow-hidden overflow-ellipsis`}
            >
              {title}
            </span>
            <br className="md:hidden" />
            <span
              className={`text-c-on-bg/30 px-0.75ch hidden md:inline-block`}
            >
              |
            </span>
            <span
              className={`text-c-on-bg/60 whitespace-nowrap overflow-hidden overflow-ellipsis`}
            >
              {body}
            </span>
          </p>
          <p
            className={`hidden md:block w-18 text-right text-base text-c-on-bg/60`}
          >
            {getRelativeDate(date)}
          </p>
        </div>
      </div>
    </Link>
  );
}
