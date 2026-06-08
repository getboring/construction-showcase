import { cn } from "../../../lib/cn";

interface IconButtonProps extends React.ComponentProps<"button"> {
  label: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function IconButton({ label, size = "md", className, children, ...props }: IconButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded border border-steel-700 bg-steel-900 hover:border-amber-500 hover:text-amber-500 text-steel-400 transition-colors",
        sizeMap[size],
        className,
      )}
      aria-label={label}
      {...props}
    >
      {children}
    </button>
  );
}