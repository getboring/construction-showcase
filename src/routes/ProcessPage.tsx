import { useRouteMeta } from "../lib/useRouteMeta";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { ScrollTimeline } from "../components/ui/motion/ScrollTimeline";
import { CTASection } from "../components/ui/patterns/CTASection";

export function ProcessPage() {
  useRouteMeta({
    title: "Our Process",
    description: "Six phases. Zero surprises. Every Titan project follows the same proven process from groundbreaking to handoff.",
  });

  return (
    <>
      <PageHero
        label="Process"
        title="HOW WE BUILD."
        description="Six phases. Zero surprises. Every Titan project follows the same proven process from groundbreaking to handoff."
      />
      <SectionDivider />
      <ScrollTimeline />
      <CTASection />
    </>
  );
}