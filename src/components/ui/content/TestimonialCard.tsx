import type { Testimonial } from "../../../db/schema";
import { cn } from "../../../lib/cn";

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: "dark" | "warm";
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

export function TestimonialCard({ testimonial, variant = "dark", className }: TestimonialCardProps) {
  const photo = testimonial.photo || getFallbackPhoto(testimonial.id);

  return (
    <div className={cn(
      "rounded-lg p-6 border",
      variant === "dark" && "bg-steel-900/60 border-steel-800",
      variant === "warm" && "bg-white border-burgundy-100 shadow-sm",
      className,
    )}>
      <div className="flex items-center gap-3 mb-4">
        <img src={photo} alt={testimonial.name} loading="lazy" width={40} height={40} className={cn(
          "w-10 h-10 rounded-full object-cover",
          variant === "dark" && "border border-steel-700",
          variant === "warm" && "border-2 border-burgundy-200",
        )} />
        <div>
          <p className={cn(
            "text-sm font-medium",
            variant === "dark" && "text-zinc-50",
            variant === "warm" && "text-steel-900",
          )}>{testimonial.name}</p>
          <p className={cn(
            "font-mono text-xs",
            variant === "dark" && "text-steel-500",
            variant === "warm" && "text-burgundy-500",
          )}>{testimonial.company}{testimonial.role ? ` · ${testimonial.role}` : ""}</p>
        </div>
      </div>
      <p className={cn(
        "text-sm leading-relaxed italic",
        variant === "dark" && "text-steel-300",
        variant === "warm" && "text-steel-600",
      )}>&ldquo;{testimonial.quote}&rdquo;</p>
    </div>
  );
}
