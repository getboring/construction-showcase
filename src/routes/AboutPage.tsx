import { useRouteMeta } from "../lib/useRouteMeta";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { StatGrid } from "../components/ui/content/StatBlock";
import { TestimonialCard } from "../components/ui/content/TestimonialCard";
import { CTASection } from "../components/ui/patterns/CTASection";
import { testimonials } from "../lib/data";

const teamMembers = [
  { name: "Marcus T. Titan", role: "CEO & Founder", bio: "27 years leading complex construction across the Southeast." },
  { name: "Sarah Chen", role: "VP of Operations", bio: "Former Army Corps. Runs every job site like a deployment." },
  { name: "David Wright", role: "Director of Pre-Construction", bio: "Licensed architect. 15 years bridging design and execution." },
  { name: "Angela Torres", role: "Safety Director", bio: "OSHA VPP Star site certified. Zero lost-time incidents in 4 years." },
];

export function AboutPage() {
  useRouteMeta({
    title: "About",
    description: "Twenty-seven years. Eight hundred forty-seven projects. Zero shortcuts. Founded in 1998 in Nashville.",
  });

  return (
    <>
      <PageHero
        label="About Us"
        title="TWENTY-SEVEN YEARS. EIGHT HUNDRED FORTY-SEVEN PROJECTS. ZERO SHORTCUTS."
        description="Founded in 1998 in Nashville, Titan Build Co. has grown from a three-person general contracting firm into the Southeast's most trusted commercial construction partner."
      />
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <StatGrid stats={[
            { value: "847", label: "Projects Completed", suffix: "+" },
            { value: "27", label: "Years in Business", suffix: "yrs" },
            { value: "$2.1B", label: "Total Contract Value" },
            { value: "0", label: "Lost-Time Incidents (4 yrs)" },
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
                <div className="w-16 h-16 rounded-full bg-steel-800 border border-steel-700 flex items-center justify-center mb-4">
                  <span className="font-display text-xl text-amber-500">{member.name[0]}</span>
                </div>
                <h3 className="font-display text-lg text-zinc-50 leading-none mb-1">{member.name.toUpperCase()}</h3>
                <p className="font-mono text-xs text-amber-500 uppercase tracking-widest mb-3">{member.role}</p>
                <p className="text-steel-400 text-sm leading-relaxed">{member.bio}</p>
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