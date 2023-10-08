import { NoSymbolIcon } from "@heroicons/react/24/outline";

export type TEmailProvider = "gmail" | "outlook";

export default function IconEmailProvider({
  type,
  className,
}: {
  type: TEmailProvider;
  className?: string;
}) {
  if (type === "outlook")
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
          d="M3.5 18.495V5.346L13.503 3.41v17.183L3.5 18.495Zm5.97-3.728c.288-.145.537-.36.724-.623.45-.643.673-1.417.635-2.2a3.46 3.46 0 0 0-.614-2.139 1.913 1.913 0 0 0-1.601-.81 2.005 2.005 0 0 0-1.684.849 3.6 3.6 0 0 0-.636 2.219 3.35 3.35 0 0 0 .623 2.107 1.958 1.958 0 0 0 1.62.809c.323.007.643-.066.932-.212Zm4.666-7.714v3.361l1.175.74c.043.01.087.01.13 0l5.055-3.409a.72.72 0 0 0-.589-.692h-5.771Zm0 4.615 1.072.736a.32.32 0 0 0 .333 0c-.184.111 4.954-3.3 4.954-3.3v6.177a.863.863 0 0 1-.914.954h-5.446v-4.567Zm-5.55-1.55a.987.987 0 0 0-.872.515 2.535 2.535 0 0 0-.322 1.36c-.025.475.087.946.322 1.358a.981.981 0 0 0 1.701.014c.232-.41.342-.88.316-1.35.027-.486-.08-.97-.307-1.4a.942.942 0 0 0-.838-.497Z"
          fill="#0072C6"
        />
      </svg>
    );

  if (type === "gmail")
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
          d="M7.09 18.718v-6.954L4.935 9.79 3 8.695v8.796c0 .679.55 1.227 1.227 1.227h2.864Z"
          fill="#4285F4"
        />
        <path
          d="M16.91 18.718h2.863c.679 0 1.227-.55 1.227-1.227V8.696L18.81 9.95l-1.9 1.814v6.954Z"
          fill="#34A853"
        />
        <path
          d="m7.09 11.764-.293-2.717.294-2.601L12 10.128l4.909-3.682.328 2.46-.328 2.858-4.91 3.682-4.908-3.682Z"
          fill="#EA4335"
        />
        <path
          d="M16.91 6.446v5.318L21 8.696V7.059c0-1.518-1.732-2.383-2.945-1.473l-1.146.86Z"
          fill="#FBBC04"
        />
        <path
          d="m3 8.696 1.881 1.41 2.21 1.658V6.446l-1.146-.86C4.73 4.677 3 5.543 3 7.06v1.637Z"
          fill="#C5221F"
        />
      </svg>
    );

  return <NoSymbolIcon className={`text-black ${className ?? ""}`} />;
}
