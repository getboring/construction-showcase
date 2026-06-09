import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "../components/ui/layout/Header";
import { Footer } from "../components/ui/layout/Footer";
import { TrustBar } from "../components/ui/patterns/TrustBar";
import { JsonLd } from "../lib/jsonLd";
import { localBusinessLd } from "../lib/jsonLd-data";

export function Layout() {
  return (
    <div className="min-h-screen bg-steel-950">
      <ScrollRestoration />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-amber-500 focus:text-steel-950 focus:px-4 focus:py-2 focus:rounded focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest">
        Skip to content
      </a>
      <JsonLd data={localBusinessLd} />
      <Header />
      <TrustBar />
      <main id="main-content" aria-label="Main content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}