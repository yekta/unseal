import Button from "@components/utils/Buttons/Button";
import { ErrorLine } from "@components/utils/ErrorLine";
import Input from "@components/utils/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function AuthForm({ className }: { className?: string }) {
  type TFormState = "sign-in" | "sign-up";
  const [formState, setFormState] = useState<TFormState>("sign-in");

  const schema = z.object({
    email: z.string().email("Enter a valid email."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(64, "Password must be at most 64 characters."),
  });

  type TFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
  });

  const signIn = async (_: TFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const signUp = async (_: TFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const { mutate: signInMutate, isLoading: isSignInLoading } = useMutation(
    signIn,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        console.log("success");
      },
    }
  );

  const { mutate: signUpMutate, isLoading: isSignUpLoading } = useMutation(
    signUp,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        console.log("success");
      },
    }
  );

  const onSubmit = (data: TFormData) => {
    if (formState === "sign-in") {
      signInMutate(data);
    } else {
      signUpMutate(data);
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center ${
        className ? className : ""
      }`}
    >
      <h1 className="font-bold text-2xl">
        {formState === "sign-in" ? "Sign in to continue" : "Create an account"}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col mt-6"
      >
        <Input
          id="email"
          register={register}
          type="text"
          placeholder="Email"
          disabled={
            (formState === "sign-in" && isSignInLoading) ||
            (formState === "sign-up" && isSignUpLoading)
          }
        />
        <Input
          id="password"
          register={register}
          type="password"
          placeholder="Password"
          className="mt-1.5"
          disabled={
            (formState === "sign-in" && isSignInLoading) ||
            (formState === "sign-up" && isSignUpLoading)
          }
        />
        {errors.email ? (
          <ErrorLine className="mt-1.5">{errors.email.message}</ErrorLine>
        ) : errors.password ? (
          <ErrorLine className="mt-1.5">{errors.password.message}</ErrorLine>
        ) : null}
        <Button
          type="submit"
          className="mt-3"
          isLoading={
            (formState === "sign-in" && isSignInLoading) ||
            (formState === "sign-up" && isSignUpLoading)
          }
        >
          {formState === "sign-in" ? "Sign in" : "Create Account"}
        </Button>
      </form>
      <div className="w-full flex flex-wrap items-center justify-center mt-5">
        <p className="text-c-on-bg/75">
          {formState === "sign-in" ? "No account?" : "Have an account?"}
        </p>
        <button
          className="text-c-primary px-1ch py-2 -m-0.4ch enabled:hover:bg-c-primary/15 focus-visible:bg-c-primary/15
          rounded-lg cursor-default"
          onClick={() =>
            setFormState(formState === "sign-in" ? "sign-up" : "sign-in")
          }
          disabled={
            (formState === "sign-in" && isSignInLoading) ||
            (formState === "sign-up" && isSignUpLoading)
          }
        >
          {formState === "sign-in" ? "Create an account" : "Sign in"}
        </button>
      </div>
    </div>
  );
}
