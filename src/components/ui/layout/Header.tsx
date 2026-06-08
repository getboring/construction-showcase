import { navItems } from "../../../lib/data";
import { Wordmark, Button } from "../primitives";
import { DrawerRoot, DrawerContent } from "../primitives/Drawer";
import { CommandMenu } from "../patterns/CommandMenu";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../lib/cn";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const isFirstRender = useRef(true);

  const closeDrawer = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    closeDrawer();
  }, [location.pathname, closeDrawer]);

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
        <Link to="/" className="flex-shrink-0" aria-label="TITAN Build Co. home">
          <Wordmark />
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-xs uppercase tracking-widest font-medium transition-colors whitespace-nowrap px-3 py-2 rounded",
                "text-steel-400 hover:text-amber-500",
                "focus-visible:outline-2 focus-visible:outline-amber-500",
                location.pathname === item.href && "text-amber-500",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CommandMenu />
          <Button variant="primary" size="sm" className="hidden sm:inline-flex" as="a" href="/quote">
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
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <DrawerRoot open={mobileOpen} onOpenChange={setMobileOpen}>
        <DrawerContent>
          <div ref={navRef} className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex-shrink-0" aria-label="TITAN Build Co. home" onClick={() => setMobileOpen(false)}>
                <Wordmark />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-steel-400 hover:text-amber-500 transition-colors p-2 rounded focus-visible:outline-2 focus-visible:outline-amber-500"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1 flex-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "text-sm uppercase tracking-widest font-medium py-3 px-4 rounded transition-colors",
                    "text-steel-400 hover:text-amber-500 hover:bg-steel-900",
                    "focus-visible:outline-2 focus-visible:outline-amber-500",
                    location.pathname === item.href && "text-amber-500 bg-steel-900",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-steel-800 mt-4">
              <Button variant="primary" size="md" className="w-full" as="a" href="/quote">
                Start Project
              </Button>
            </div>
          </div>
        </DrawerContent>
      </DrawerRoot>
    </header>
  );
}