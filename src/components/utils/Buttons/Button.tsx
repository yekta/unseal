import IconSpinner from "@components/icons/IconSpinner";

interface TButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  Icon?: React.ComponentType<any>;
}

export default function Button(props: TButtonProps) {
  const { className, isLoading, disabled, Icon, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={disabled || isLoading}
      className={`w-full bg-c-primary focus-visible:ring-2 focus-visible:ring-offset-3 
      focus-visible:ring-offset-c-bg focus-visible:ring-c-primary-hover/60
      text-c-bg hover:bg-c-primary-hover focus-visible:bg-c-primary-hover
      rounded-lg2 font-bold cursor-default overflow-hidden relative ${className}`}
    >
      <div className="w-full flex justify-center items-center px-3">
        {Icon && <Icon className="flex-shrink-0 w-6 h-6" />}
        <div className="flex-1 min-w-0 px-4 py-3.75">{props.children}</div>
        {Icon && <div className="flex-shrink-0 w-6 h-6" />}
      </div>
      {isLoading && (
        <div
          className="w-full h-full absolute left-0 top-0 bg-c-primary 
          text-c-bg flex items-center justify-center z-10"
        >
          <div className="w-6 h-6 animate-spinner">
            <IconSpinner className="w-full h-full" />
          </div>
        </div>
      )}
    </button>
  );
}
