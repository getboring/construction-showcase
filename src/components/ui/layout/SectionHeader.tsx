interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      {label && <p className="section-label">{label}</p>}
      <h2 className="font-display text-5xl md:text-7xl text-zinc-50 leading-none">{title}</h2>
      {description && (
        <p className="text-steel-400 mt-3 max-w-xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}