import { cn } from "../../../lib/cn";

interface CertBadgeProps {
  name: string;
  className?: string;
}

export function CertBadge({ name, className }: CertBadgeProps) {
  return (
    <div className={cn("bg-steel-900/60 border border-steel-800 rounded-lg p-6 text-center hover:border-amber-500/50 transition-colors", className)}>
      <p className="font-mono text-sm md:text-base text-amber-500 font-medium">{name}</p>
    </div>
  );
}