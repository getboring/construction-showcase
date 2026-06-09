import { useRouteMeta } from "../lib/useRouteMeta";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { StatGrid } from "../components/ui/content/StatBlock";
import { TestimonialCard } from "../components/ui/content/TestimonialCard";
import { CTASection } from "../components/ui/patterns/CTASection";
import { testimonials, teamMembers } from "../lib/data";

export function AboutPage() {
  useRouteMeta({
    title: "About",
    description: "One of the most respected general contracting firms in Northeast Tennessee and Southwest Virginia since 1985.",
    canonicalPath: "/about",
  });

  return (
    <>
      <PageHero
        label="About Us"
        title="ONE OF THE MOST RESPECTED GENERAL CONTRACTING FIRMS IN THE TRI-STATES."
        description="Founded in 1985 in Blountville, Tennessee, J.A. Street & Associates has built hundreds of thousands of square feet across Northeast Tennessee and Southwest Virginia through a team approach rooted in trust and expertise."
      />
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <StatGrid stats={[
            { value: "41", label: "Years in Business", suffix: "yrs" },
            { value: "15", label: "AGC Awards", suffix: "+" },
            { value: "6", label: "Circle of Excellence", suffix: "x" },
            { value: "35", label: "Employee-Owned", suffix: "%" },
          ]} />
        </div>
      </section>
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">Leadership</p>
          <h2 className="font-display text-5xl md:text-7xl text-zinc-50 leading-none mb-12">THE TEAM.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-steel-900 border border-steel-800 rounded-lg p-6 hover:border-amber-500/50 transition-colors group">
                <div className="w-16 h-16 rounded-full bg-steel-800 border border-steel-700 flex items-center justify-center mb-4 overflow-hidden">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-display text-xl text-amber-500">{member.name[0]}</span>
                  )}
                </div>
                <h3 className="font-display text-lg text-zinc-50 leading-none mb-1">{member.name.toUpperCase()}</h3>
                <p className="font-mono text-xs text-amber-500 uppercase tracking-widest mb-3">{member.role}</p>
                {member.bio && <p className="text-steel-400 text-sm leading-relaxed">{member.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-label">What Clients Say</p>
          <h2 className="font-display text-5xl md:text-7xl text-zinc-50 leading-none mb-12">TRUST.</h2>
          <div className="space-y-4">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}