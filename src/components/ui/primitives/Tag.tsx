import { cn } from "../../../lib/cn";

type TagVariant = "default" | "amber";

interface TagProps extends React.ComponentProps<"span"> {
  variant?: TagVariant;
}

const variantStyles: Record<TagVariant, string> = {
  default: "border-steel-700 text-steel-400",
  amber: "border-amber-500/50 text-amber-500",
};

export function Tag({ variant = "default", className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded border inline-flex items-center gap-1.5",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}