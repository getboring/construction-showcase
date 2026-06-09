import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold",
  secondary: "bg-steel-800 hover:bg-steel-700 text-zinc-100 font-bold",
  outline: "border border-steel-700 hover:border-amber-500 text-zinc-100 font-bold bg-transparent",
  ghost: "text-zinc-400 hover:text-amber-500 bg-transparent",
  danger: "bg-red-600 hover:bg-red-500 text-white font-bold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 rounded",
  md: "text-sm px-6 py-3 rounded",
  lg: "text-sm px-8 py-4 rounded",
};

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ComponentProps<"button">, keyof ButtonBaseProps> & {
    as?: "button";
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<React.ComponentProps<typeof Link>, keyof ButtonBaseProps> & {
    as: typeof Link;
    to: string;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.ComponentProps<"a">, keyof ButtonBaseProps> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(
    "uppercase tracking-widest transition-colors duration-200 inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (props.as === Link) {
    const { as: _, ...linkProps } = rest as ButtonAsLink;
    void _;
    return <Link className={classes} {...linkProps}>{children}</Link>;
  }

  if (props.as === "a") {
    const { as: _, ...anchorProps } = rest as ButtonAsAnchor;
    void _;
    return <a className={classes} {...anchorProps}>{children}</a>;
  }

  const { as: _, ...buttonProps } = rest as ButtonAsButton;
  void _;
  return <button className={classes} {...buttonProps}>{children}</button>;
}