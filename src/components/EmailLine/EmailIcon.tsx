"use client";
import {
  CommandLineIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  RocketLaunchIcon,
  TrophyIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import {
  CommandLineIcon as CommandLineIconSolid,
  AcademicCapIcon as AcademicCapIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  BuildingLibraryIcon as BuildingLibraryIconSolid,
  RocketLaunchIcon as RocketLaunchIconSolid,
  TrophyIcon as TrophyIconSolid,
  InboxIcon as InboxIconSolid,
} from "@heroicons/react/24/solid";
import { TAccountIconColor, TAccountIconType } from "@ts/email";

export default function EmailIcon({
  type,
  color,
  sizeClasses = "w-5 h-5",
  isActive,
}: {
  type: TAccountIconType;
  color: TAccountIconColor;
  sizeClasses?: string;
  isActive?: boolean;
}) {
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

  return (
    <div className={`${classes} ${sizeClasses} flex-shrink-0 relative`}>
      {type === "school" ? (
        <IconSet
          PassiveIcon={AcademicCapIcon}
          ActiveIcon={AcademicCapIconSolid}
          isActive={isActive}
        />
      ) : type === "terminal" ? (
        <IconSet
          PassiveIcon={CommandLineIcon}
          ActiveIcon={CommandLineIconSolid}
          isActive={isActive}
        />
      ) : type === "building" ? (
        <IconSet
          PassiveIcon={BuildingLibraryIcon}
          ActiveIcon={BuildingLibraryIconSolid}
          isActive={isActive}
        />
      ) : type === "work" ? (
        <IconSet
          PassiveIcon={BriefcaseIcon}
          ActiveIcon={BriefcaseIconSolid}
          isActive={isActive}
        />
      ) : type === "rocket" ? (
        <IconSet
          PassiveIcon={RocketLaunchIcon}
          ActiveIcon={RocketLaunchIconSolid}
          isActive={isActive}
        />
      ) : type === "trophy" ? (
        <IconSet
          PassiveIcon={TrophyIcon}
          ActiveIcon={TrophyIconSolid}
          isActive={isActive}
        />
      ) : type === "inbox" ? (
        <IconSet
          PassiveIcon={InboxIcon}
          ActiveIcon={InboxIconSolid}
          isActive={isActive}
        />
      ) : (
        <IconSet
          PassiveIcon={InboxIcon}
          ActiveIcon={InboxIconSolid}
          isActive={isActive}
        />
      )}
    </div>
  );
}

function IconSet({
  PassiveIcon,
  ActiveIcon,
  isActive,
}: {
  PassiveIcon: React.ComponentType<any>;
  ActiveIcon: React.ComponentType<any>;
  isActive?: boolean;
}) {
  const iconClasses = "w-full h-full absolute transition left-0 top-0";
  const shownIconClasses = "opacity-100";
  const hiddenIconClasses = "opacity-0";

  return (
    <>
      <PassiveIcon
        className={`${iconClasses} ${
          !isActive ? shownIconClasses : hiddenIconClasses
        }`}
      />
      <ActiveIcon
        className={`${iconClasses} ${
          isActive ? shownIconClasses : hiddenIconClasses
        }`}
      />
    </>
  );
}
