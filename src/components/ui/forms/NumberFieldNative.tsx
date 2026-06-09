import { NumberField as BaseNumberField } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface NumberFieldNativeProps {
  name: string;
  label: string;
  value?: number | null;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  error?: boolean;
  description?: string;
  className?: string;
}

export function NumberFieldNative({
  name,
  label,
  value,
  onValueChange,
  min,
  max,
  step = 1,
  placeholder,
  error = false,
  description,
  className,
}: NumberFieldNativeProps) {
  const id = `numberfield-${name}`;

  return (
    <BaseNumberField.Root
      value={value ?? null}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
      className={cn("flex flex-col gap-1.5", className)}
    >
      <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">
        {label}
      </label>
      {description && !error && (
        <p className="font-mono text-[10px] text-steel-600 -mt-0.5">{description}</p>
      )}
      <BaseNumberField.Group className="relative flex">
        <BaseNumberField.Input
          id={id}
          name={name}
          placeholder={placeholder}
          className={cn(
            "w-full bg-steel-950 border rounded-l px-4 py-3 font-body text-sm text-zinc-50",
            "placeholder:text-steel-400",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
            "transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            error
              ? "border-red-500/50 focus-visible:border-red-400 focus-visible:ring-red-500/20"
              : "border-steel-700 focus-visible:border-amber-500 focus-visible:ring-amber-500/20",
          )}
        />
        <div className="flex flex-col border-l border-steel-700">
          <BaseNumberField.Increment
            className={cn(
              "flex items-center justify-center h-1/2 min-h-[18px] px-3 bg-steel-900 text-steel-400",
              "hover:text-amber-500 hover:bg-steel-800 transition-colors",
              "focus-visible:outline-2 focus-visible:outline-amber-500",
              "border-steel-700 border-b",
            )}
            aria-label="Increment"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 3V9M3 6H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </BaseNumberField.Increment>
          <BaseNumberField.Decrement
            className={cn(
              "flex items-center justify-center h-1/2 min-h-[18px] px-3 bg-steel-900 text-steel-400",
              "hover:text-amber-500 hover:bg-steel-800 transition-colors",
              "focus-visible:outline-2 focus-visible:outline-amber-500",
            )}
            aria-label="Decrement"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 6H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </BaseNumberField.Decrement>
        </div>
      </BaseNumberField.Group>
      {error && (
        <p className="font-mono text-[10px] text-red-400">This field is required</p>
      )}
    </BaseNumberField.Root>
  );
}