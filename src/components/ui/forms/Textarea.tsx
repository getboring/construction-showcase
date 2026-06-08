import { cn } from "../../../lib/cn";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
}

export function Textarea({ error = false, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "bg-steel-950 border rounded px-4 py-3 font-body text-sm text-zinc-50",
        "placeholder:text-steel-600",
        "focus:outline-none focus:ring-2 focus:ring-offset-0",
        "transition-colors resize-y min-h-[120px]",
        error
          ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
          : "border-steel-700 focus:border-amber-500 focus:ring-amber-500/20",
        className,
      )}
      {...props}
    />
  );
}