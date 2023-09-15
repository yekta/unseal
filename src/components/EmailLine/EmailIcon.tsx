import {
  CommandLineIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  RocketLaunchIcon,
  TrophyIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { TAccountIconColor, TAccountIconType } from "@ts/email";

const EmailIcon = ({
  type,
  color,
  sizeClasses = "w-5 h-5",
}: {
  type: TAccountIconType;
  color: TAccountIconColor;
  sizeClasses?: string;
}) => {
  const classes =
    color === "lime"
      ? "text-c-icon-lime"
      : color === "blue"
      ? "text-c-icon-blue"
      : color === "yellow"
      ? "text-c-icon-yellow"
      : color === "green"
      ? "text-c-icon-green"
      : color === "red"
      ? "text-c-icon-red"
      : color === "purple"
      ? "text-c-icon-purple"
      : color === "on-bg"
      ? "text-c-on-bg"
      : "text-c-on-bg";

  return type === "school" ? (
    <AcademicCapIcon className={`${classes} ${sizeClasses} flex-shrink-0`} />
  ) : type === "terminal" ? (
    <CommandLineIcon className={`${classes} ${sizeClasses} flex-shrink-0`} />
  ) : type === "building" ? (
    <BuildingLibraryIcon
      className={`${classes} ${sizeClasses} flex-shrink-0`}
    />
  ) : type === "work" ? (
    <BriefcaseIcon className={`${classes} ${sizeClasses} flex-shrink-0`} />
  ) : type === "rocket" ? (
    <RocketLaunchIcon className={`${classes} ${sizeClasses} flex-shrink-0`} />
  ) : type === "trophy" ? (
    <TrophyIcon className={`${classes} ${sizeClasses} flex-shrink-0`} />
  ) : type === "inbox" ? (
    <InboxIcon className={`${classes} ${sizeClasses} flex-shrink-0`} />
  ) : (
    <InboxIcon className={`${classes} ${sizeClasses} flex-shrink-0`} />
  );
};

export default EmailIcon;
