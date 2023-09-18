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

type TFadeOnPassive = "normal" | "light";

export default function EmailIcon({
  type,
  color = "on-bg",
  sizeClasses = "w-5 h-5",
  isActive,
  fadeOnPassive,
}: {
  type?: TIconType;
  color?: TIconColor;
  sizeClasses?: string;
  isActive?: boolean;
  fadeOnPassive?: TFadeOnPassive;
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
      ? "text-c-icon-lime/80"
      : color === "blue"
      ? "text-c-icon-blue/80"
      : color === "yellow"
      ? "text-c-icon-yellow/80"
      : color === "green"
      ? "text-c-icon-green/80"
      : color === "red"
      ? "text-c-icon-red/80"
      : color === "purple"
      ? "text-c-icon-purple/80"
      : color === "on-bg"
      ? "text-c-on-bg/55"
      : "text-c-on-bg/55";

  const fadedLightColorClasses =
    color === "lime"
      ? "text-c-icon-lime/85"
      : color === "blue"
      ? "text-c-icon-blue/85"
      : color === "yellow"
      ? "text-c-icon-yellow/85"
      : color === "green"
      ? "text-c-icon-green/85"
      : color === "red"
      ? "text-c-icon-red/85"
      : color === "purple"
      ? "text-c-icon-purple/85"
      : color === "on-bg"
      ? "text-c-on-bg/75"
      : "text-c-on-bg/75";

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
          fadedLightColorClasses={fadedLightColorClasses}
        />
      ) : type === "terminal" ? (
        <IconSet
          PassiveIcon={CommandLineIcon}
          ActiveIcon={CommandLineIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
          fadedLightColorClasses={fadedLightColorClasses}
        />
      ) : type === "building" ? (
        <IconSet
          PassiveIcon={BuildingLibraryIcon}
          ActiveIcon={BuildingLibraryIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
          fadedLightColorClasses={fadedLightColorClasses}
        />
      ) : type === "work" ? (
        <IconSet
          PassiveIcon={BriefcaseIcon}
          ActiveIcon={BriefcaseIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
          fadedLightColorClasses={fadedLightColorClasses}
        />
      ) : type === "rocket" ? (
        <IconSet
          PassiveIcon={RocketLaunchIcon}
          ActiveIcon={RocketLaunchIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
          fadedLightColorClasses={fadedLightColorClasses}
        />
      ) : type === "trophy" ? (
        <IconSet
          PassiveIcon={TrophyIcon}
          ActiveIcon={TrophyIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
          fadedLightColorClasses={fadedLightColorClasses}
        />
      ) : type === "inbox" ? (
        <IconSet
          PassiveIcon={InboxIcon}
          ActiveIcon={InboxIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
          fadedLightColorClasses={fadedLightColorClasses}
        />
      ) : type === "unread" ? (
        <IconSet
          PassiveIcon={EnvelopeIcon}
          ActiveIcon={EnvelopeIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
          fadedLightColorClasses={fadedLightColorClasses}
        />
      ) : type === "favorites" ? (
        <IconSet
          PassiveIcon={StarIcon}
          ActiveIcon={StarIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
          fadedLightColorClasses={fadedLightColorClasses}
        />
      ) : (
        <IconSet
          PassiveIcon={InboxIcon}
          ActiveIcon={InboxIconSolid}
          isActive={isActive}
          fadeOnPassive={fadeOnPassive}
          colorClasses={colorClasses}
          fadedColorClasses={fadedColorClasses}
          fadedLightColorClasses={fadedLightColorClasses}
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
  fadedLightColorClasses,
}: {
  PassiveIcon: React.ComponentType<any>;
  ActiveIcon: React.ComponentType<any>;
  isActive?: boolean;
  fadeOnPassive?: TFadeOnPassive;
  colorClasses: string;
  fadedColorClasses: string;
  fadedLightColorClasses: string;
}) {
  const iconClasses = "w-full h-full absolute transition left-0 top-0";
  const shownIconClasses = "opacity-100";
  const hiddenIconClasses = "opacity-0";

  return (
    <>
      <PassiveIcon
        className={`${iconClasses} ${
          fadeOnPassive === "light"
            ? fadedLightColorClasses
            : fadeOnPassive === "normal"
            ? fadedColorClasses
            : colorClasses
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
