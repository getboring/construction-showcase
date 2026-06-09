import { cn } from "../../../lib/cn";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
}

export function Textarea({ error = false, className, id, ...props }: TextareaProps) {
  const textareaId = id || props.name;
  return (
    <textarea
      id={textareaId}
      className={cn(
        "bg-steel-950 border rounded px-4 py-3 font-body text-sm text-zinc-50",
        "placeholder:text-steel-400",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
        "transition-colors resize-y min-h-[120px]",
        error
          ? "border-red-500/50 focus-visible:border-red-400 focus-visible:ring-red-500/20"
          : "border-steel-700 focus-visible:border-amber-500 focus-visible:ring-amber-500/20",
        className,
      )}
      {...props}
    />
  );
}