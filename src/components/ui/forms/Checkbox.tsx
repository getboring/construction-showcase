import { Checkbox as BaseCheckbox } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface CheckboxProps {
  name: string;
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ name, label, checked, onCheckedChange, className }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      name={name}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn("flex items-center gap-3 cursor-pointer group", className)}
    >
      <BaseCheckbox.Indicator className="w-5 h-5 rounded border border-steel-600 group-hover:border-amber-500 flex items-center justify-center transition-colors data-[checked]:bg-amber-500 data-[checked]:border-amber-500 data-[checked]:text-steel-950">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseCheckbox.Indicator>
      <span className="text-sm text-steel-300 group-hover:text-steel-200 transition-colors">
        {label}
      </span>
    </BaseCheckbox.Root>
  );
}