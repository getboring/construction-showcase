import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section, Container } from "../layout";
import { SectionHeader } from "../layout";

gsap.registerPlugin(ScrollTrigger);

const beforeImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop";
const afterImage = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80&auto=format&fit=crop";

export function ClipPathReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 50% 0 50%)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "center center",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="clip-path">
      <Container>
        <SectionHeader
          label="The Reveal"
          title="FROM VISION TO REALITY"
          description="Scroll to watch the transformation. Empty lot becomes landmark."
        />
      </Container>
      <div
        ref={sectionRef}
        className="relative w-full h-[70vh] overflow-hidden rounded-lg max-w-7xl mx-auto image-grain"
      >
        <img
          src={afterImage}
          alt="Completed building"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 0% 0 0%)" }}
        >
            <img
              src={beforeImage}
              alt="Construction site"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
        </div>
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{ opacity: 0 }}
        >
          <div className="bg-steel-900/80 backdrop-blur px-6 py-3 rounded border border-amber-500/30">
            <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em]">
              The Transformation
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}