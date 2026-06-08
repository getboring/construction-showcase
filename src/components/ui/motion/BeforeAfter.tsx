import { useRef, useState, useCallback, useEffect } from "react";
import { Section, Container, SectionHeader } from "../layout";

const beforeImage = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop";
const afterImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&auto=format&fit=crop";

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  const handleMove = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, x)));
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    handleMove(e.clientX);

    const onMove = (ev: PointerEvent) => handleMove(ev.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [handleMove]);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPosition(50);
    };
    window.addEventListener("keyup", onKeyUp);
    return () => window.removeEventListener("keyup", onKeyUp);
  }, []);

  return (
    <Section id="before-after">
      <Container>
        <SectionHeader
          label="Transformation"
          title="BEFORE & AFTER"
          description="Drag the divider. Every project starts as raw earth and ends as something that changes a skyline."
        />
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] overflow-hidden cursor-ew-resize rounded-lg select-none image-grain"
          onPointerDown={handlePointerDown}
          role="img"
          aria-label={`Before and after comparison slider at ${Math.round(position)}%`}
        >
          <img
            src={beforeImage}
            alt="Construction site before"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 z-20 bg-steel-900/80 backdrop-blur px-3 py-1.5 rounded">
            <span className="font-mono text-xs text-amber-500 uppercase tracking-widest">
              BEFORE · Day 1
            </span>
          </div>

          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src={afterImage}
              alt="Completed building after"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 bg-amber-500 px-3 py-1.5 rounded z-20">
              <span className="font-mono text-xs text-steel-950 uppercase tracking-widest font-bold">
                AFTER · Completed
              </span>
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white shadow-2xl shadow-amber-500/50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center">
              <span className="text-steel-950 text-xl font-bold" aria-hidden="true">&larr;&rarr;</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}