import { useEffect } from "react";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { ParallaxEquipment } from "../components/ui/motion/ParallaxEquipment";
import { EquipmentCard } from "../components/ui/content/EquipmentCard";
import { equipmentList } from "../lib/data";
import { CTASection } from "../components/ui/patterns/CTASection";

export function FleetPage() {
  useEffect(() => { document.title = "Fleet | Titan Build Co."; }, []);
  return (
    <>
      <PageHero
        label="Fleet"
        title="HEAVY EQUIPMENT."
        description="$48M fleet investment. Owned and maintained in-house. No subcontractor bottlenecks."
      />
      <SectionDivider />
      <ParallaxEquipment />
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">Full Inventory</p>
          <h2 className="font-display text-5xl md:text-7xl text-zinc-50 leading-none mb-12">OUR FLEET.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentList.map((eq) => (
              <EquipmentCard key={eq.id} equipment={eq} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}