import { cn } from "../../../lib/cn";

interface DataTableProps<T> {
  columns: Array<{
    key: string;
    header: string;
    render?: (row: T, index: number) => React.ReactNode;
    className?: string;
  }>;
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  caption?: string;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T, index: number) => void;
  rowClassName?: (row: T, index: number) => string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  caption,
  emptyMessage = "No data available",
  className,
  onRowClick,
  rowClassName,
}: DataTableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead>
          <tr className="border-b border-steel-700">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.15em] text-steel-500 text-left px-4 py-3",
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-steel-500 font-mono text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={keyExtractor(row, i)}
                onClick={onRowClick ? () => onRowClick(row, i) : undefined}
                className={cn(
                  "border-b border-steel-800 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-steel-800/50",
                  rowClassName?.(row, i),
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3 text-sm text-steel-300", col.className)}>
                    {col.render ? col.render(row, i) : ((row as Record<string, unknown>)[col.key] ?? "") as string}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

interface DataTableSortingProps {
  column: string;
  direction: "asc" | "desc";
}

export function SortIndicator({ sorting, column }: { sorting: DataTableSortingProps | null; column: string }) {
  if (!sorting || sorting.column !== column) return null;

  return (
    <span className="ml-1 inline-block" aria-hidden="true">
      {sorting.direction === "asc" ? "\u2191" : "\u2193"}
    </span>
  );
}

interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function DataTablePagination({ currentPage, totalPages, onPageChange, className }: DataTablePaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={cn("flex items-center gap-2 justify-center mt-4", className)}
      role="navigation"
      aria-label="Table pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded border border-steel-700 text-steel-400 hover:border-amber-500 hover:text-amber-400 disabled:opacity-30 disabled:hover:border-steel-700 disabled:hover:text-steel-400 transition-colors"
        aria-label="Previous page"
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "font-mono text-xs w-8 h-8 rounded transition-colors",
            page === currentPage
              ? "bg-amber-500 text-steel-950 font-bold"
              : "text-steel-400 hover:text-steel-200 hover:bg-steel-800",
          )}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded border border-steel-700 text-steel-400 hover:border-amber-500 hover:text-amber-400 disabled:opacity-30 disabled:hover:border-steel-700 disabled:hover:text-steel-400 transition-colors"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}