export function ErrorLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`w-full text-sm px-2.5 py-1.5 rounded-md bg-c-danger/10 text-c-danger ${className}`}
    >
      {children}
    </p>
  );
}
