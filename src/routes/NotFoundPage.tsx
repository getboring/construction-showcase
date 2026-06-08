import { useEffect } from "react";
import { Link } from "react-router-dom";

export function NotFoundPage() {

  useEffect(() => {
    document.title = "404 - Page Not Found | TITAN Build Co.";
  }, []);

  return (
    <div className="min-h-[60vh] bg-steel-950 flex items-center justify-center">
      <div className="text-center max-w-lg mx-auto px-6 py-24">
        <p className="font-mono text-xs text-amber-500 uppercase tracking-widest mb-4">Error 404</p>
        <h1 className="font-display text-6xl text-zinc-50 mb-6">PAGE NOT FOUND.</h1>
        <p className="text-steel-400 text-sm leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
          Head back to the homepage to find what you need.
        </p>
        <Link
          to="/"
          className="inline-block bg-amber-500 hover:bg-amber-400 text-steel-950 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}