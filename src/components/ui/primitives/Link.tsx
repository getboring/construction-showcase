import { Link as RouterLink } from "react-router-dom";
import { cn } from "../../../lib/cn";

interface AppLinkProps extends React.ComponentProps<typeof RouterLink> {
  underline?: boolean;
  external?: boolean;
}

export function Link({ underline = false, className, children, external, ...props }: AppLinkProps) {
  if (external && typeof props.to === "string" && (props.to.startsWith("http") || props.to.startsWith("mailto:") || props.to.startsWith("tel:"))) {
    return (
      <a
        href={props.to}
        className={cn(
          "text-amber-500 hover:text-amber-400 transition-colors",
          underline && "underline underline-offset-4 decoration-amber-500/40 hover:decoration-amber-400",
          className,
        )}
        target={props.to.startsWith("http") ? "_blank" : undefined}
        rel={props.to.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink
      className={cn(
        "text-amber-500 hover:text-amber-400 transition-colors",
        underline && "underline underline-offset-4 decoration-amber-500/40 hover:decoration-amber-400",
        className,
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
}