import { cn } from "../../../lib/cn";
import { formatCents, formatSqft } from "../../../lib/data";
import type { Project } from "../../../db/schema";
import { Badge } from "../primitives";

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function ProjectCard({ project, variant = "default", className }: ProjectCardProps) {
  if (variant === "compact") {
    return (
      <div className={cn("group bg-steel-900 border border-steel-800 rounded-lg p-6 hover:border-amber-500/50 transition-colors", className)}>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="amber">{project.type}</Badge>
          <span className="font-mono text-xs text-steel-500">{project.year}</span>
        </div>
        <h3 className="font-display text-2xl text-zinc-50 leading-none mb-2 group-hover:text-amber-400 transition-colors">
          {project.name.toUpperCase()}
        </h3>
        <p className="text-steel-400 text-sm">{project.location}</p>
      </div>
    );
  }

  return (
    <div className={cn("relative h-[40vh] sm:h-[50vh] min-h-[320px] sm:min-h-[400px] rounded-lg overflow-hidden group image-grain", className)}>
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        width={1600}
        height={900}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="amber">{project.type}</Badge>
          <span className="font-mono text-xs text-steel-400">{project.location}</span>
        </div>
        <h3 className="font-display text-3xl md:text-4xl text-zinc-50 leading-none mb-2">
          {project.name.toUpperCase()}
        </h3>
        <p className="text-steel-300 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex gap-6 font-mono text-xs text-steel-300 uppercase tracking-widest">
          <span>{formatSqft(project.sqft)} sq ft</span>
          <span>{formatCents(project.valueCents)}</span>
        </div>
      </div>
    </div>
  );
}