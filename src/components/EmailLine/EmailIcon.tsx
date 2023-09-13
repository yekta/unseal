import {
  CommandLineIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

export interface EmailIconProps {
  type: "school" | "work" | "terminal" | "building";
  color: "red" | "lime" | "lightblue" | "yellow";
}

const EmailIcon = ({ type, color }: EmailIconProps) => {
  const classes =
    color === "lime"
      ? "text-c-icon-lime"
      : color === "lightblue"
      ? "text-c-icon-lightblue"
      : color === "yellow"
      ? "text-c-icon-yellow"
      : "text-c-icon-red";

  return type === "school" ? (
    <AcademicCapIcon className={`${classes} w-6 h-6 flex-shrink-0`} />
  ) : type === "terminal" ? (
    <CommandLineIcon className={`${classes} w-6 h-6 flex-shrink-0`} />
  ) : type === "building" ? (
    <BuildingLibraryIcon className={`${classes} w-6 h-6 flex-shrink-0`} />
  ) : (
    <BriefcaseIcon className={`${classes} w-6 h-6 flex-shrink-0`} />
  );
};

export default EmailIcon;
