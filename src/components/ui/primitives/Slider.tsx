import { Slider } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface BudgetSliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  formatLabel?: (value: number) => string;
  className?: string;
}

export function BudgetSlider({
  min,
  max,
  step,
  value,
  onValueChange,
  formatLabel = (v) => {
    if (v >= 1_000_000_00) return `$${(v / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    if (v >= 100_000_00) return `$${(v / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    return `$${(v / 100).toLocaleString("en-US")}`;
  },
  className,
}: BudgetSliderProps) {
  return (
    <Slider.Root
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
      className={cn("relative flex items-center w-full h-6 touch-none", className)}
    >
      <Slider.Track className="relative h-2 w-full grow rounded-full bg-steel-800">
        <Slider.Indicator className="absolute h-full rounded-full bg-amber-500/30" />
      </Slider.Track>
      <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-amber-500 bg-steel-950 shadow-md focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2 hover:bg-amber-500 transition-colors">
        <Slider.Indicator className="sr-only" />
      </Slider.Thumb>
      <div className="flex justify-between w-full mt-3 font-mono text-[10px] text-steel-500 uppercase tracking-widest">
        <span>{formatLabel(min)}</span>
        <span className="text-amber-500">{formatLabel(value[0])}</span>
        <span>{formatLabel(max)}</span>
      </div>
    </Slider.Root>
  );
}