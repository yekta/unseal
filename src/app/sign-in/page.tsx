import Button from "@components/utils/Button";
import Input from "@components/utils/Input";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorLine } from "@components/utils/ErrorLine";
import { useMutation } from "@tanstack/react-query";

export default function SignInPage() {
  return (
    <div className="w-full flex-1 px-5 py-20 min-h-screen flex flex-col items-center overflow-auto">
      <div className="w-full max-w-xs flex flex-col items-center justify-center my-auto">
        <h1 className="font-bold text-2xl">Sign in to continue</h1>
        <SignInForm className="mt-5" />
        <Link
          to={"/"}
          className="w-full text-center bg-c-on-bg/0 hover:bg-c-on-bg/6 hover:text-c-on-bg text-c-on-bg/50 px-5 py-3 mt-5
          cursor-default rounded-lg font-bold overflow-hidden relative"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

function SignInForm({ className }: { className?: string }) {
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

  const { mutate: signIn, isLoading: isSignInLoading } = useMutation(_signIn, {
    onSuccess: () => {
      console.log("success");
    },
    onError: () => {
      console.log("error");
    },
  });

  const onSubmit = (data: TFormData) => {
    console.log(data);
    signIn();
  };

  async function _signIn() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full flex flex-col ${className}`}
    >
      <Input
        id="email"
        register={register}
        type="text"
        placeholder="Email"
        disabled={isSignInLoading}
      />
      <Input
        id="password"
        register={register}
        type="password"
        placeholder="Password"
        className="mt-2"
        disabled={isSignInLoading}
      />
      {errors.email ? (
        <ErrorLine className="mt-1.5">{errors.email.message}</ErrorLine>
      ) : errors.password ? (
        <ErrorLine className="mt-1.5">{errors.password.message}</ErrorLine>
      ) : null}
      <Button type="submit" className="mt-3" isLoading={isSignInLoading}>
        Sign In
      </Button>
    </form>
  );
}
