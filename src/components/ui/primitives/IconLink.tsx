import { cn } from "../../../lib/cn";

interface IconLinkProps extends React.ComponentProps<"a"> {
  label: string;
}

export function IconLink({ label, className, children, ...props }: IconLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded border border-steel-700 hover:border-amber-500 hover:text-amber-500 text-steel-400 transition-colors",
        className,
      )}
      aria-label={label}
      {...props}
    >
      {children}
    </a>
  );
}