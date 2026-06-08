import { useEffect } from "react";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { CTASection } from "../components/ui/patterns/CTASection";

const positions = [
  { title: "Project Manager", type: "Full-time", location: "Nashville, TN", dept: "Operations" },
  { title: "Superintendent", type: "Full-time", location: "Knoxville, TN", dept: "Field" },
  { title: "Estimator", type: "Full-time", location: "Nashville, TN", dept: "Pre-Construction" },
  { title: "Safety Coordinator", type: "Full-time", location: "Chattanooga, TN", dept: "Safety" },
  { title: "Heavy Equipment Operator", type: "Full-time", location: "Murfreesboro, TN", dept: "Field" },
  { title: "BIM Specialist", type: "Full-time", location: "Nashville, TN", dept: "Technology" },
];

export function CareersPage() {
  useEffect(() => { document.title = "Careers | Titan Build Co."; }, []);
  return (
    <>
      <PageHero
        label="Careers"
        title="BUILD WITH US."
        description="We hire builders, not resumes. If you show up early, own your work, and want to be part of something real, we want to hear from you."
      />
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-label">Open Positions</p>
          <h2 className="font-display text-5xl md:text-7xl text-zinc-50 leading-none mb-12">CURRENT OPENINGS.</h2>
          <div className="space-y-4">
            {positions.map((pos) => (
              <div key={pos.title} className="bg-steel-900 border border-steel-800 rounded-lg p-6 hover:border-amber-500/50 transition-colors flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-display text-xl text-zinc-50 leading-none mb-1">{pos.title.toUpperCase()}</h3>
                  <p className="font-mono text-xs text-steel-500 uppercase tracking-widest">{pos.dept} · {pos.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-amber-500 uppercase tracking-widest">{pos.type}</span>
                  <a href="/quote" className="bg-amber-500 hover:bg-amber-400 text-steel-950 font-bold uppercase tracking-widest text-xs px-4 py-2 rounded transition-colors">Apply</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}