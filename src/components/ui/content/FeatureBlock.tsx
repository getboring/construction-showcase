import { cn } from "../../../lib/cn";

interface FeatureBlockProps {
  icon?: string;
  title: string;
  description: string;
  className?: string;
}

export function FeatureBlock({ icon, title, description, className }: FeatureBlockProps) {
  return (
    <div className={cn("bg-steel-900 border border-steel-800 rounded-lg p-6 hover:border-amber-500/50 transition-colors group", className)}>
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
          <span className="text-amber-500 text-xl">{icon}</span>
        </div>
      )}
      <h3 className="font-display text-xl text-zinc-50 leading-none mb-3 group-hover:text-amber-400 transition-colors">
        {title.toUpperCase()}
      </h3>
      <p className="text-steel-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}