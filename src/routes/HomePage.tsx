import { useRouteMeta } from "../lib/useRouteMeta";
import { Hero, FeaturedProject, CTASection } from "../components/ui/patterns";
import { NumberCounters } from "../components/ui/motion/NumberCounters";
import { BeforeAfter } from "../components/ui/motion/BeforeAfter";
import { HorizontalScroll } from "../components/ui/motion/HorizontalScroll";
import { ClipPathReveal } from "../components/ui/motion/ClipPathReveal";
import { ParallaxEquipment } from "../components/ui/motion/ParallaxEquipment";
import { ScrollTimeline } from "../components/ui/motion/ScrollTimeline";
import { TextScramble } from "../components/ui/motion/TextScramble";
import { SectionDivider } from "../components/ui/layout";
import { ServiceGrid } from "../components/ui/content/ServiceCard";

export function HomePage() {
  useRouteMeta({
    title: "Commercial Construction, Done Right",
    description: "Industrial construction since 1998. Commercial, healthcare, industrial, and residential construction across the Southeast.",
    ogImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
  });

  return (
    <>
      <Hero
        label="Industrial Construction Since 1998"
        title="WE BUILD THE THINGS THAT MATTER"
        titleHighlight="THE THINGS"
        description="Commercial. Healthcare. Industrial. Residential. Twenty-seven years of steel, concrete, and reputation across the Southeast."
        primaryAction={{ label: "See Our Work", href: "/projects" }}
        secondaryAction={{ label: "Get a Bid", href: "/quote" }}
      />
      <FeaturedProject />
      <SectionDivider />
      <NumberCounters />
      <SectionDivider />
      <ServiceGrid />
      <SectionDivider />
      <BeforeAfter />
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