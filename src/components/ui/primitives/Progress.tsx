import { Progress as BaseProgress } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface ProgressBarProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({ value, min = 0, max = 100, label, showValue = true, className }: ProgressBarProps) {
  const pct = Math.round(((value - min) / (max - min)) * 100);
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">{label}</span>}
          {showValue && <span className="font-mono text-xs text-amber-500">{pct}%</span>}
        </div>
      )}
      <BaseProgress.Root value={value} min={min} max={max}>
        <BaseProgress.Track className="h-1.5 rounded-full bg-steel-800 overflow-hidden">
          <BaseProgress.Indicator className="h-full rounded-full bg-amber-500 transition-all duration-500 data-[complete]:bg-green-500 data-[progressing]:bg-amber-400" />
        </BaseProgress.Track>
      </BaseProgress.Root>
    </div>
  );
}