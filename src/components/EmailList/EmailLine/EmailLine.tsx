import EmailIcon from "./EmailIcon";
import { getRelativeDate } from "@ts/helpers/getRelativeDate";
import { TEmail } from "@ts/email";
import {
  ArchiveBoxArrowDownIcon,
  ClockIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { StarIcon as StarIconFilled } from "@heroicons/react/24/solid";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Link, useParams, useRouterState } from "@tanstack/react-router";

export function EmailLine({
  id,
  sender,
  title,
  body,
  date,
  isRead,
  account,
  isStarred,
}: TEmail) {
  const {
    location: { pathname, searchStr },
  } = useRouterState();
  const { accountId } = useParams({ from: "__root__" });
  return (
    <div className="w-full relative group">
      <Link
        to={
          accountId ? `/account/$accountId/inbox/$emailId` : "/inbox/$emailId"
        }
        params={{ emailId: id, accountId }}
        search={{ from: pathname + searchStr }}
        className="w-full flex flex-row justify-center items-center
        cursor-default select-none relative group/link peer"
      >
        <div className="w-full flex flex-row items-center md:py-px">
          <div
            className={`w-full flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3.5
            ring-0 group-focus-visible/link:ring-2 ring-c-primary/[var(--o-primary-focus-visible)] 
            relative ${
              !isRead
                ? "bg-c-bg-unread md:bg-transparent md:group-hover:bg-c-bg-highlight-hover"
                : "group-hover:bg-c-bg-highlight-hover"
            }
            md:rounded-xl z-0`}
          >
            <div className="w-full md:w-60 flex items-center gap-2 md:gap-2.5">
              <div
                className={`w-2 h-2 md:absolute md:-left-3.5
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
      <div
        className={`absolute right-px top-px h-[calc(100%-2px)] flex opacity-0 md:group-hover:opacity-100
        md:peer-focus-visible:opacity-100
        z-10 pr-[calc(0.25rem-1px)] pl-8 bg-gradient-to-l 
        from-[calc(100%-1.75rem)]
        from-c-bg to-c-bg/0 peer-hover:from-c-bg-highlight-hover peer-hover:to-c-bg-highlight-hover/0 
        hover:from-c-bg-highlight-hover hover:to-c-bg-highlight-hover/0
        pointer-events-none md:group-hover:pointer-events-auto md:peer-focus-visible:pointer-events-auto rounded-r-xl`}
      >
        <Tooltip.Provider delayDuration={250} skipDelayDuration={500}>
          <ul className="h-full flex flex-row">
            <li className="h-full">
              <IconButton
                Icon={isStarred ? StarIconFilled : StarIcon}
                label={isStarred ? "Starred" : "Not starred"}
                iconClass={
                  isStarred
                    ? "text-c-star/80 group-hover/icon-button:text-c-star"
                    : ""
                }
              />
            </li>
            <li className="h-full">
              <IconButton
                Icon={isRead ? EnvelopeIcon : EnvelopeOpenIcon}
                label={isRead ? "Mark as unread" : "Mark as read"}
              />
            </li>
            <li className="h-full">
              <IconButton Icon={ClockIcon} label={"Remind later"} />
            </li>
            <li className="h-full">
              <IconButton Icon={ArchiveBoxArrowDownIcon} label="Archive" />
            </li>
            <li className="h-full">
              <IconButton Icon={TrashIcon} label="Delete" />
            </li>
          </ul>
        </Tooltip.Provider>
      </div>
    </div>
  );
}

function IconButton({
  onClick,
  Icon,
  iconClass,
  label,
}: {
  onClick?: () => void;
  Icon: React.ComponentType<any>;
  iconClass?: string;
  label: string;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          tabIndex={-1}
          onClick={onClick}
          className="cursor-default h-full flex items-center justify-center py-1 px-px 
          rounded-lg group/icon-button text-c-on-bg/75 hover:text-c-on-bg"
        >
          <div
            className="h-full p-2.5 flex items-center justify-center 
            rounded-lg group-hover/icon-button:bg-c-on-bg/10"
          >
            <Icon className={`w-6 h-6 ${iconClass ?? ""}`} />
          </div>
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={"bottom"}
          className="rounded-md text-sm bg-c-tooltip-bg text-c-tooltip-on-bg font-medium px-2 py-0.75
          shadow-md shadow-c-shadow/[var(--o-shadow-strong)] data-[state=closed]:opacity-0"
          sideOffset={0}
        >
          {label}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
