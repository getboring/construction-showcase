import { useState } from "react";
import { featuredProjects } from "../../../lib/data";
import { ProjectCard } from "../content";
import { Section, Container, SectionHeader } from "../layout";
import { FilterGroup } from "../primitives/ToggleGroup";
import type { Project } from "../../../db/schema";

const projectTypeOptions = [
  { value: "all", label: "All" },
  { value: "commercial", label: "Commercial" },
  { value: "residential", label: "Residential" },
  { value: "industrial", label: "Industrial" },
  { value: "healthcare", label: "Healthcare" },
  { value: "mixed_use", label: "Mixed Use" },
];

export function ProjectGrid({ projects = featuredProjects }: { projects?: Project[] }) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <Section id="projects">
      <Container>
        <SectionHeader label="Our Work" title="PROJECTS" />
        <FilterGroup
          options={projectTypeOptions}
          value={filter}
          onValueChange={setFilter}
          className="mb-8"
          aria-label="Filter projects by type"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}