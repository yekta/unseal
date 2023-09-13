import Link from "next/link";
import EmailIcon, { EmailIconProps } from "./EmailIcon";
import { getRelativeDate } from "@ts/helpers/getRelativeDate";

export interface TEmailLineProps {
  id: string;
  sender: string;
  title: string;
  body: string;
  date: string;
  isRead: boolean;
  iconType: EmailIconProps["type"];
  iconColor: EmailIconProps["color"];
}

export function EmailLine({
  id,
  sender,
  title,
  body,
  date,
  isRead,
  iconType,
  iconColor,
}: TEmailLineProps) {
  return (
    <Link
      href={`/inbox/${id}`}
      className="w-full flex flex-row justify-center items-center group 
      cursor-default select-none"
    >
      <div className="w-full flex flex-row items-center md:py-px md:px-4">
        <div
          className={`flex flex-col flex-1 md:flex-row md:items-center md:justify-between px-4 py-3.5
          group-hover:bg-c-bg-highlight relative ${
            !isRead ? "bg-c-bg-secondary" : ""
          }
          overflow-hidden md:rounded-xl z-0`}
        >
          <div className="w-full md:w-60 flex items-center gap-2">
            <NotificationDot isRead={isRead} hideWhenRead />
            <EmailIcon type={iconType} color={iconColor}></EmailIcon>
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
  hideWhenRead = false,
  className,
}: {
  isRead: boolean;
  className?: string;
  hideWhenRead?: boolean;
}) => (
  <div
    className={`w-1.5 h-1.5 md:w-3px md:h-4.5 md:absolute md:left-0 md:top-1/2 transform md:-translate-y-1/2 
    rounded-full flex-shrink-0 ${
      isRead ? "bg-c-notification-blue/0" : "bg-c-notification-blue"
    } ${className ?? ""} ${hideWhenRead && isRead ? "hidden" : ""}`}
  />
);
