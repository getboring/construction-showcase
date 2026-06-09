import { Select } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface ComboboxProps {
  name: string;
  label: string;
  placeholder?: string;
  options: Array<{ value: string; label: string; group?: string }>;
  value: string;
  onValueChange: (value: string | null) => void;
  error?: boolean;
  className?: string;
  description?: string;
}

export function Combobox({ name, label, placeholder = "Search...", options, value, onValueChange, error, className, description }: ComboboxProps) {
  const id = `combobox-${name}`;
  const grouped = options.reduce<Record<string, Array<{ value: string; label: string }>>>((acc, option) => {
    const group = option.group ?? "default";
    if (!acc[group]) acc[group] = [];
    acc[group].push({ value: option.value, label: option.label });
    return acc;
  }, {});

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">
        {label}
      </label>
      {description && !error && (
        <p className="font-mono text-[10px] text-steel-600">{description}</p>
      )}
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          id={id}
          className={cn(
            "flex items-center justify-between bg-steel-950 border rounded px-4 py-3 font-body text-sm text-zinc-50",
            "focus-visible:outline-2 focus-visible:ring-offset-0",
            "transition-colors",
            error
              ? "border-red-500/50 focus-visible:border-red-400 focus-visible:ring-red-500/20"
              : "border-steel-700 focus-visible:border-amber-500 focus-visible:ring-amber-500/20",
            !value && "text-steel-400",
          )}
        >
          <span className={cn(!value && "text-steel-400")}>
            {selectedLabel || placeholder}
          </span>
          <Select.Icon className="text-steel-500">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Positioner sideOffset={4}>
            <Select.Popup
              className={cn(
                "bg-steel-900 border border-steel-700 rounded-lg shadow-2xl py-1 min-w-[var(--trigger-width)] max-h-64 overflow-y-auto z-50",
                "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
                "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
                "transition-[opacity,transform] duration-150",
              )}
            >
              {Object.entries(grouped).map(([group, items]) => (
                <Select.Group key={group}>
                  {group !== "default" && (
                    <Select.GroupLabel className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-steel-500">
                      {group}
                    </Select.GroupLabel>
                  )}
                  {items.map((option) => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm text-steel-300 cursor-default outline-none",
                        "data-[highlighted]:bg-steel-800 data-[highlighted]:text-zinc-50",
                        "data-[selected]:text-amber-500",
                      )}
                    >
                      <Select.ItemIndicator className="text-amber-500">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Select.ItemIndicator>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Group>
              ))}
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      {error && (
        <p className="font-mono text-[10px] text-red-400">This field is required</p>
      )}
    </div>
  );
}