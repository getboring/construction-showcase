import { Switch as BaseSwitch } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface SwitchProps {
  name: string;
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function Switch({ name, label, checked, onCheckedChange, className }: SwitchProps) {
  return (
    <BaseSwitch.Root
      name={name}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn("flex items-center gap-3 cursor-pointer group", className)}
    >
      <BaseSwitch.Thumb className="w-10 h-6 rounded-full bg-steel-700 group-hover:bg-steel-600 data-[checked]:bg-amber-500 transition-colors relative">
        <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform group-data-[checked]:translate-x-4" />
      </BaseSwitch.Thumb>
      <span className="text-sm text-steel-300 group-hover:text-steel-200 transition-colors">
        {label}
      </span>
    </BaseSwitch.Root>
  );
}