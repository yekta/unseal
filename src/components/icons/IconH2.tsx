import { iconDefaultClassName } from "@components/icons/constants";
import React from "react";

export default function IconH2({
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
        d="M13.7 8.53v11.12c.87.05 1.99.17 2.74.3.14.48.2 1.6.11 2.05h-9.1c.03-.56.31-1.48.5-1.96.57-.17 1.69-.36 2.36-.42V8.52H6.45a27 27 0 0 1-.37 2.33c-.7.2-1.7.25-2.43.25V6.37h16.71v4.85c-.78 0-1.76-.09-2.46-.28-.14-.62-.3-1.74-.37-2.41H13.7Z"
        fill="currentColor"
      />
    </svg>
  );
}
