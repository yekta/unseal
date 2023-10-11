import { SignInForm } from "@components/AuthForm/SignInForm";
import { SignUpForm } from "@components/AuthForm/SignUpForm";
import { useState } from "react";

export function AuthForm({ className }: { className?: string }) {
  type TFormState = "sign-in" | "sign-up";
  const [authFlowState, setAuthFlowState] = useState<TFormState>("sign-in");

  return (
    <div
      className={`w-full flex flex-col items-center ${
        className ? className : ""
      }`}
    >
      {authFlowState === "sign-in" ? (
        <SignInForm
          onCreateAccountClicked={() => setAuthFlowState("sign-up")}
        />
      ) : (
        <SignUpForm onSignInClicked={() => setAuthFlowState("sign-in")} />
      )}
    </div>
  );
}
