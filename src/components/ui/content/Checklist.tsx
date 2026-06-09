import { cn } from "../../../lib/cn";

interface ChecklistProps {
  title?: string;
  items: Array<{
    id: string;
    label: string;
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void;
    description?: string;
  }>;
  className?: string;
  readOnly?: boolean;
}

export function Checklist({ title, items, className, readOnly = false }: ChecklistProps) {
  const checkedCount = items.filter((item) => item.checked).length;
  const progress = items.length > 0 ? (checkedCount / items.length) * 100 : 0;

  return (
    <div className={cn("flex flex-col gap-4", className)} role="group" aria-label={title ?? "Checklist"}>
      {title && (
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">{title}</h3>
          <span className="font-mono text-[10px] text-steel-600">{checkedCount}/{items.length} complete</span>
        </div>
      )}
      <div className="w-full h-1 bg-steel-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label={`${title ?? "Checklist"} progress`}>
        <div
          className="h-full bg-amber-500 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3 py-1.5">
            <div
              className={cn(
                "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors border",
                item.checked
                  ? "bg-amber-500 border-amber-500 text-steel-950"
                  : "border-steel-600 bg-transparent",
                !readOnly && "cursor-pointer hover:border-amber-500",
              )}
              role={readOnly ? undefined : "checkbox"}
              aria-checked={item.checked}
              aria-label={item.label}
              tabIndex={readOnly ? undefined : 0}
              onClick={readOnly ? undefined : () => item.onCheckedChange?.(!item.checked)}
              onKeyDown={readOnly ? undefined : (e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  item.onCheckedChange?.(!item.checked);
                }
              }}
            >
              {item.checked && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 6L5 8.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className={cn(
                "text-sm transition-colors",
                item.checked ? "text-steel-400 line-through" : "text-zinc-50",
              )}>
                {item.label}
              </span>
              {item.description && (
                <p className="font-mono text-[10px] text-steel-600 mt-0.5">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}