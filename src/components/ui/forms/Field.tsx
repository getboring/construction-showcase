import { Field as BaseField } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface FieldProps {
  name: string;
  label: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ name, label, description, error, children, className }: FieldProps) {
  return (
    <BaseField.Root name={name} className={cn("flex flex-col gap-1.5", className)}>
      <BaseField.Label className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">
        {label}
      </BaseField.Label>
      {children}
      {description && !error && (
        <BaseField.Description className="font-mono text-[10px] text-steel-600">
          {description}
        </BaseField.Description>
      )}
      {error && (
        <BaseField.Error className="font-mono text-[10px] text-red-400">
          {error}
        </BaseField.Error>
      )}
    </BaseField.Root>
  );
}