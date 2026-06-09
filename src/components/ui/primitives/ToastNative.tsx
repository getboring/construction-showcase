import { cn } from "../../../lib/cn";
import { createContext, useContext, useState, useCallback, useRef } from "react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastData {
  id: string;
  title?: string;
  description: string;
  type: ToastType;
  actionLabel?: string;
  onAction?: () => void;
}

const typeStyles: Record<ToastType, string> = {
  success: "border-green-500/30 bg-green-500/10",
  error: "border-red-500/30 bg-red-500/10",
  info: "border-amber-500/30 bg-amber-500/10",
  warning: "border-yellow-500/30 bg-yellow-500/10",
};

const typeIcons: Record<ToastType, string> = {
  success: "\u2713",
  error: "\u2715",
  info: "\u2139",
  warning: "\u26A0",
};

function ToastItem({ data, onClose }: { data: ToastData; onClose: (id: string) => void }) {
  return (
    <div
      className={cn(
        "w-full max-w-sm border rounded-lg shadow-lg overflow-hidden",
        "animate-in slide-in-from-right-full fade-in duration-300",
        typeStyles[data.type],
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3 p-4">
        <span
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5",
            data.type === "success" && "bg-green-500 text-steel-950",
            data.type === "error" && "bg-red-500 text-white",
            data.type === "info" && "bg-amber-500 text-steel-950",
            data.type === "warning" && "bg-yellow-500 text-steel-950",
          )}
          aria-hidden="true"
        >
          {typeIcons[data.type]}
        </span>
        <div className="flex-1 min-w-0">
          {data.title && (
            <p className="text-sm font-medium text-zinc-50 mb-0.5">
              {data.title}
            </p>
          )}
          <p className="text-sm text-steel-300">
            {data.description}
          </p>
        </div>
        {data.actionLabel && data.onAction && (
          <button
            className="text-amber-500 font-mono text-xs uppercase tracking-widest hover:text-amber-400 transition-colors flex-shrink-0"
            onClick={data.onAction}
          >
            {data.actionLabel}
          </button>
        )}
        <button
          className="text-steel-500 hover:text-steel-300 transition-colors flex-shrink-0 ml-2"
          aria-label="Dismiss"
          onClick={() => onClose(data.id)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (data: Omit<ToastData, "id">) => string;
  updateToast: (id: string, data: Partial<Omit<ToastData, "id">>) => void;
  closeToast: (id: string) => void;
  closeAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToastManager() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastManager must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const nextIdRef = useRef(0);

  const addToast = useCallback((data: Omit<ToastData, "id">) => {
    const id = `toast-${++nextIdRef.current}`;
    setToasts((prev) => [...prev, { ...data, id }]);
    if (data.type !== "error") {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    }
    return id;
  }, []);

  const updateToast = useCallback((id: string, data: Partial<Omit<ToastData, "id">>) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  }, []);

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, updateToast, closeToast, closeAll }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((data) => (
          <div key={data.id} className="pointer-events-auto">
            <ToastItem data={data} onClose={closeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}