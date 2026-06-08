import { AlertDialog as BaseAlertDialog } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: "danger" | "default";
  className?: string;
}

const variantStyles = {
  danger: "bg-red-600 hover:bg-red-500 text-white",
  default: "bg-amber-500 hover:bg-amber-400 text-steel-950",
};

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "default",
  className,
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 transition-opacity duration-200" />
        <BaseAlertDialog.Popup
          className={cn(
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
            "bg-steel-900 border border-steel-800 rounded-lg p-8 max-w-md w-[90vw]",
            "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
            "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
            "transition-opacity transition-transform duration-200",
            className,
          )}
        >
          <BaseAlertDialog.Title className="font-display text-2xl text-zinc-50 leading-none mb-2">{title}</BaseAlertDialog.Title>
          {description && (
            <BaseAlertDialog.Description className="text-steel-400 text-sm leading-relaxed mb-6">{description}</BaseAlertDialog.Description>
          )}
          <div className="flex justify-end gap-3">
            <BaseAlertDialog.Close className="font-mono text-xs uppercase tracking-widest px-4 py-2 rounded border border-steel-700 text-steel-400 hover:border-amber-500 hover:text-amber-400 transition-colors">
              {cancelLabel}
            </BaseAlertDialog.Close>
            <button
              onClick={onConfirm}
              className={cn("font-mono text-xs uppercase tracking-widest px-4 py-2 rounded font-bold transition-colors", variantStyles[variant])}
            >
              {confirmLabel}
            </button>
          </div>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}