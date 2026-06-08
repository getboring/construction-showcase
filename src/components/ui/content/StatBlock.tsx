import { cn } from "../../../lib/cn";

interface StatBlockProps {
  value: string;
  label: string;
  suffix?: string;
  className?: string;
}

export function StatBlock({ value, label, suffix, className }: StatBlockProps) {
  return (
    <div className={cn("border-l-2 border-amber-500 pl-6", className)}>
      <dt className="font-mono text-xs text-steel-500 uppercase tracking-widest mb-3">{label}</dt>
      <dd className="font-display text-5xl md:text-6xl text-amber-500 leading-none">
        {value}
        {suffix && <span className="text-2xl md:text-3xl ml-1">{suffix}</span>}
      </dd>
    </div>
  );
}

export function StatGrid({ stats }: { stats: StatBlockProps[] }) {
  return (
    <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
      {stats.map((stat) => (
        <StatBlock key={stat.label} {...stat} />
      ))}
    </dl>
  );
}