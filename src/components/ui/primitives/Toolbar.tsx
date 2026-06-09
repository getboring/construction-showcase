import { Toolbar } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function ToolbarRoot({ children, className, label }: ToolbarProps) {
  return (
    <Toolbar.Root
      className={cn("flex items-center gap-1 p-1 bg-steel-900 border border-steel-700 rounded-lg", className)}
      aria-label={label}
    >
      {children}
    </Toolbar.Root>
  );
}

interface ToolbarButtonProps extends React.ComponentProps<"button"> {
  active?: boolean;
}

export function ToolbarButton({ active, className, children, ...props }: ToolbarButtonProps) {
  return (
    <Toolbar.Button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-3 py-2 rounded text-sm font-body transition-colors outline-none",
        "data-[highlighted]:bg-steel-800 data-[highlighted]:text-zinc-50",
        "focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-1",
        active
          ? "bg-amber-500 text-steel-950 font-bold"
          : "text-steel-400 hover:text-steel-200 hover:bg-steel-800",
        className,
      )}
      {...props}
    >
      {children}
    </Toolbar.Button>
  );
}

interface ToolbarLinkProps {
  to: string;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ToolbarLink({ active, className, children, to }: ToolbarLinkProps) {
  return (
    <Toolbar.Link
      href={to}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-3 py-2 rounded text-sm font-body transition-colors outline-none",
        "data-[highlighted]:bg-steel-800 data-[highlighted]:text-zinc-50",
        "focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-1",
        active
          ? "bg-amber-500 text-steel-950 font-bold"
          : "text-steel-400 hover:text-steel-200 hover:bg-steel-800",
        className,
      )}
    >
      {children}
    </Toolbar.Link>
  );
}

interface ToolbarSeparatorProps {
  className?: string;
}

export function ToolbarSeparator({ className }: ToolbarSeparatorProps) {
  return <Toolbar.Separator className={cn("w-px h-6 bg-steel-700 mx-1", className)} />;
}

export function ToolbarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Toolbar.Group className={cn("flex items-center gap-1", className)}>{children}</Toolbar.Group>;
}