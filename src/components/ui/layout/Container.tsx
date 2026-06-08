import { cn } from "../../../lib/cn";

export function Container({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("max-w-7xl mx-auto", className)} {...props}>
      {children}
    </div>
  );
}