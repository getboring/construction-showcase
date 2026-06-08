import { cn } from "../../../lib/cn";

interface SectionProps extends React.ComponentProps<"section"> {
  id?: string;
  scrollMargin?: boolean;
}

export function Section({ id, scrollMargin = true, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-24 px-6", scrollMargin && "scroll-mt-20", className)}
      {...props}
    >
      {children}
    </section>
  );
}