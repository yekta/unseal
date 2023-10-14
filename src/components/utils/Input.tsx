import { FieldValues, UseFormRegister } from "react-hook-form";

interface TInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: UseFormRegister<FieldValues>;
  Icon?: React.ComponentType<any>;
}

export default function Input(props: TInputProps) {
  const { className, register, placeholder, Icon, ...rest } = props;
  const registerResult = register ? register(props.id) : {};
  return (
    <label className={`w-full relative ${className}`} htmlFor={rest.id}>
      <input
        {...rest}
        {...registerResult}
        placeholder={" "}
        className={`w-full bg-c-on-bg/6 focus:ring-1.5 ring-c-primary/30 
        enabled:hover:bg-c-on-bg/9 focus:bg-c-on-bg/9 placeholder:text-c-on-bg/50
        rounded-lg2 ${Icon ? "pl-11 pr-4" : "px-4"} pt-5.5 pb-2 relative peer`}
      />
      {Icon && (
        <Icon
          className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none
          text-c-on-bg/50 peer-focus:text-c-on-bg/75 transition"
        />
      )}
      <p
        className={`absolute ${
          Icon ? "left-11" : "left-4"
        } top-1/2 text-c-on-bg/50 transform -translate-y-1/2 duration-100
        pointer-events-none origin-top-left transition
        peer-focus:-translate-y-[calc(100%-3px)]
        peer-focus:scale-75
        peer-focus:text-c-on-bg/75
        peer-placeholder-not-shown:-translate-y-[calc(100%-3px)]
        peer-placeholder-not-shown:scale-75`}
      >
        {placeholder}
      </p>
    </label>
  );
}
