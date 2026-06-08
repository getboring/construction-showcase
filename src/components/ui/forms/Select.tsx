import { Select as BaseSelect } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  placeholder?: string;
  options: SelectOption[];
  error?: boolean;
  className?: string;
  value?: string;
  onValueChange?: (value: string | null) => void;
}

export function Select({
  name,
  placeholder = "Select...",
  options,
  error = false,
  className,
  value,
  onValueChange,
}: SelectProps) {
  return (
    <BaseSelect.Root name={name} value={value} onValueChange={onValueChange}>
      <BaseSelect.Trigger
        className={cn(
          "flex items-center justify-between bg-steel-950 border rounded px-4 py-3 font-body text-sm",
          "focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors",
          error
            ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20 text-red-300"
            : "border-steel-700 focus:border-amber-500 focus:ring-amber-500/20 text-zinc-50",
          !value && "text-steel-600",
          className,
        )}
      >
        <BaseSelect.Value placeholder={placeholder} />
        <BaseSelect.Icon>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-steel-400">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={4}>
          <BaseSelect.Popup className="bg-steel-900 border border-steel-700 rounded shadow-lg py-1 z-50 min-w-[200px]">
            {options.map((opt) => (
              <BaseSelect.Item
                key={opt.value}
                value={opt.value}
                className="px-4 py-2 text-sm text-zinc-300 hover:bg-steel-800 hover:text-amber-400 cursor-default data-[selected]:bg-steel-800 data-[selected]:text-amber-400 outline-none"
              >
                <BaseSelect.ItemText>{opt.label}</BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}