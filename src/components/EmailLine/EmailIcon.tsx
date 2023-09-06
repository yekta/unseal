import IconBuilding from "@components/icons/IconBuilding";
import IconSchool from "@components/icons/IconSchool";
import IconTerminal from "@components/icons/IconTerminal";
import IconWork from "@components/icons/IconWork";

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
    <IconSchool className={`${classes} w-6 h-6 flex-shrink-0`} />
  ) : type === "terminal" ? (
    <IconTerminal className={`${classes} w-6 h-6 flex-shrink-0`} />
  ) : type === "building" ? (
    <IconBuilding className={`${classes} w-6 h-6 flex-shrink-0`} />
  ) : (
    <IconWork className={`${classes} w-6 h-6 flex-shrink-0`} />
  );
};

export default EmailIcon;
