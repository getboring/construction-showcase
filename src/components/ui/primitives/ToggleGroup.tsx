import { cn } from "../../../lib/cn";

interface FilterGroupProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function FilterGroup({ options, value, onValueChange, className }: FilterGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="group" aria-label="Filter">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onValueChange(option.value)}
          aria-pressed={value === option.value}
          className={cn(
            "font-mono text-xs uppercase tracking-widest px-4 py-2 rounded transition-colors",
            "focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2",
            value === option.value
              ? "bg-amber-500 text-steel-950 font-bold"
              : "border border-steel-700 text-steel-400 hover:border-amber-500 hover:text-amber-400",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}