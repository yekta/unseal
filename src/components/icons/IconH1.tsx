import { iconDefaultClassName } from "@components/icons/constants";

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
        d="M14.17 4.78v14.25c.87.06 2.04.23 2.77.4.2.61.25 1.98.14 2.57H6.86c.06-.7.42-1.93.67-2.5.53-.16 1.68-.38 2.33-.47V4.78H6.75c-.06.59-.23 1.7-.37 2.27-1 .33-2.3.39-3.24.39v-5.3h17.78v5.38a12.5 12.5 0 0 1-3.28-.39c-.17-.61-.34-1.68-.4-2.35h-3.07Z"
        fill="currentColor"
      />
    </svg>
  );
}
