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
        d="M15.43 11.35v.16c2.02.46 3.35 1.75 3.35 3.73 0 3.54-3.24 4.87-6.6 4.87-2.18 0-5.06-.09-7.01-.16.04-.46.2-1.26.37-1.65.36-.12 1.22-.25 1.68-.32V5.76c-.51-.02-1.15-.09-1.64-.16a7.4 7.4 0 0 1-.02-1.75c2.02-.13 4.12-.23 5.93-.23 3.61 0 6.44 1.36 6.44 4.26a3.5 3.5 0 0 1-2.5 3.47ZM10 12.48v5.75c.62.07 1.29.1 1.88.1 2.56 0 4.03-.86 4.03-2.93 0-2-1.7-2.92-3.98-2.92H10Zm0-7.02v5.27h1.84c2.1 0 3.29-.73 3.29-2.69 0-1.75-1.57-2.64-3.89-2.64-.3 0-.87.02-1.24.06Z"
        fill="currentColor"
      />
    </svg>
  );
}
