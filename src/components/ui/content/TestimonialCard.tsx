import type { Testimonial } from "../../../db/schema";
import { cn } from "../../../lib/cn";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

const fallbackPhotos = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&auto=format&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&crop=face",
];

function getFallbackPhoto(id: string): string {
  const index = id.charCodeAt(0) % fallbackPhotos.length;
  return fallbackPhotos[index];
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const photo = testimonial.photo || getFallbackPhoto(testimonial.id);

  return (
    <div className={cn("bg-steel-900/60 border border-steel-800 rounded-lg p-6", className)}>
      <div className="flex items-center gap-3 mb-4">
        <img src={photo} alt={testimonial.name} loading="lazy" width={40} height={40} className="w-10 h-10 rounded-full object-cover border border-steel-700" />
        <div>
          <p className="text-zinc-50 text-sm font-medium">{testimonial.name}</p>
          <p className="font-mono text-xs text-steel-500">{testimonial.company}{testimonial.role ? ` · ${testimonial.role}` : ""}</p>
        </div>
      </div>
      <p className="text-steel-300 text-sm leading-relaxed italic">"{testimonial.quote}"</p>
    </div>
  );
}