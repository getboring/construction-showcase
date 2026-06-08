import { cn } from "../../../lib/cn";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl";
type TextColor = "default" | "muted" | "amber" | "white";

interface TextProps extends React.ComponentProps<"p"> {
  size?: TextSize;
  color?: TextColor;
  mono?: boolean;
  as?: "p" | "span" | "div";
}

const sizeMap: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const colorMap: Record<TextColor, string> = {
  default: "text-zinc-300",
  muted: "text-zinc-500",
  amber: "text-amber-500",
  white: "text-zinc-50",
};

export function Text({
  size = "base",
  color = "default",
  mono = false,
  as: Tag = "p",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        sizeMap[size],
        colorMap[color],
        mono && "font-mono",
        "leading-relaxed",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}