import { navItems } from "../../../lib/data";
import { Wordmark, Button } from "../primitives";
import { CommandMenu } from "../patterns/CommandMenu";
import { useState, useEffect, useRef } from "react";
import { cn } from "../../../lib/cn";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const firstLink = navRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-steel-950/85 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <a href="/" className="flex-shrink-0" aria-label="TITAN Build Co. home">
          <Wordmark />
        </a>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs text-steel-400 hover:text-amber-500 uppercase tracking-widest font-medium transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CommandMenu />
          <Button variant="primary" size="sm" className="hidden sm:inline-flex">
            Start Project
          </Button>

          <button
            ref={triggerRef}
            className="md:hidden text-steel-400 hover:text-amber-500 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          ref={navRef}
          className={cn(
            "md:hidden border-t border-steel-800 bg-steel-950/95 backdrop-blur-md",
            "animate-in slide-in-from-top-2 duration-200",
          )}
        >
          <nav className="flex flex-col py-4 px-6 gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-steel-400 hover:text-amber-500 uppercase tracking-widest font-medium py-3 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-steel-800 mt-2">
              <Button variant="primary" size="md" className="w-full">
                Start Project
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}