import { iconDefaultClassName } from "@components/icons/constants";
import {
  CommandLineIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  RocketLaunchIcon,
  TrophyIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { TAccountAvatarIcon } from "@ts/email";

export default function AccountAvatarIcon({
  type,
  className = iconDefaultClassName,
}: {
  type: TAccountAvatarIcon;
  className?: string;
}) {
  if (type === "command-line") return <CommandLineIcon className={className} />;
  if (type === "school") return <AcademicCapIcon className={className} />;
  if (type === "work") return <BriefcaseIcon className={className} />;
  if (type === "building") return <BuildingLibraryIcon className={className} />;
  if (type === "rocket") return <RocketLaunchIcon className={className} />;
  if (type === "trophy") return <TrophyIcon className={className} />;
  return <StopIcon className={className} />;
}
