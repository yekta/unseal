import { iconDefaultClassName } from "@components/icons/constants";
import React from "react";

export default function IconItalic({
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
        d="m13.52 5.51-1.17 13c.64.04 1.4.11 1.93.22.07.3.02.97-.04 1.27H8.16c.07-.41.21-.9.35-1.22.41-.11 1.29-.25 1.77-.3l1.33-12.97c-.5-.02-1.3-.1-1.65-.16-.05-.35.02-1.06.09-1.31h5.43c.02.11.02.27.02.37 0 .25-.07.66-.16.92-.5.09-1.24.16-1.82.18Z"
        fill="currentColor"
      />
    </svg>
  );
}
