import { useEffect } from "react";
import { PageHero, SectionDivider } from "../components/ui/layout";
import { ProjectGrid } from "../components/ui/patterns/ProjectGrid";
import { CTASection } from "../components/ui/patterns/CTASection";

export function ProjectsPage() {
  useEffect(() => { document.title = "Projects | Titan Build Co."; }, []);
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