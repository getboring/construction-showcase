interface WebVitalMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType: string;
  timestamp: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput?: boolean;
  value: number;
}

export function getRating(name: string, value: number): "good" | "needs-improvement" | "poor" {
  const thresholds: Record<string, [number, number]> = {
    LCP: [2500, 4000],
    FID: [100, 300],
    CLS: [0.1, 0.25],
    INP: [200, 500],
    FCP: [1800, 3000],
    TTFB: [800, 1800],
  };
  const [good, poor] = thresholds[name] ?? [0, Infinity];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

function getNavType(): string {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return nav?.type ?? "unknown";
}

function observeLCP(onMetric: (m: WebVitalMetric) => void) {
  if (typeof PerformanceObserver === "undefined") return;
  try {
    const po = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        onMetric({
          name: "LCP",
          value: last.startTime,
          rating: getRating("LCP", last.startTime),
          delta: last.startTime,
          navigationType: getNavType(),
          timestamp: Date.now(),
        });
      }
    });
    po.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    // LCP observer not supported
  }
}

function observeCLS(onMetric: (m: WebVitalMetric) => void) {
  if (typeof PerformanceObserver === "undefined") return;
  try {
    let value = 0;
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as LayoutShiftEntry;
        if (!shift.hadRecentInput) {
          value += shift.value;
        }
      }
      onMetric({
        name: "CLS",
        value,
        rating: getRating("CLS", value),
        delta: value,
        navigationType: getNavType(),
        timestamp: Date.now(),
      });
    });
    po.observe({ type: "layout-shift", buffered: true });
  } catch {
    // CLS observer not supported
  }
}

function observeFCP(onMetric: (m: WebVitalMetric) => void) {
  if (typeof PerformanceObserver === "undefined") return;
  try {
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          onMetric({
            name: "FCP",
            value: entry.startTime,
            rating: getRating("FCP", entry.startTime),
            delta: entry.startTime,
            navigationType: getNavType(),
            timestamp: Date.now(),
          });
        }
      }
    });
    po.observe({ type: "paint", buffered: true });
  } catch {
    // FCP observer not supported
  }
}

function observeTTFB(onMetric: (m: WebVitalMetric) => void) {
  if (typeof PerformanceObserver === "undefined") return;
  try {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (nav) {
      const ttfb = nav.responseStart - nav.requestStart;
      onMetric({
        name: "TTFB",
        value: ttfb,
        rating: getRating("TTFB", ttfb),
        delta: ttfb,
        navigationType: nav.type,
        timestamp: Date.now(),
      });
    }
  } catch {
    // Navigation timing not supported
  }
}

export function initWebVitals(onMetric?: (metric: WebVitalMetric) => void) {
  const handler = onMetric ?? ((m: WebVitalMetric) => {
    if (m.rating !== "good") {
      console.warn(`[Web Vitals] ${m.name}: ${m.value.toFixed(1)}ms (${m.rating})`);
    }
  });

  if (typeof window === "undefined" || typeof PerformanceObserver === "undefined") return;

  observeLCP(handler);
  observeCLS(handler);
  observeFCP(handler);
  observeTTFB(handler);
}

export type { WebVitalMetric };