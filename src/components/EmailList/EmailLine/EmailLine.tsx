import Link from "next/link";
import EmailIcon from "./EmailIcon";
import { getRelativeDate } from "@ts/helpers/getRelativeDate";
import { usePathname, useSearchParams } from "next/navigation";
import { TEmail } from "@ts/email";
import { getAccountIdFromPathname } from "@ts/helpers/getAccountIdFromPathname";
import { getPathnameWithAccount } from "@ts/helpers/getPathnameWithAccount";
import { getSearchParamsStr } from "@ts/helpers/getSearchParamsStr";
import {
  ArchiveBoxArrowDownIcon,
  ClockIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { StarIcon as StarIconFilled } from "@heroicons/react/24/solid";

export function EmailLine({
  id,
  sender,
  title,
  body,
  date,
  isRead,
  account,
  isFavorited,
}: TEmail) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsStr = getSearchParamsStr(searchParams);
  const accountId = getAccountIdFromPathname(pathname);
  const href = `${getPathnameWithAccount(
    `/inbox/${id}`,
    accountId
  )}?from=${encodeURIComponent(pathname + searchParamsStr)}`;
  return (
    <div className="w-full relative group">
      <Link
        href={href}
        className="w-full flex flex-row justify-center items-center
        cursor-default select-none relative"
      >
        <div className="w-full flex flex-row items-center md:py-px">
          <div
            className={`w-full flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3.5
            group-hover:bg-c-bg-highlight group-focus-within:bg-c-bg-highlight relative ${
              !isRead ? "bg-c-bg-unread" : ""
            }
            md:rounded-xl z-0`}
          >
            <div className="w-full md:w-60 flex items-center gap-2 md:gap-2.5">
              <div
                className={`w-2 h-2 md:absolute md:-left-4.5
                rounded-full flex-shrink-0 relative bg-c-notification ${
                  isRead && "hidden"
                }`}
              />
              <EmailIcon
                type={account.iconType}
                color={account.iconColor}
              ></EmailIcon>
              <p
                className={`flex-1 whitespace-nowrap overflow-hidden overflow-ellipsis text-base
              text-c-on-bg font-medium pr-4 md:pr-8`}
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
      <ul
        className="absolute right-0 top-0 h-full hidden md:group-hover:flex
          md:group-focus-within:flex
          z-10 pr-[calc(0.25rem-1px)] pl-10 bg-gradient-to-l 
          from-c-bg-highlight from-[calc(100%-2rem)] to-c-bg-highlight/0
          pointer-events-none group-hover:pointer-events-auto rounded-r-xl"
      >
        <li className="h-full">
          <IconButton Icon={isRead ? EnvelopeIcon : EnvelopeOpenIcon} />
        </li>
        <li className="h-full">
          <IconButton
            Icon={isFavorited ? StarIconFilled : StarIcon}
            iconClass={
              isFavorited
                ? "text-c-favorite/75 group-hover/icon-button:text-c-favorite"
                : undefined
            }
          />
        </li>
        <li className="h-full">
          <IconButton Icon={ClockIcon} />
        </li>
        <li className="h-full">
          <IconButton Icon={ArchiveBoxArrowDownIcon} />
        </li>
        <li className="h-full">
          <IconButton Icon={TrashIcon} />
        </li>
      </ul>
    </div>
  );
}

function IconButton({
  onClick,
  Icon,
  iconClass = "",
}: {
  onClick?: () => void;
  Icon: React.ComponentType<any>;
  iconClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-default h-full flex items-center justify-center py-1 px-px 
      rounded-lg group/icon-button text-c-on-bg/75 hover:text-c-on-bg"
    >
      <div
        className="h-full p-2.5 flex items-center justify-center 
        rounded-lg group-hover/icon-button:bg-c-on-bg/8"
      >
        <Icon className={`w-6 h-6 ${iconClass}`} />
      </div>
    </button>
  );
}
