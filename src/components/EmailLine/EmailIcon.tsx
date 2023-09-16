"use client";
import {
  CommandLineIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  RocketLaunchIcon,
  TrophyIcon,
  InboxIcon,
  EnvelopeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  CommandLineIcon as CommandLineIconSolid,
  AcademicCapIcon as AcademicCapIconSolid,
  BriefcaseIcon as BriefcaseIconSolid,
  BuildingLibraryIcon as BuildingLibraryIconSolid,
  RocketLaunchIcon as RocketLaunchIconSolid,
  TrophyIcon as TrophyIconSolid,
  InboxIcon as InboxIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import { TIconColor, TIconType } from "@ts/email";

export default function EmailIcon({
  type,
  color = "on-bg",
  sizeClasses = "w-5 h-5",
  isActive,
  fadeOnPassive = false,
}: {
  type?: TIconType;
  color?: TIconColor;
  sizeClasses?: string;
  isActive?: boolean;
  fadeOnPassive?: boolean;
}) {
  const colorClasses =
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

  const fadedColorClasses =
    color === "lime"
      ? "text-c-icon-lime/75"
      : color === "blue"
      ? "text-c-icon-blue/75"
      : color === "yellow"
      ? "text-c-icon-yellow/75"
      : color === "green"
      ? "text-c-icon-green/75"
      : color === "red"
      ? "text-c-icon-red/75"
      : color === "purple"
      ? "text-c-icon-purple/75"
      : color === "on-bg"
      ? "text-c-on-bg/60"
      : "text-c-on-bg/60";

  return (
    <div className={`${sizeClasses} flex-shrink-0 relative`}>
      {type === "school" ? (
        <IconSet
          PassiveIcon={AcademicCapIcon}
          ActiveIcon={AcademicCapIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
        />
      ) : type === "terminal" ? (
        <IconSet
          PassiveIcon={CommandLineIcon}
          ActiveIcon={CommandLineIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
        />
      ) : type === "building" ? (
        <IconSet
          PassiveIcon={BuildingLibraryIcon}
          ActiveIcon={BuildingLibraryIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
        />
      ) : type === "work" ? (
        <IconSet
          PassiveIcon={BriefcaseIcon}
          ActiveIcon={BriefcaseIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
        />
      ) : type === "rocket" ? (
        <IconSet
          PassiveIcon={RocketLaunchIcon}
          ActiveIcon={RocketLaunchIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
        />
      ) : type === "trophy" ? (
        <IconSet
          PassiveIcon={TrophyIcon}
          ActiveIcon={TrophyIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
        />
      ) : type === "inbox" ? (
        <IconSet
          PassiveIcon={InboxIcon}
          ActiveIcon={InboxIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
        />
      ) : type === "unread" ? (
        <IconSet
          PassiveIcon={EnvelopeIcon}
          ActiveIcon={EnvelopeIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
        />
      ) : type === "favorites" ? (
        <IconSet
          PassiveIcon={StarIcon}
          ActiveIcon={StarIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
        />
      ) : (
        <IconSet
          PassiveIcon={InboxIcon}
          ActiveIcon={InboxIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
        />
      )}
    </div>
  );
}

function IconSet({
  PassiveIcon,
  ActiveIcon,
  isActive,
  fadeOnPassive,
  colorClasses,
  fadedColorClasses,
}: {
  PassiveIcon: React.ComponentType<any>;
  ActiveIcon: React.ComponentType<any>;
  isActive?: boolean;
  fadeOnPassive?: boolean;
  colorClasses: string;
  fadedColorClasses: string;
}) {
  const iconClasses = "w-full h-full absolute transition left-0 top-0";
  const shownIconClasses = "opacity-100";
  const hiddenIconClasses = "opacity-0";

  return (
    <>
      <PassiveIcon
        className={`${iconClasses} ${
          fadeOnPassive ? fadedColorClasses : colorClasses
        } ${!isActive ? shownIconClasses : hiddenIconClasses}`}
      />
      <ActiveIcon
        className={`${iconClasses} ${colorClasses} ${
          isActive ? shownIconClasses : hiddenIconClasses
        }`}
      />
    </>
  );
}
