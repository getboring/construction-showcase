import { useRouteMeta } from "../lib/useRouteMeta";
import { useLoaderData, Link } from "react-router-dom";
import { PageHero, SectionDivider, Breadcrumbs } from "../components/ui/layout";
import { testimonials, formatCents, formatSqft } from "../lib/data";
import { CTASection } from "../components/ui/patterns/CTASection";
import { ImageLightbox } from "../components/ui/content/ImageLightbox";
import { TestimonialCard } from "../components/ui/content/TestimonialCard";
import { Meter } from "../components/ui/primitives/Meter";
import { JsonLd } from "../lib/jsonLd";
import { projectLd } from "../lib/jsonLd-data";

const statusProgress: Record<string, number> = {
  pre_construction: 10,
  in_progress: 55,
  topped_out: 85,
  completed: 100,
};

const projectImages: Record<string, string[]> = {
  "meridian-tower": [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
  ],
  "riverside-commons": [
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format&fit=crop",
  ],
  "summit-medical-center": [
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
  ],
};

export function ProjectDetailPage() {
  const loaderData: { project: { id: string; slug: string; name: string; type: string; status: string; location: string; sqft: number; valueCents: number; year: number; description: string; client: string | null; completionDate: string | null; image: string; } } = useLoaderData();
  const project = loaderData.project;

  useRouteMeta({
    title: project.name,
    description: project.description,
    ogImage: project.image,
    canonicalPath: `/projects/${project.slug}`,
  });

  const images = projectImages[project.slug] ?? [project.image];
  const projectTestimonials = testimonials.filter((t) => t.projectId === project.id);

  return (
    <>
      <JsonLd data={projectLd(project)} />
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={[{ label: "Projects", href: "/projects" }, { label: project.name }]} />
        </div>
      </section>
      <PageHero label={project.type.toUpperCase()} title={project.name.toUpperCase()} description={project.description} backgroundImage={project.image} />
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Location", value: project.location },
              { label: "Size", value: `${formatSqft(project.sqft)} sq ft` },
              { label: "Value", value: formatCents(project.valueCents) },
              { label: "Status", value: project.status.replace("_", " ") },
            ].map((stat) => (
              <div key={stat.label} className="border-l-2 border-amber-500 pl-6">
                <p className="font-mono text-xs text-steel-500 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="font-display text-2xl text-zinc-50">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 max-w-md">
            <Meter
              value={statusProgress[project.status] ?? 50}
              label="Project Progress"
              variant={project.status === "completed" ? "success" : "amber"}
            />
          </div>
        </div>
      </section>

      {images.length > 1 && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <p className="section-label">Gallery</p>
            <h2 className="font-display text-4xl md:text-5xl text-zinc-50 leading-none mb-8">PROJECT PHOTOS.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <ImageLightbox key={i} src={img} alt={`${project.name} photo ${i + 1}`} />
              ))}
            </div>
          </div>
        </section>
      )}

      {projectTestimonials.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="section-label">Client Feedback</p>
            <h2 className="font-display text-4xl md:text-5xl text-zinc-50 leading-none mb-8">WHAT THEY SAID.</h2>
            <div className="space-y-4">
              {projectTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em] mb-4">Ready to Start?</p>
          <h2 className="font-display text-4xl md:text-5xl text-zinc-50 leading-none mb-6">LET'S DISCUSS YOUR PROJECT.</h2>
          <p className="text-steel-400 max-w-xl mx-auto mb-8">Every project starts with a conversation. Tell us about yours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/quote" className="bg-amber-500 hover:bg-amber-400 text-steel-950 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors inline-flex items-center justify-center">
              Get a Quote
            </Link>
            <Link to="/contact" className="border border-steel-700 hover:border-amber-500 text-zinc-100 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors inline-flex items-center justify-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}