import { useRouteMeta } from "../lib/useRouteMeta";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { ProjectGrid } from "../components/ui/patterns/ProjectGrid";
import { CTASection } from "../components/ui/patterns/CTASection";

export function ProjectsPage() {
  useRouteMeta({
    title: "Projects",
    description: "Eight hundred forty-seven projects across four states. Here are some of the ones that changed skylines.",
    canonicalPath: "/projects",
  });

  return (
    <>
      <PageHero
        label="Portfolio"
        title="OUR WORK."
        description="Eight hundred forty-seven projects across four states. Here are some of the ones that changed skylines."
      />
      <SectionDivider />
      <ProjectGrid />
      <CTASection />
    </>
  );
}