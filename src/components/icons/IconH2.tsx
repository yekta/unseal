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
        d="M13.4 8.65v9.42c.7.04 1.63.14 2.25.25.11.4.16 1.31.1 1.68H8.26c.02-.46.25-1.22.41-1.61.46-.14 1.38-.3 1.93-.34v-9.4H7.44c-.05.5-.2 1.47-.3 1.9-.58.17-1.4.21-2 .21V6.88h13.73v3.98c-.64 0-1.45-.07-2.02-.23-.12-.51-.26-1.43-.3-1.98H13.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
