import { useState, useEffect, useCallback } from "react";
import { cn } from "../../../lib/cn";

type ToastType = "success" | "error" | "info";

interface ToastItemData {
  id: number;
  message: string;
  type: ToastType;
}

const typeStyles: Record<ToastType, string> = {
  success: "border-green-500/30 bg-green-500/10",
  error: "border-red-500/30 bg-red-500/10",
  info: "border-amber-500/30 bg-amber-500/10",
};

const typeIcons: Record<ToastType, string> = {
  success: "\u2713",
  error: "\u2715",
  info: "\u2139",
};

export function Toast({ message, type = "info", duration = 4000, onClose }: {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => { setVisible(false); }, duration);
    const removeTimer = setTimeout(() => { onClose?.(); }, duration + 200);
    return () => { clearTimeout(hideTimer); clearTimeout(removeTimer); };
  }, [duration, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-50 max-w-sm border rounded-lg px-4 py-3 flex items-center gap-3",
        "transition-all duration-200",
        typeStyles[type],
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      )}
    >
      <span className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
        type === "success" && "bg-green-500 text-steel-950",
        type === "error" && "bg-red-500 text-white",
        type === "info" && "bg-amber-500 text-steel-950",
      )} aria-hidden="true">
        {typeIcons[type]}
      </span>
      <p className="text-sm text-zinc-200">{message}</p>
    </div>
  );
}

let globalToastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastItemData>>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++globalToastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return { toasts, addToast };
}