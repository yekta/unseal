import { iconDefaultClassName } from "@components/icons/constants";

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
        d="m13.85 4.36-1.42 15.82c.78.06 1.7.14 2.35.28.08.36.03 1.18-.06 1.54h-7.4c.1-.5.26-1.1.43-1.48.5-.14 1.57-.31 2.16-.37l1.62-15.79c-.62-.03-1.6-.11-2.02-.2a5.8 5.8 0 0 1 .12-1.6h6.6c.03.15.03.34.03.46 0 .3-.08.8-.2 1.12-.61.1-1.5.2-2.2.22Z"
        fill="currentColor"
      />
    </svg>
  );
}
