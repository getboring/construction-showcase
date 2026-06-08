import { Dialog } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface DialogRootProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function DialogRoot({ open, onOpenChange, children }: DialogRootProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

export function DialogTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Dialog.Trigger className={cn("cursor-pointer", className)}>
      {children}
    </Dialog.Trigger>
  );
}

export function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
      <Dialog.Popup
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
          "bg-steel-900 border border-steel-800 rounded-lg p-8 max-w-lg w-[90vw] max-h-[80vh] overflow-y-auto",
          "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
          "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
          "transition-opacity transition-transform duration-200",
          className,
        )}
      >
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Dialog.Title className={cn("font-display text-2xl text-zinc-50 leading-none mb-4", className)}>
      {children}
    </Dialog.Title>
  );
}

export function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Dialog.Description className={cn("text-steel-400 text-sm leading-relaxed mb-6", className)}>
      {children}
    </Dialog.Description>
  );
}

export function DialogClose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Dialog.Close className={cn("absolute top-4 right-4 text-steel-500 hover:text-zinc-50 transition-colors text-xl", className)}>
      {children}
    </Dialog.Close>
  );
}