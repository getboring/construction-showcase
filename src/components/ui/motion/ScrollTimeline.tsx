import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section, Container } from "../layout";
import { SectionHeader } from "../layout";
import { phases } from "../../../lib/data";

gsap.registerPlugin(ScrollTrigger);

export function ScrollTimeline() {
  const lineRef = useRef<SVGLineElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        });
      }

      phases.forEach((_, i) => {
        gsap.fromTo(
          `.phase-${i}`,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: `.phase-${i}`,
              start: "top 80%",
              once: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="timeline">
      <Container className="max-w-4xl">
        <SectionHeader
          label="Process"
          title="HOW WE BUILD"
          description="Every project follows our proven 6-phase process. No surprises. No missed deadlines."
        />

        <div ref={containerRef} className="relative">
          <svg
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 h-full -translate-x-1/2"
            style={{ overflow: "visible" }}
          >
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="#27272a"
              strokeWidth="2"
            />
            <line
              ref={lineRef}
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="#f59e0b"
              strokeWidth="2"
            />
          </svg>

          <div className="space-y-16">
            {phases.map((phase, i) => (
              <div
                key={phase.title}
                className={`phase-${i} relative flex items-center gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-steel-950 z-10" />
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                  }`}
                >
                  <div className="bg-steel-900/60 border border-steel-800 rounded-lg p-6">
                    <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em] mb-2">
                      Phase {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-zinc-50 leading-none mb-2">
                      {phase.title.toUpperCase()}
                    </h3>
                    <p className="text-steel-400 text-sm mb-3 leading-relaxed">{phase.desc}</p>
                    <span className="font-mono text-xs text-steel-500 uppercase tracking-widest">
                      {phase.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}