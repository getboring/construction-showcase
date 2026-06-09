import { cn } from "../../../lib/cn";

type Status = "not_started" | "in_progress" | "completed" | "on_hold" | "blocked";

interface StatusBoardProps {
  columns: Array<{
    id: string;
    label: string;
    status?: Status;
  }>;
  items: Array<{
    id: string;
    title: string;
    description?: string;
    columnId: string;
    priority?: "low" | "medium" | "high";
    tags?: string[];
  }>;
  className?: string;
}

const statusColors: Record<Status, string> = {
  not_started: "bg-steel-600",
  in_progress: "bg-amber-500",
  completed: "bg-green-500",
  on_hold: "bg-yellow-500",
  blocked: "bg-red-500",
};

const priorityStyles: Record<string, string> = {
  low: "text-steel-500",
  medium: "text-amber-500",
  high: "text-red-400",
};

export function StatusBoard({ columns, items, className }: StatusBoardProps) {
  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4", className)} role="region" aria-label="Status board">
      {columns.map((column) => {
        const columnItems = items.filter((item) => item.columnId === column.id);
        return (
          <div key={column.id} className="flex-shrink-0 w-72">
            <div className="flex items-center gap-2 mb-3">
              <span className={cn("w-2 h-2 rounded-full", statusColors[column.status ?? "not_started"])} aria-hidden="true" />
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-steel-400">{column.label}</h3>
              <span className="ml-auto font-mono text-[10px] text-steel-600">{columnItems.length}</span>
            </div>
            <div className="flex flex-col gap-2 min-h-[200px] bg-steel-900/50 border border-steel-800 rounded-lg p-3">
              {columnItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-steel-900 border border-steel-700 rounded-lg p-3 hover:border-steel-600 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm text-zinc-50 font-medium leading-tight">{item.title}</h4>
                    {item.priority && (
                      <span className={cn("font-mono text-[10px] uppercase tracking-wider flex-shrink-0", priorityStyles[item.priority])} aria-label={`Priority: ${item.priority}`}>
                        {item.priority.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-steel-400 text-xs line-clamp-2 mb-2">{item.description}</p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-steel-800 text-steel-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
              {columnItems.length === 0 && (
                <div className="flex items-center justify-center h-24 text-steel-600 font-mono text-xs">
                  No items
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}