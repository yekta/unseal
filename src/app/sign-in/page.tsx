import { Link } from "@tanstack/react-router";

export default function SignInPage() {
  return (
    <div className="w-full flex-1 px-5 pt-12 pb-18 h-screen min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl">Sign in to continue</h1>
      <Link
        to={"/"}
        className="bg-c-primary hover:bg-c-primary-hover text-c-bg px-5 py-3 mt-5 
        cursor-default rounded-lg font-bold overflow-hidden relative"
      >
        Go Home
      </Link>
    </div>
  );
}
