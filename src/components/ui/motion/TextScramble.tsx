import { useEffect, useRef, useState } from "react";
import { Section, Container } from "../layout";
import { SectionHeader } from "../layout";
import { certifications } from "../../../lib/data";

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useTextScramble(text: string, trigger: boolean) {
  const [display, setDisplay] = useState(prefersReducedMotion && trigger ? text : " ".repeat(text.length));

  useEffect(() => {
    if (!trigger) return;

    if (prefersReducedMotion) {
      return;
    }

    let frame = 0;
    const totalFrames = text.length * 3;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const resolved = Math.floor(progress * text.length);

      const result = text
        .split("")
        .map((char, i) => {
          if (i < resolved) return char;
          if (char === " ") return " ";
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join("");

      setDisplay(result);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return display;
}

function ScrambleItem({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const display = useTextScramble(text, visible);

  return (
    <div
      ref={ref}
      className="bg-steel-900/60 border border-steel-800 rounded-lg p-6 text-center hover:border-amber-500/50 transition-colors"
    >
      <p className="font-mono text-base md:text-lg text-amber-500 font-medium">{display}</p>
    </div>
  );
}

export function TextScramble() {
  return (
    <Section id="scramble">
      <Container className="max-w-5xl">
        <SectionHeader
          label="Credentials"
          title="BUILT TO STANDARD"
          description="Our certifications and commitments to safety, quality, and excellence."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <ScrambleItem key={cert} text={cert} delay={i * 200} />
          ))}
        </div>
      </Container>
    </Section>
  );
}