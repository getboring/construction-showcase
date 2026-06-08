import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, SectionHeader } from "../layout";
import { featuredProjects } from "../../../lib/data";
import { ScrollAreaRoot } from "../primitives/ScrollArea";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="scroll-mt-20">
      <Container className="py-12">
        <SectionHeader
          label="Selected Work"
          title="OUR WORK"
          description="Scroll to explore projects"
        />
      </Container>
      <div ref={containerRef} className="overflow-hidden">
        {typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? (
          <ScrollAreaRoot orientation="horizontal" className="pb-4">
            <div
              ref={trackRef}
              className="flex gap-6 px-6 md:px-12 pb-4"
              style={{ width: "max-content" }}
            >
              {featuredProjects.map((project) => (
                <ProjectSlide key={project.id} project={project} />
              ))}
            </div>
          </ScrollAreaRoot>
        ) : (
          <div
            ref={trackRef}
            className="flex gap-6 px-6 md:px-12 pb-12"
            style={{ width: "max-content" }}
          >
            {featuredProjects.map((project) => (
              <ProjectSlide key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectSlide({ project }: { project: typeof featuredProjects[number] }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="w-[80vw] md:w-[600px] h-[70vh] rounded-lg relative overflow-hidden group flex-shrink-0 image-grain block"
    >
      <img
        src={project.image}
        alt={project.name}
        width={600}
        height={500}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em] mb-2">
          {project.type} · {project.location}
        </p>
        <h3 className="font-display text-4xl md:text-5xl text-zinc-50 leading-none mb-3">
          {project.name.toUpperCase()}
        </h3>
        <div className="flex gap-6 font-mono text-xs text-steel-300 uppercase tracking-widest">
          <span>{project.sqft.toLocaleString()} sq ft</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
      </div>
      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white text-xl">&rarr;</span>
      </div>
    </Link>
  );
}