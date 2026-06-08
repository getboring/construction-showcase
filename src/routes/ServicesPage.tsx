import { useEffect } from "react";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { ServiceGrid } from "../components/ui/content/ServiceCard";
import { CTASection } from "../components/ui/patterns/CTASection";

export function ServicesPage() {
  useEffect(() => { document.title = "Services | Titan Build Co."; }, []);
  return (
    <>
      <PageHero
        label="Services"
        title="WHAT WE BUILD."
        description="From pre-construction planning through final punch list, Titan delivers every phase of the construction lifecycle."
      />
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ServiceGrid />
        </div>
      </section>
      <CTASection />
    </>
  );
}