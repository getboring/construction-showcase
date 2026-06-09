import { useRouteMeta } from "../lib/useRouteMeta";
import { Link } from "react-router-dom";
import { PageHero, SectionDivider } from "../components/ui/layout";

export function BlogPage() {
  useRouteMeta({
    title: "Blog",
    description: "Project updates, industry insights, and company news from J.A. Street & Associates",
    canonicalPath: "/blog",
  });

  return (
    <>
      <PageHero
        label="News"
        title="FROM THE FIELD."
        description="Project updates, industry insights, and company news."
      />
      <SectionDivider />
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-amber-500 text-xs uppercase tracking-[0.2em] mb-6">Coming Soon</p>
          <h2 className="font-display text-4xl md:text-6xl text-zinc-50 leading-none mb-4">ARTICLES.</h2>
          <p className="text-steel-400 text-lg max-w-xl mx-auto">We're building the blog. In the meantime, check out our projects or reach out directly.</p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/projects" className="bg-amber-500 hover:bg-amber-400 text-steel-950 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors inline-flex items-center justify-center">View Projects</Link>
            <Link to="/contact" className="border border-steel-700 hover:border-amber-500 text-zinc-100 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors inline-flex items-center justify-center">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}