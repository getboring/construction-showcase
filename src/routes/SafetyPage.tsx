import { useEffect } from "react";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { TextScramble } from "../components/ui/motion/TextScramble";
import { CTASection } from "../components/ui/patterns/CTASection";
import { Meter } from "../components/ui/primitives/Meter";

const safetyMetrics = [
  { label: "EMR Rating", value: 0.42, max: 1.0, variant: "amber" as const, display: "0.42" },
  { label: "Training Compliance", value: 98, variant: "success" as const, display: "98%" },
  { label: "Near-Miss Reporting", value: 87, variant: "amber" as const, display: "87%" },
  { label: "PPE Compliance", value: 100, variant: "success" as const, display: "100%" },
];

export function SafetyPage() {
  useEffect(() => { document.title = "Safety | Titan Build Co."; }, []);
  return (
    <>
      <PageHero
        label="Safety"
        title="BUILT TO STANDARD."
        description="Safety isn't a department at Titan. It's the company. Every person goes home every night."
      />
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-label">Safety Metrics</p>
          <h2 className="font-display text-5xl md:text-7xl text-zinc-50 leading-none mb-12">BY THE NUMBERS.</h2>
          <div className="space-y-8">
            {safetyMetrics.map((metric) => (
              <Meter
                key={metric.label}
                value={metric.value}
                max={metric.max ?? 100}
                label={metric.label}
                variant={metric.variant}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="border-l-2 border-amber-500 pl-6">
            <p className="font-display text-5xl md:text-6xl text-amber-500 leading-none">0</p>
            <p className="font-mono text-xs text-steel-500 uppercase tracking-widest mt-3">Lost-Time Incidents (4 yrs)</p>
          </div>
          <div className="border-l-2 border-amber-500 pl-6">
            <p className="font-display text-5xl md:text-6xl text-amber-500 leading-none">850K+</p>
            <p className="font-mono text-xs text-steel-500 uppercase tracking-widest mt-3">Safe Work Hours</p>
          </div>
          <div className="border-l-2 border-amber-500 pl-6">
            <p className="font-display text-5xl md:text-6xl text-amber-500 leading-none">100%</p>
            <p className="font-mono text-xs text-steel-500 uppercase tracking-widest mt-3">OSHA Compliance</p>
          </div>
          <div className="border-l-2 border-amber-500 pl-6">
            <p className="font-display text-5xl md:text-6xl text-amber-500 leading-none">0.42</p>
            <p className="font-mono text-xs text-steel-500 uppercase tracking-widest mt-3">EMR Rating (Industry Avg: 1.0)</p>
          </div>
        </div>
      </section>
      <SectionDivider />
      <TextScramble />
      <CTASection />
    </>
  );
}