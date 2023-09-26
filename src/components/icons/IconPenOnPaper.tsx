import { iconDefaultClassName } from "@components/icons/constants";
import React from "react";

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
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 0 1 2.652 2.652l-7.619 7.619a4.5 4.5 0 0 1-1.897 1.13L9 15l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l5.932-5.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
