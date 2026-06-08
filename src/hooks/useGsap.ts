import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useGsapScroll(
  callback: (self: ScrollTrigger) => void,
  options?: { start?: string; end?: string; scrub?: boolean | number; once?: boolean },
) {
  const ref = useRef<HTMLDivElement>(null);
  const stableOptions = useMemo(() => options, [options?.start, options?.end, options?.scrub, options?.once]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      ScrollTrigger.create({
        trigger: ref.current,
        start: stableOptions?.start ?? "top 80%",
        end: stableOptions?.end ?? "bottom 20%",
        scrub: stableOptions?.scrub ?? false,
        once: stableOptions?.once ?? false,
        onEnter: stableOptions?.once ? (self) => callback(self) : undefined,
        onUpdate: stableOptions?.once ? undefined : (self) => callback(self),
      });
    }, ref);

    return () => ctx.revert();
  }, [callback, stableOptions]);

  return ref;
}

export function useGsapPin(callback: (tl: gsap.core.Timeline) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${ref.current!.scrollHeight}`,
          scrub: 1,
          pin: true,
        },
      });
      callback(tl);
    }, ref);

    return () => ctx.revert();
  }, [callback]);

  return ref;
}

export function useGsapCounter(
  target: number,
  options?: { decimals?: number; duration?: number; suffix?: string },
) {
  const ref = useRef<HTMLSpanElement>(null);
  const obj = useRef({ val: 0 });
  const stableOptions = useMemo(() => options, [options?.decimals, options?.duration, options?.suffix]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (ref.current) {
        ref.current.textContent = stableOptions?.decimals
          ? target.toFixed(stableOptions.decimals)
          : Math.round(target).toLocaleString();
      }
      return;
    }
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      gsap.to(obj.current, {
        val: target,
        duration: stableOptions?.duration ?? 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
        onUpdate: () => {
          if (!ref.current) return;
          ref.current.textContent = stableOptions?.decimals
            ? obj.current.val.toFixed(stableOptions.decimals)
            : Math.round(obj.current.val).toLocaleString();
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [target, stableOptions]);

  return ref;
}

export function useGsapClipPath(
  options?: { startInset?: string; endInset?: string },
) {
  const ref = useRef<HTMLDivElement>(null);
  const stableOptions = useMemo(() => options, [options?.startInset, options?.endInset]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        clipPath: `inset(${stableOptions?.endInset ?? "0 50% 0 50%"})`,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [stableOptions]);

  return ref;
}

export function useGsapParallax(yRange: [number, number] = [-60, 60]) {
  const ref = useRef<HTMLDivElement>(null);
  const stableRange = useMemo(() => yRange, [yRange[0], yRange[1]]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { y: stableRange[0] },
        {
          y: stableRange[1],
          ease: "none",
          scrollTrigger: {
            trigger: ref.current.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [stableRange]);

  return ref;
}

export function useGsapStagger(selector: string, options?: { y?: number; stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const stableOptions = useMemo(() => options, [options?.y, options?.stagger]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      gsap.fromTo(
        selector,
        { opacity: 0, y: stableOptions?.y ?? 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: stableOptions?.stagger ?? 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [selector, stableOptions]);

  return ref;
}

export function useGsapTextReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}