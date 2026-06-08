import { cn } from "../../../lib/cn";

type BadgeVariant = "default" | "amber" | "success" | "danger" | "outline";

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-steel-800 text-steel-300",
  amber: "bg-amber-500/20 text-amber-400",
  success: "bg-green-500/20 text-green-400",
  danger: "bg-red-500/20 text-red-400",
  outline: "border border-steel-700 text-steel-400",
};

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm inline-flex items-center gap-1.5",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}