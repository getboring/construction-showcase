import { cn } from "../../../lib/cn";

interface SectionProps extends React.ComponentProps<"section"> {
  id?: string;
  scrollMargin?: boolean;
  variant?: "dark" | "warm" | "burgundy";
}

export function Section({ id, scrollMargin = true, variant = "dark", className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 px-6",
        scrollMargin && "scroll-mt-20",
        variant === "dark" && "bg-steel-950 text-steel-300",
        variant === "warm" && "bg-warm-50 text-steel-700",
        variant === "burgundy" && "bg-burgundy-600 text-white",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
