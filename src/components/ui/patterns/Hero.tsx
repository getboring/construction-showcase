import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";

interface HeroProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  backgroundImage?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  className?: string;
}

export function Hero({
  label,
  title,
  titleHighlight,
  description,
  backgroundImage,
  primaryAction,
  secondaryAction,
  className,
}: HeroProps) {
  const titleParts = titleHighlight ? title.split(titleHighlight) : [title];

  return (
    <header className={cn("pt-32 pb-20 px-6 relative bg-blueprint", className)}>
      {backgroundImage && (
        <>
          <img src={backgroundImage} alt="" role="presentation" width={1600} height={900} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-steel-950/80" />
        </>
      )}
      <div className="max-w-7xl mx-auto relative z-10">
        {label && <p className="section-label">{label}</p>}
        <h1 className="font-display text-7xl md:text-9xl font-normal leading-[0.85] mb-6 text-zinc-50">
          {titleParts[0]}
          {titleHighlight && (
            <>
              <br />
              <span className="text-amber-500">{titleHighlight}</span>
              {titleParts[1] && <br />}
              {titleParts[1]}
            </>
          )}
        </h1>
        {description && (
          <p className="text-steel-400 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed">{description}</p>
        )}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap gap-4 mt-10">
            {primaryAction && (
              <Link
                to={primaryAction.href}
                className="bg-amber-500 hover:bg-amber-400 text-steel-950 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors inline-flex items-center justify-center"
              >
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link
                to={secondaryAction.href}
                className="border border-steel-700 hover:border-amber-500 text-zinc-100 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors inline-flex items-center justify-center"
              >
                {secondaryAction.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}