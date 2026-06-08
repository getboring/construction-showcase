export function TrustBar() {
  const items = [
    "Licensed General Contractor",
    "Bonded & Insured",
    "OSHA VPP Star",
    "ISO 9001:2015",
  ];

  return (
    <div className="border-y border-steel-800 py-4 px-6 bg-steel-950">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-steel-500 uppercase tracking-widest">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-2">
            {i > 0 && <span className="text-steel-700">·</span>}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}