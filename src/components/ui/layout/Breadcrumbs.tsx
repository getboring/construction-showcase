import { cn } from "../../../lib/cn";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("font-mono text-xs text-steel-500 uppercase tracking-widest", className)}>
      <ol className="flex items-center gap-2">
        <li>
          <a href="/" className="hover:text-amber-400 transition-colors">Home</a>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              <span className="text-steel-700" aria-hidden="true">/</span>
              {item.href && !isLast ? (
                <a href={item.href} className="hover:text-amber-400 transition-colors">{item.label}</a>
              ) : (
                <span className="text-steel-400" aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}