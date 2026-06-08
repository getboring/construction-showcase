import { cn } from "../../../lib/cn";

interface SeparatorProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export function Separator({ orientation = "horizontal", decorative = true, className, ...props }: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        "bg-steel-800 shrink-0",
        className,
      )}
      {...props}
    />
  );
}