import { Meter as BaseMeter } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface MeterProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: "default" | "amber" | "success" | "danger";
  className?: string;
}

const variantTracks: Record<string, string> = {
  default: "bg-steel-600",
  amber: "bg-amber-500",
  success: "bg-green-500",
  danger: "bg-red-500",
};

export function Meter({ value, min = 0, max = 100, label, showValue = true, variant = "default", className }: MeterProps) {
  const pct = Math.round(((value - min) / (max - min)) * 100);
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">{label}</span>}
          {showValue && <span className="font-mono text-xs text-steel-300">{pct}%</span>}
        </div>
      )}
      <BaseMeter.Root value={value} min={min} max={max}>
        <BaseMeter.Track className="h-2 rounded-full bg-steel-800 overflow-hidden">
          <BaseMeter.Indicator className={cn("h-full rounded-full bg-amber-500 transition-all duration-500 data-[complete]:bg-green-500", variantTracks[variant])} />
        </BaseMeter.Track>
      </BaseMeter.Root>
    </div>
  );
}