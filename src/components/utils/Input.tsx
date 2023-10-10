import { FieldValues, UseFormRegister } from "react-hook-form";

interface TInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: UseFormRegister<FieldValues>;
}

export default function Input(props: TInputProps) {
  const { className, register, ...rest } = props;
  const registerResult = register ? register(props.id) : {};
  return (
    <input
      {...rest}
      {...registerResult}
      className={`w-full bg-c-on-bg/6 focus:ring-1.5 ring-c-primary/30 
      enabled:hover:bg-c-on-bg/9 focus:bg-c-on-bg/9 placeholder:text-c-on-bg/50
      rounded-lg px-4 py-3.5 ${className}`}
    />
  );
}
