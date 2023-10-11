import { AuthForm } from "@components/AuthForm/AuthForm";
import { Link } from "@tanstack/react-router";

export default function SignInPage() {
  return (
    <div className="w-full flex-1 px-5 pt-8 pb-14 flex flex-col items-center overflow-auto">
      <div className="w-full max-w-xs flex flex-col items-center justify-center my-auto">
        <AuthForm />
        <Link
          to={"/"}
          className="w-full text-center bg-c-on-bg/0 hover:bg-c-on-bg/6 hover:text-c-on-bg text-c-on-bg/50 
          focus-visible:bg-c-on-bg/6 focus-visible:text-c-on-bg px-5 py-3.5 mt-6 cursor-default 
          rounded-lg font-semibold overflow-hidden relative"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
