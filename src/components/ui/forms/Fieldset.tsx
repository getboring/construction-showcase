import { Field as BaseField, Fieldset as BaseFieldset } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface FieldsetProps {
  legend: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Fieldset({ legend, description, children, className }: FieldsetProps) {
  return (
    <BaseFieldset.Root
      className={cn("border border-steel-700 rounded-lg p-4", className)}
    >
      <BaseFieldset.Legend className="font-mono text-xs uppercase tracking-[0.15em] text-amber-500 px-2">
        {legend}
      </BaseFieldset.Legend>
      {description && (
        <p className="font-mono text-[10px] text-steel-600 mb-3">{description}</p>
      )}
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </BaseFieldset.Root>
  );
}

interface FormFieldProps {
  name: string;
  label: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ name, label, description, error, children, className }: FormFieldProps) {
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

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export function Form({ children, onSubmit, className }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)}>
      {children}
    </form>
  );
}