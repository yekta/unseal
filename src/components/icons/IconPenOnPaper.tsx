import { iconDefaultClassName } from "@components/icons/constants";

export default function IconPenOnPaper({
  className = iconDefaultClassName,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.25 13v5.5003a2.25 2.25 0 0 1-2.25 2.25H5.5a2.25 2.25 0 0 1-2.25-2.25v-11.5a2.25 2.25 0 0 1 2.25-2.25H11m6.799-1.201a1.8754 1.8754 0 0 1 3.2012 1.326 1.875 1.875 0 0 1-.5492 1.326l-6.619 6.6189a4.4988 4.4988 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5004 4.5004 0 0 1 1.13-1.897l6.619-6.619Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
