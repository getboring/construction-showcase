import { Drawer } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface DrawerRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function DrawerRoot({ open, onOpenChange, children }: DrawerRootProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Drawer.Root>
  );
}

export function DrawerContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Drawer.Portal>
      <Drawer.Backdrop
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 transition-opacity duration-200"
      />
      <Drawer.Content
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm",
          "bg-steel-950 border-l border-steel-800",
          "data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full",
          "transition-transform duration-300 ease-out",
          className,
        )}
      >
        {children}
      </Drawer.Content>
    </Drawer.Portal>
  );
}

export function DrawerTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Drawer.Title className={cn("font-display text-2xl text-zinc-50 leading-none", className)}>
      {children}
    </Drawer.Title>
  );
}

export function DrawerDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Drawer.Description className={cn("text-steel-400 text-sm", className)}>
      {children}
    </Drawer.Description>
  );
}