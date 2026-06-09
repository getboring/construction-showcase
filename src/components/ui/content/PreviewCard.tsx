import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { formatCents, formatSqft } from "../../../lib/data";
import type { Project } from "../../../db/schema";
import { Badge } from "../primitives";

interface PreviewCardProps {
  project: Project;
  className?: string;
}

export function PreviewCard({ project, className }: PreviewCardProps) {
  const statusLabel = project.status.replace(/_/g, " ");
  const statusColor: Record<string, string> = {
    completed: "success",
    in_progress: "amber",
    topped_out: "amber",
    pre_construction: "default",
  };

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={cn(
        "group relative block h-[50vh] sm:h-[55vh] min-h-[380px] sm:min-h-[420px] rounded-lg overflow-hidden image-grain focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2",
        className,
      )}
    >
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        width={1600}
        height={900}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/50 transition-all duration-500" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant={statusColor[project.status] as "amber" | "success" | "default" ?? "amber"}>{statusLabel}</Badge>
            <Badge variant="outline">{project.type}</Badge>
          </div>

          <h3 className="font-display text-3xl md:text-4xl text-zinc-50 leading-none mb-2 group-hover:text-amber-400 transition-colors duration-300">
            {project.name.toUpperCase()}
          </h3>

          <p className="text-steel-300 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>

          <div className="flex gap-6 font-mono text-xs text-steel-400 uppercase tracking-widest mb-4">
            <span>{formatSqft(project.sqft)} sq ft</span>
            <span>{formatCents(project.valueCents)}</span>
            <span>{project.location}</span>
          </div>

          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-150">
            <span>View Project</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}