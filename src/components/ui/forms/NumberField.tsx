import { cn } from "../../../lib/cn";

interface NumberFieldProps extends Omit<React.ComponentProps<"input">, "type"> {
  error?: boolean;
  label?: string;
}

export function NumberField({ error = false, label, className, ...props }: NumberFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">{label}</label>
      )}
      <input
        type="number"
        className={cn(
          "bg-steel-950 border rounded px-4 py-3 font-body text-sm text-zinc-50",
          "placeholder:text-steel-600",
          "focus:outline-none focus:ring-2 focus:ring-offset-0",
          "transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          error
            ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
            : "border-steel-700 focus:border-amber-500 focus:ring-amber-500/20",
          className,
        )}
        {...props}
      />
    </div>
  );
}