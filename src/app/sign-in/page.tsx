import Button from "@components/utils/Buttons/Button";
import { Link } from "@tanstack/react-router";
import IconEmailProvider from "@components/icons/IconEmailProvider";

export default function SignInPage() {
  return (
    <div className="w-full flex-1 px-5 pt-12 pb-16 min-h-screen flex flex-col items-center overflow-auto">
      <div className="w-full max-w-xs flex flex-col items-center justify-center my-auto">
        <h1 className="font-bold text-2xl">Sign in to continue</h1>
        <div className="w-full flex flex-col gap-2.5 mt-5">
          <Button
            Icon={({ className }) =>
              IconEmailProvider({ type: "google", className })
            }
          >
            Sign in with Google
          </Button>
          <Button
            Icon={({ className }) =>
              IconEmailProvider({ type: "microsoft", className })
            }
          >
            Sign in with Microsoft
          </Button>
        </div>
        <Link
          to={"/"}
          className="w-full text-center bg-c-on-bg/0 hover:bg-c-on-bg/6 hover:text-c-on-bg text-c-on-bg/50 px-5 py-3.5 mt-5
          cursor-default rounded-lg font-bold overflow-hidden relative"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
