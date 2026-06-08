import { cn } from "../../../lib/cn";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends React.ComponentProps<HeadingLevel> {
  as?: HeadingLevel;
  display?: boolean;
  mono?: boolean;
}

const sizeMap: Record<HeadingLevel, string> = {
  h1: "font-display text-7xl md:text-9xl leading-[0.85]",
  h2: "font-display text-5xl md:text-7xl leading-none",
  h3: "font-display text-3xl md:text-5xl leading-none",
  h4: "font-display text-2xl md:text-3xl leading-tight",
};

export function Heading({
  as,
  display = true,
  mono = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as ?? "h2";

  return (
    <Tag
      className={cn(
        "text-zinc-50",
        sizeMap[as ?? "h2"],
        display && "font-display",
        mono && "font-mono",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}