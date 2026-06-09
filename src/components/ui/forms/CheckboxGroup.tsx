import { Checkbox } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string[];
  onValueChange: (value: string[]) => void;
  className?: string;
  description?: string;
}

export function CheckboxGroup({ name, label, options, value, onValueChange, className, description }: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onValueChange([...value, optionValue]);
    } else {
      onValueChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <fieldset className={cn("flex flex-col gap-3", className)} role="group" aria-label={label}>
      <legend className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">{label}</legend>
      {description && (
        <p className="font-mono text-[10px] text-steel-600 -mt-1">{description}</p>
      )}
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const checked = value.includes(option.value);
          return (
            <Checkbox.Root
              key={option.value}
              id={id}
              name={option.value}
              checked={checked}
              onCheckedChange={(isChecked) => handleChange(option.value, isChecked)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox.Indicator
                className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                  "group-hover:border-amber-500",
                  "data-[checked]:bg-amber-500 data-[checked]:border-amber-500 data-[checked]:text-steel-950",
                  "border-steel-600 text-transparent",
                )}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Checkbox.Indicator>
              <label htmlFor={id} className="text-sm text-steel-300 group-hover:text-steel-200 transition-colors cursor-pointer">
                {option.label}
              </label>
            </Checkbox.Root>
          );
        })}
      </div>
    </fieldset>
  );
}