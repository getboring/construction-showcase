import { Link } from "react-router-dom";
import { siteConfig } from "../../../lib/data";
import { Wordmark, Separator } from "../primitives";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-steel-800 py-16 px-6 bg-steel-950" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" aria-label="TITAN Build Co. home">
              <Wordmark />
            </Link>
            <p className="text-steel-500 text-sm mt-4 leading-relaxed">
              {siteConfig.tagline}. Commercial, healthcare, industrial, and residential construction across the Southeast.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs text-amber-500 uppercase tracking-[0.15em] mb-4">Services</h3>
            <ul className="space-y-2">
              {["General Contracting", "Design-Build", "Construction Mgmt", "Pre-Construction"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-sm text-steel-400 hover:text-amber-400 transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs text-amber-500 uppercase tracking-[0.15em] mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Safety", href: "/safety" },
                { label: "Careers", href: "/careers" },
              ].map((s) => (
                <li key={s.label}>
                  <Link to={s.href} className="text-sm text-steel-400 hover:text-amber-400 transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs text-amber-500 uppercase tracking-[0.15em] mb-4">Contact</h3>
            <address className="not-italic space-y-2 text-sm text-steel-400">
              <p>{siteConfig.address}</p>
              <p>
                <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="hover:text-amber-400 transition-colors">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-400 transition-colors">
                  {siteConfig.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <p className="font-mono text-xs text-steel-600 uppercase tracking-widest">
            {siteConfig.licensing}
          </p>
          <p className="text-steel-600 text-xs">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}