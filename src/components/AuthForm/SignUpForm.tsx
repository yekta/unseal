import Button from "@components/utils/Buttons/Button";
import { ErrorLine } from "@components/utils/ErrorLine";
import Input from "@components/utils/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function SignUpForm({
  onSignInClicked,
}: {
  onSignInClicked: () => void;
}) {
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

  const signUp = async (_: TFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const { mutate: signUpMutate, isLoading: isSignUpLoading } = useMutation(
    signUp,
    {
      onMutate: () => {},
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        console.log("success");
      },
      onSettled: () => {},
    }
  );

  const onSubmit = (data: TFormData) => {
    signUpMutate(data);
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="w-full font-bold text-2xl text-center px-2">
        Create an account
      </h1>
      <p className="mt-2 text-c-on-bg/75 px-2">
        An Unseal account will let you sync your email accounts across devices.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col mt-6"
      >
        <Input
          id="email"
          register={register}
          type="text"
          placeholder="Email"
          disabled={isSignUpLoading}
        />
        <Input
          id="password"
          register={register}
          type="password"
          placeholder="Password"
          className="mt-1.5"
          disabled={isSignUpLoading}
        />
        {errors.email ? (
          <ErrorLine className="mt-1.5">{errors.email.message}</ErrorLine>
        ) : errors.password ? (
          <ErrorLine className="mt-1.5">{errors.password.message}</ErrorLine>
        ) : null}
        <Button type="submit" className="mt-3" disabled={isSignUpLoading}>
          Create Account
        </Button>
      </form>
      <div className="w-full flex flex-wrap items-center justify-center mt-4">
        <p className="text-c-on-bg/75 text-center">No account?</p>
        <button
          className="text-c-primary px-1ch py-2 -m-0.4ch enabled:hover:bg-c-primary/15 focus-visible:bg-c-primary/15
          rounded-lg cursor-default"
          onClick={() => onSignInClicked()}
          disabled={isSignUpLoading}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
