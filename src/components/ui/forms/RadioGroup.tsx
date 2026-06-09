import { Radio, RadioGroup as BaseRadioGroup } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface RadioGroupProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({ name, label, options, value, onValueChange, className }: RadioGroupProps) {
  const groupId = `radiogroup-${name}`;
  return (
    <BaseRadioGroup
      name={name}
      value={value}
      onValueChange={onValueChange}
      className={cn("flex flex-col gap-3", className)}
      aria-labelledby={groupId}
    >
      <span id={groupId} className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400 mb-1">{label}</span>
      {options.map((opt) => (
        <label key={opt.value} htmlFor={`${name}-${opt.value}`} className="flex items-center gap-2.5 cursor-pointer group">
          <Radio.Root
            value={opt.value}
            className="w-4 h-4 rounded-full border border-steel-600 group-hover:border-amber-500 flex items-center justify-center transition-colors data-[checked]:border-amber-500 data-[checked]:bg-amber-500 outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-steel-950"
          >
            <Radio.Indicator className="w-2 h-2 rounded-full bg-steel-950" />
          </Radio.Root>
          <span className="text-sm text-steel-300 group-hover:text-steel-200 transition-colors">{opt.label}</span>
        </label>
      ))}
    </BaseRadioGroup>
  );
}