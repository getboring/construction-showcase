import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageHero, SectionDivider, Breadcrumbs } from "../components/ui/layout";
import { featuredProjects, testimonials, formatCents, formatSqft } from "../lib/data";
import { CTASection } from "../components/ui/patterns/CTASection";
import { ImageLightbox } from "../components/ui/content/ImageLightbox";
import { TestimonialCard } from "../components/ui/content/TestimonialCard";
import { Meter } from "../components/ui/primitives/Meter";

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
  const { slug } = useParams();
  const project = featuredProjects.find((p) => p.slug === slug);

  useEffect(() => {
    if (project) document.title = `${project.name} | Titan Build Co.`;
  }, [project]);

  if (!project) {
    return <PageHero title="PROJECT NOT FOUND" description="The project you're looking for doesn't exist." />;
  }

  const images = projectImages[project.slug] ?? [project.image];
  const projectTestimonials = testimonials.filter((t) => t.projectId === project.id);

  return (
    <>
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
                <div key={i} className="relative h-64 rounded-lg overflow-hidden">
                  <ImageLightbox src={img} alt={`${project.name} photo ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {projectTestimonials.length > 0 && (
        <>
          <SectionDivider />
          <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
              <p className="section-label">Testimonials</p>
              <h2 className="font-display text-4xl md:text-5xl text-zinc-50 leading-none mb-8">WHAT THEY SAID.</h2>
              <div className="space-y-4">
                {projectTestimonials.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <CTASection />
    </>
  );
}