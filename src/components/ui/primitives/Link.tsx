import { cn } from "../../../lib/cn";

interface LinkProps extends React.ComponentProps<"a"> {
  underline?: boolean;
}

export function Link({ underline = false, className, children, ...props }: LinkProps) {
  return (
    <a
      className={cn(
        "text-amber-500 hover:text-amber-400 transition-colors",
        underline && "underline underline-offset-4 decoration-amber-500/40 hover:decoration-amber-400",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}