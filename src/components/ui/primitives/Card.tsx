import { cn } from "../../../lib/cn";

interface CardProps extends React.ComponentProps<"div"> {
  hover?: boolean;
}

export function Card({ hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-steel-900 border border-steel-800 rounded-lg overflow-hidden",
        hover && "transition-colors duration-200 hover:border-amber-500/50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}