import { cn } from "../../../lib/cn";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

export function Input({ error = false, className, id, ...props }: InputProps) {
  const inputId = id || props.name;
  return (
    <input
      id={inputId}
      className={cn(
        "bg-steel-950 border rounded px-4 py-3 font-body text-sm text-zinc-50",
        "placeholder:text-steel-400",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
        "transition-colors",
        error
          ? "border-red-500/50 focus-visible:border-red-400 focus-visible:ring-red-500/20"
          : "border-steel-700 focus-visible:border-amber-500 focus-visible:ring-amber-500/20",
        className,
      )}
      {...props}
    />
  );
}