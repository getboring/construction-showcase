import { cn } from "../../../lib/cn";

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  compact?: boolean;
}

export function PageHero({ label, title, description, backgroundImage, compact = false }: PageHeroProps) {
  return (
    <section className={cn("relative px-6", compact ? "pt-32 pb-16" : "pt-36 pb-24")}>
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            role="presentation"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-steel-950/80" />
        </>
      )}
      <div className="max-w-7xl mx-auto relative z-10">
        {label && <p className="section-label">{label}</p>}
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-zinc-50 leading-[0.85]">
          {title}
        </h1>
        {description && (
          <p className="text-steel-400 text-lg md:text-xl max-w-2xl mt-6 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}