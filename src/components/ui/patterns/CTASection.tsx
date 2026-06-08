import { Link } from "react-router-dom";
import { Section, Container } from "../layout";
import { siteConfig } from "../../../lib/data";

const bgImage = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80&auto=format&fit=crop";

export function CTASection() {
  return (
    <Section id="contact" className="relative overflow-hidden !py-32">
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Construction site background"
          width={1600}
          height={900}
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
          <Link to="/quote" className="bg-amber-500 hover:bg-amber-400 text-steel-950 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors inline-flex items-center justify-center">
            Request a Bid
          </Link>
          <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="border border-steel-700 hover:border-amber-500 text-zinc-100 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors inline-flex items-center justify-center">
            {siteConfig.phone}
          </a>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-widest text-steel-400">
          <span>&middot; Licensed General Contractor</span>
          <span>&middot; Bonded & Insured</span>
          <span>&middot; OSHA VPP Star</span>
        </div>
      </Container>
    </Section>
  );
}