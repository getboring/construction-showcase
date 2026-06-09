import { PreviewCard as BasePreviewCard } from "@base-ui/react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { formatCents, formatSqft } from "../../../lib/data";
import type { Project } from "../../../db/schema";
import { Badge } from "../primitives";
import { useState } from "react";

interface PreviewCardHoverProps {
  project: Project;
  className?: string;
}

export function PreviewCardHover({ project, className }: PreviewCardHoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <BasePreviewCard.Root open={open} onOpenChange={setOpen}>
      <BasePreviewCard.Trigger
        render={<Link to={`/projects/${project.slug}`} />}
        className={cn(
          "group relative block h-[50vh] sm:h-[55vh] min-h-[380px] sm:min-h-[420px] rounded-lg overflow-hidden image-grain",
          "focus-visible:outline-2 focus-visible:outline-amber-500 focus-visible:outline-offset-2",
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
              <Badge variant={project.status === "completed" ? "success" : "amber"}>
                {project.status.replace(/_/g, " ")}
              </Badge>
              <Badge variant="outline">{project.type.replace(/_/g, " ")}</Badge>
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
      </BasePreviewCard.Trigger>

      <BasePreviewCard.Portal>
        <BasePreviewCard.Positioner sideOffset={8} side="right">
          <BasePreviewCard.Popup
            className={cn(
              "bg-steel-900 border border-steel-700 rounded-lg shadow-2xl p-4 w-80 z-50",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
              "transition-[opacity,transform] duration-200",
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display text-lg text-zinc-50">{project.name.toUpperCase()}</h4>
              <Badge variant={project.status === "completed" ? "success" : "amber"}>
                {project.status.replace(/_/g, " ")}
              </Badge>
            </div>
            <p className="text-steel-300 text-sm line-clamp-3 mb-3">{project.description}</p>
            <div className="grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-widest text-steel-400 mb-3">
              <div>
                <span className="block text-amber-500">Area</span>
                {formatSqft(project.sqft)} sq ft
              </div>
              <div>
                <span className="block text-amber-500">Value</span>
                {formatCents(project.valueCents)}
              </div>
              <div>
                <span className="block text-amber-500">Location</span>
                {project.location}
              </div>
              <div>
                <span className="block text-amber-500">Type</span>
                {project.type.replace(/_/g, " ")}
              </div>
            </div>
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-amber-500 font-mono text-xs uppercase tracking-widest hover:text-amber-400 transition-colors"
            >
              View Details
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </BasePreviewCard.Popup>
        </BasePreviewCard.Positioner>
      </BasePreviewCard.Portal>
    </BasePreviewCard.Root>
  );
}