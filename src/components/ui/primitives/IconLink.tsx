import { Link as RouterLink } from "react-router-dom";
import { cn } from "../../../lib/cn";

interface IconLinkProps {
  to: string;
  label: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
}

export function IconLink({ to, label, className, children, external }: IconLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center w-10 h-10 rounded border border-steel-700 hover:border-amber-500 hover:text-amber-500 text-steel-400 transition-colors focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2",
    className,
  );

  if (external) {
    return (
      <a href={to} className={classes} aria-label={label} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={to} className={classes} aria-label={label}>
      {children}
    </RouterLink>
  );
}