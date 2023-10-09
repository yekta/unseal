export default function Button(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  const { className, ...rest } = props;
  return (
    <button
      {...rest}
      className={`w-full bg-c-primary focus-visible:ring-2 ring-offset-2 focus-visible:ring-c-primary-hover
      text-c-bg hover:bg-c-primary-hover focus-visible:bg-c-primary-hover
      rounded-lg px-4 py-3 font-bold cursor-default ${className}`}
    >
      {props.children}
    </button>
  );
}
