export function TrustBar() {
  const items = [
    "Licensed General Contractor",
    "Bonded & Insured",
    "OSHA VPP Star",
    "ISO 9001:2015",
  ];

  return (
    <div className="border-y border-burgundy-700/30 py-4 px-6 bg-burgundy-950">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-burgundy-200 uppercase tracking-widest">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-2">
            {i > 0 && <span className="text-burgundy-400">·</span>}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
