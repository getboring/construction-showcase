import { cn } from "../../../lib/cn";

interface ProcessStepProps {
  title: string;
  description: string;
  duration: string;
  index: number;
  className?: string;
}

export function ProcessStep({ title, description, duration, index, className }: ProcessStepProps) {
  return (
    <div className={cn("bg-steel-900/60 border border-steel-800 rounded-lg p-6 hover:border-amber-500/50 transition-colors", className)}>
      <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em] mb-2">
        Phase {String(index).padStart(2, "0")}
      </p>
      <h3 className="font-display text-2xl md:text-3xl text-zinc-50 leading-none mb-2">
        {title.toUpperCase()}
      </h3>
      <p className="text-steel-400 text-sm mb-3 leading-relaxed">{description}</p>
      <span className="font-mono text-xs text-steel-500 uppercase tracking-widest">
        {duration}
      </span>
    </div>
  );
}