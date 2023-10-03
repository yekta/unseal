import { iconDefaultClassName } from "@components/icons/constants";
import React from "react";

export default function IconSystemDark({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.695 1.298a.37.37 0 0 0-.505-.27 5.186 5.186 0 1 0 6.782 6.782.37.37 0 0 0-.485-.484 4.444 4.444 0 0 1-5.814-5.813.37.37 0 0 0 .022-.215ZM5.25 2.25a3 3 0 0 0-3 3V15a3 3 0 0 0 3 3h3v.257a2.25 2.25 0 0 1-.66 1.592l-.62.62a.75.75 0 0 0 .53 1.281h9a.75.75 0 0 0 .53-1.28l-.62-.621a2.25 2.25 0 0 1-.66-1.592V18h3a3 3 0 0 0 3-3v-.75a.75.75 0 0 0-.75-.75H5.25a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5H10a.75.75 0 0 0 0-1.5H5.25ZM3.75 15v-.402a3 3 0 0 0 1.5.402h15a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5Zm6 3h4.5v.257a3.751 3.751 0 0 0 .573 1.993H9.177a3.753 3.753 0 0 0 .573-1.993V18Z"
        fill="currentColor"
      />
    </svg>
  );
}
