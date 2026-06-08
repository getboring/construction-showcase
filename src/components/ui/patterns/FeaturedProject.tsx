import { Section, Container } from "../layout";
import { Badge } from "../primitives";
import { featuredProjects } from "../../../lib/data";
import { formatCents, formatSqft } from "../../../lib/data";

const heroImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80&auto=format&fit=crop";

export function FeaturedProject() {
  const project = featuredProjects[0];

  return (
    <Section id="featured">
      <Container>
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="section-label">Currently Featured</p>
            <h2 className="font-display text-5xl md:text-6xl text-zinc-50 leading-none">
              {project.name.toUpperCase()}
            </h2>
          </div>
          <Badge variant="amber">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block mr-1" />
            Under Construction
          </Badge>
        </div>

        <div className="relative h-[60vh] min-h-[500px] rounded-lg overflow-hidden group image-grain">
          <img
            src={heroImage}
            alt={`${project.name} construction`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
            <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em] mb-3">
              {project.location} · {formatSqft(project.sqft)} sq ft
            </p>
            <h3 className="font-display text-4xl md:text-6xl text-zinc-50 leading-none mb-4 max-w-3xl">
              THE SKYLINE&apos;S NEW ANCHOR
            </h3>
            <p className="text-steel-300 max-w-xl text-lg leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-6 mt-8 font-mono text-xs uppercase tracking-widest">
              <div>
                <p className="text-steel-500">Contract Value</p>
                <p className="text-zinc-50 text-2xl mt-1 font-display tracking-wide">
                  {formatCents(project.valueCents)}
                </p>
              </div>
              <div>
                <p className="text-steel-500">Completion</p>
                <p className="text-zinc-50 text-2xl mt-1 font-display tracking-wide">
                  {project.completionDate}
                </p>
              </div>
              <div>
                <p className="text-steel-500">Crew</p>
                <p className="text-zinc-50 text-2xl mt-1 font-display tracking-wide">340</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}