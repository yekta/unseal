import { iconDefaultClassName } from "@components/icons/constants";
import React from "react";

export default function IconH1({
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
        d="M13.78 5.85v11.71c.71.05 1.68.19 2.28.32a6 6 0 0 1 .11 2.12h-8.4c.05-.57.35-1.59.56-2.05.44-.13 1.38-.32 1.91-.39V5.86H7.69c-.05.48-.19 1.4-.3 1.86-.83.27-1.89.32-2.67.32V3.69h14.6v4.42c-.87 0-1.9-.1-2.69-.32-.13-.5-.27-1.38-.32-1.94h-2.53Z"
        fill="currentColor"
      />
    </svg>
  );
}
