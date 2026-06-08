import { useState } from "react";
import { featuredProjects } from "../../../lib/data";
import { ProjectCard } from "../content";
import { Section, Container, SectionHeader } from "../layout";
import { cn } from "../../../lib/cn";
import type { Project } from "../../../db/schema";

const projectTypes = ["all", "commercial", "residential", "industrial", "healthcare", "mixed_use"] as const;

export function ProjectGrid({ projects = featuredProjects }: { projects?: Project[] }) {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <Section id="projects">
      <Container>
        <SectionHeader label="Our Work" title="PROJECTS" />
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by type">
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              aria-pressed={filter === type}
              className={cn(
                "font-mono text-xs uppercase tracking-widest px-4 py-2 rounded transition-colors",
                filter === type
                  ? "bg-amber-500 text-steel-950 font-bold"
                  : "border border-steel-700 text-steel-400 hover:border-amber-500 hover:text-amber-400",
              )}
            >
              {type === "all" ? "All" : type.replace("_", " ")}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}