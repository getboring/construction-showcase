import { Section, Container } from "../layout";
import { Button } from "../primitives";
import { siteConfig } from "../../../lib/data";

const bgImage = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80&auto=format&fit=crop";

export function CTASection() {
  return (
    <Section id="contact" className="relative overflow-hidden !py-32">
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Construction site background"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-steel-900/90" />
      </div>
      <Container className="text-center relative z-10 max-w-4xl">
        <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em] mb-6">
          Ready When You Are
        </p>
        <h2 className="font-display text-6xl md:text-8xl text-zinc-50 leading-[0.9] mb-8">
          LET&apos;S BUILD<br />SOMETHING.
        </h2>
        <p className="text-steel-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Pre-construction, design-build, general contracting, or construction management. We bring 27 years of steel, concrete, and reputation to every bid.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" as="a" href={`mailto:${siteConfig.email}`}>
            Request a Bid
          </Button>
          <Button variant="outline" size="lg" as="a" href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}>
            {siteConfig.phone}
          </Button>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-widest text-steel-400">
          <span>· Licensed General Contractor</span>
          <span>· Bonded & Insured</span>
          <span>· OSHA VPP Star</span>
        </div>
      </Container>
    </Section>
  );
}