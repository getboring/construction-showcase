import { cn } from "../../../lib/cn";
import { services } from "../../../lib/data";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  service?: (typeof services)[number];
  className?: string;
}

const serviceIcons: Record<string, string> = {
  "general-contracting": "building",
  "design-build": "compass",
  "construction-management": "clipboard",
  "pre-construction": "calculator",
  "steel-erection": "wrench",
  concrete: "hard-hat",
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  if (!service) return null;

  return (
    <div className={cn("bg-steel-900 border border-steel-800 rounded-lg p-8 hover:border-amber-500/50 transition-colors group", className)}>
      <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
        <span className="text-amber-500 text-xl">
          {serviceIcons[service.slug] === "building" ? "\u{1F3D7}" :
           serviceIcons[service.slug] === "compass" ? "\u{1F9ED}" :
           serviceIcons[service.slug] === "clipboard" ? "\u{1F4CB}" :
           serviceIcons[service.slug] === "calculator" ? "\u{1F9EE}" :
           serviceIcons[service.slug] === "wrench" ? "\u{1F527}" : "\u{1F3D7}"}
        </span>
      </div>
      <h3 className="font-display text-2xl text-zinc-50 leading-none mb-3 group-hover:text-amber-400 transition-colors">
        {service.title.toUpperCase()}
      </h3>
      <p className="text-steel-400 text-sm leading-relaxed mb-6">{service.description}</p>
      <Link to={`/services/${service.slug}`} className="font-mono text-xs text-amber-500 uppercase tracking-widest hover:text-amber-400 transition-colors underline underline-offset-4 decoration-amber-500/40 hover:decoration-amber-400">
        Learn More &rarr;
      </Link>
    </div>
  );
}

export function ServiceGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}