import { useRouteMeta } from "../lib/useRouteMeta";
import { useLoaderData } from "react-router-dom";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { Breadcrumbs } from "../components/ui/layout/Breadcrumbs";
import { AccordionItem, AccordionGroup } from "../components/ui/primitives/Accordion";
import { FeatureBlock } from "../components/ui/content/FeatureBlock";
import { CalloutBanner } from "../components/ui/content/CalloutBanner";
import { CTASection } from "../components/ui/patterns/CTASection";
import { JsonLd } from "../lib/jsonLd";
import { faqLd } from "../lib/jsonLd-data";

const serviceFaqs: Record<string, Array<{ q: string; a: string }>> = {
  "general-contracting": [
    { q: "What size projects do you handle?", a: "We manage projects from $500K to $200M+. Our sweet spot is commercial and healthcare work in the $5M-$50M range." },
    { q: "How do you handle change orders?", a: "Every change order goes through a formal review process with cost and schedule impact analysis before approval. No surprises." },
    { q: "What's your warranty period?", a: "We provide a standard one-year warranty on all workmanship, with extended warranties available for specific systems." },
    { q: "Do you self-perform or subcontract?", a: "We self-perform concrete, steel, and sitework. MEP, finishes, and specialties go to pre-qualified subs under our direct supervision." },
  ],
  "design-build": [
    { q: "How does design-build save time?", a: "Single-source accountability eliminates the bid gap. Design and construction overlap, cutting 15-20% from typical timelines." },
    { q: "Do you have in-house architects?", a: "We partner with select architecture firms and manage the entire design process. One contract, one point of contact." },
    { q: "What if I already have plans?", a: "We can take over at any stage. If plans are complete, we transition to construction management seamlessly." },
  ],
  "construction-management": [
    { q: "What's the difference between CM and GC?", a: "A CM acts as your advocate managing subcontracts. A GC holds the contracts directly. Both approaches have merits depending on your project." },
    { q: "Can you join mid-project?", a: "Yes. We've rescued stalled projects and taken over CM roles from Day 1. Our onboarding process gets us productive within a week." },
  ],
  "pre-construction": [
    { q: "When should I engage pre-con?", a: "Ideally 6-12 months before groundbreaking. Earlier engagement means better value engineering and fewer surprises." },
    { q: "What does pre-con include?", a: "Cost modeling, schedule analysis, site logistics planning, permitting strategy, and constructability reviews." },
  ],
  "steel-erection": [
    { q: "What's your steel capacity?", a: "Our Liebherr LTM 1750 handles lifts up to 750 tons. We self-perform all structural steel erection." },
    { q: "Do you fabricate steel?", a: "We partner with regional fabricators for shop drawings and fabrication. We erected over 12,000 tons of steel last year." },
  ],
  "concrete": [
    { q: "What concrete work do you perform?", a: "Foundations, slabs, tilt-up panels, elevated decks, and flatwork. Both cast-in-place and precast." },
    { q: "What's your concrete volume capacity?", a: "We placed over 45,000 cubic yards of concrete last year across 30+ projects." },
  ],
};

export function ServiceDetailPage() {
  const loaderData: { service: { slug: string; title: string; description: string } } = useLoaderData();
  const service = loaderData.service;

  useRouteMeta({
    title: service.title,
    description: service.description,
    canonicalPath: `/services/${service.slug}`,
  });

  const faqs = serviceFaqs[service.slug] ?? [];

  return (
    <>
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: service.title }]} />
        </div>
      </section>
      <PageHero label={service.slug.toUpperCase()} title={service.title.toUpperCase()} description={service.description} />
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-steel-300 text-lg leading-relaxed mb-12">
            Our {service.title.toLowerCase()} team brings decades of experience to every project. Whether you need a design-build partner, a construction manager, or full general contracting services, Titan delivers with precision and accountability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {["Quality Assurance", "On-Time Delivery", "Budget Integrity"].map((item) => (
              <FeatureBlock key={item} title={item} description="Our commitment to excellence on every project, guaranteed in writing." />
            ))}
          </div>

          {faqs.length > 0 && (
            <>
              <JsonLd data={faqLd(faqs)} />
              <p className="section-label">FAQ</p>
              <h2 className="font-display text-4xl md:text-5xl text-zinc-50 leading-none mb-8">COMMON QUESTIONS.</h2>
              <AccordionGroup>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.q} id={faq.q.replace(/\s+/g, "-").toLowerCase()} title={faq.q}>
                    {faq.a}
                  </AccordionItem>
                ))}
              </AccordionGroup>
            </>
          )}

          <div className="mt-12">
            <CalloutBanner
              title="Ready to Start?"
              description={`Our ${service.title.toLowerCase()} team is ready to discuss your project. No obligation, no pressure, just honest answers.`}
              action={{ label: "Get a Quote", href: "/quote" }}
            />
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}