import { iconDefaultClassName } from "@components/icons/constants";
import React from "react";

export default function IconBold({
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
        d="M16.94 11.36v.25c2.33.59 3.87 2.16 3.87 4.51 0 4.48-4.23 6.08-8.54 6.08-2.66 0-6.64-.14-9.05-.28.06-.7.31-1.96.56-2.52a12.3 12.3 0 0 1 1.88-.42V5.08c-.59-.05-1.37-.16-1.85-.27a9 9 0 0 1-.03-2.6c2.64-.2 5.35-.37 7.65-.37 4.7 0 8.34 1.62 8.34 5.3 0 1.92-1.09 3.63-2.83 4.22Zm-6.97 1.68v6.36c.65.08 1.37.1 1.96.1 2.89 0 4.45-.92 4.45-3.21 0-2.24-1.93-3.25-4.5-3.25h-1.9Zm0-8.46v5.83h1.82c2.33 0 3.64-.79 3.64-3 0-1.96-1.65-2.94-4.31-2.94-.28 0-.87.06-1.15.11Z"
        fill="currentColor"
      />
    </svg>
  );
}
