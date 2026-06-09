import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";

interface CalloutBannerProps {
  title?: string;
  description: string;
  action?: { label: string; href: string };
  className?: string;
}

export function CalloutBanner({ title, description, action, className }: CalloutBannerProps) {
  return (
    <div className={cn("bg-amber-500/10 border border-amber-500/30 rounded-lg p-6", className)}>
      {title && (
        <h4 className="font-display text-lg text-zinc-50 leading-none mb-2">{title.toUpperCase()}</h4>
      )}
      <p className="text-steel-300 text-sm leading-relaxed">{description}</p>
      {action && (
        <Link
          to={action.href}
          className="inline-block mt-4 font-mono text-xs text-amber-500 uppercase tracking-widest hover:text-amber-400 transition-colors"
        >
          {action.label} &rarr;
        </Link>
      )}
    </div>
  );
}