import { cn } from "../../../lib/cn";

interface NumberFieldProps extends Omit<React.ComponentProps<"input">, "type"> {
  error?: boolean;
  label?: string;
}

export function NumberField({ error = false, label, className, id, ...props }: NumberFieldProps) {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">{label}</label>
      )}
      <input
        id={inputId}
        type="number"
        className={cn(
          "bg-steel-950 border rounded px-4 py-3 font-body text-sm text-zinc-50",
          "placeholder:text-steel-400",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
          "transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          error
            ? "border-red-500/50 focus-visible:border-red-400 focus-visible:ring-red-500/20"
            : "border-steel-700 focus-visible:border-amber-500 focus-visible:ring-amber-500/20",
          className,
        )}
        {...props}
      />
    </div>
  );
}