import { useRouteMeta } from "../lib/useRouteMeta";
import { Hero, FeaturedProject, CTASection } from "../components/ui/patterns";
import { NumberCounters } from "../components/ui/motion/NumberCounters";
import { BeforeAfter } from "../components/ui/motion/BeforeAfter";
import { HorizontalScroll } from "../components/ui/motion/HorizontalScroll";
import { ClipPathReveal } from "../components/ui/motion/ClipPathReveal";
import { ParallaxEquipment } from "../components/ui/motion/ParallaxEquipment";
import { ScrollTimeline } from "../components/ui/motion/ScrollTimeline";
import { TextScramble } from "../components/ui/motion/TextScramble";
import { Section } from "../components/ui/layout/Section";
import { SectionDivider } from "../components/ui/layout";
import { ServiceGrid } from "../components/ui/content/ServiceCard";
import { TestimonialCard } from "../components/ui/content/TestimonialCard";
import { testimonials } from "../lib/data";

export function HomePage() {
  useRouteMeta({
    title: "Commercial Construction | J.A. Street & Associates",
    description: "Respected general contracting firm in Northeast Tennessee and Southwest Virginia. Commercial, industrial, and institutional construction since 1985.",
    ogImage: "",
    canonicalPath: "/",
  });

  return (
    <>
      <Hero
        label="General Contractors Since 1985"
        title="WE BUILD THE THINGS THAT MATTER"
        titleHighlight="THE THINGS"
        description="Commercial. Industrial. Institutional. Forty-one years of steel, concrete, and reputation across Northeast Tennessee and Southwest Virginia."
        primaryAction={{ label: "See Our Work", href: "/projects" }}
        secondaryAction={{ label: "Get a Bid", href: "/quote" }}
      />
      <FeaturedProject />
      <SectionDivider />

      {/* Heritage section - warm background, trust-building copy inspired by JA Street */}
      <Section variant="warm" id="heritage">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-burgundy-500 mb-3 inline-flex items-center gap-2">
            <span className="w-6 h-px bg-burgundy-500 inline-block" />
            Locally Owned. Nationally Trusted.
            <span className="w-6 h-px bg-burgundy-500 inline-block" />
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-steel-950 leading-none mb-6">
            41 YEARS OF BUILDING<br />THE SOUTHEAST
          </h2>
          <p className="text-steel-600 text-lg max-w-3xl mx-auto leading-relaxed">
            J.A. Street & Associates is a locally-owned general contracting firm built on a team approach. Every project starts with trust, and every handshake is backed by decades of delivered results.
          </p>
        </div>
      </Section>
      <SectionDivider />

      <NumberCounters />
      <SectionDivider />

      {/* Services on warm background */}
      <Section variant="warm">
        <div className="max-w-7xl mx-auto">
          <p className="section-label text-burgundy-500 before:bg-burgundy-500">Services</p>
          <h2 className="font-display text-5xl md:text-7xl text-steel-950 leading-none mb-12">WHAT WE DO.</h2>
          <ServiceGrid />
        </div>
      </Section>
      <SectionDivider />

      <BeforeAfter />
      <SectionDivider />

      {/* Testimonials on warm background - directly from JA Street's proven pattern */}
      <Section variant="warm" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <p className="section-label text-burgundy-500 before:bg-burgundy-500">What Our Clients Say</p>
          <h2 className="font-display text-5xl md:text-7xl text-steel-950 leading-none mb-12">BUILT ON TRUST.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} variant="warm" />
            ))}
          </div>
        </div>
      </Section>
      <SectionDivider />

      <HorizontalScroll />
      <SectionDivider />
      <ClipPathReveal />
      <SectionDivider />
      <ParallaxEquipment />
      <SectionDivider />
      <ScrollTimeline />
      <SectionDivider />
      <TextScramble />
      <CTASection />
    </>
  );
}
