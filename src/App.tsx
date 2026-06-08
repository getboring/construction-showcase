import { Component, lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./routes/Layout";

const HomePage = lazy(() => import("./routes/HomePage").then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("./routes/AboutPage").then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import("./routes/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import("./routes/ServiceDetailPage").then((m) => ({ default: m.ServiceDetailPage })));
const ProjectsPage = lazy(() => import("./routes/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import("./routes/ProjectDetailPage").then((m) => ({ default: m.ProjectDetailPage })));
const ProcessPage = lazy(() => import("./routes/ProcessPage").then((m) => ({ default: m.ProcessPage })));
const FleetPage = lazy(() => import("./routes/FleetPage").then((m) => ({ default: m.FleetPage })));
const SafetyPage = lazy(() => import("./routes/SafetyPage").then((m) => ({ default: m.SafetyPage })));
const CareersPage = lazy(() => import("./routes/CareersPage").then((m) => ({ default: m.CareersPage })));
const ContactPage = lazy(() => import("./routes/ContactPage").then((m) => ({ default: m.ContactPage })));
const QuotePage = lazy(() => import("./routes/QuotePage").then((m) => ({ default: m.QuotePage })));
const BlogPage = lazy(() => import("./routes/BlogPage").then((m) => ({ default: m.BlogPage })));
const NotFoundPage = lazy(() => import("./routes/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

function Loading() {
  return (
    <div className="min-h-screen bg-steel-950 flex items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
        <p className="font-mono text-xs text-steel-500 uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-steel-950 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <h1 className="font-display text-4xl text-zinc-50 mb-4">SOMETHING WENT WRONG.</h1>
            <p className="text-steel-400 text-sm mb-6">{this.state.error?.message ?? "An unexpected error occurred."}</p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
              className="bg-amber-500 hover:bg-amber-400 text-steel-950 font-bold uppercase tracking-widest text-sm px-6 py-3 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/:slug" element={<ServiceDetailPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectDetailPage />} />
              <Route path="process" element={<ProcessPage />} />
              <Route path="fleet" element={<FleetPage />} />
              <Route path="safety" element={<SafetyPage />} />
              <Route path="careers" element={<CareersPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="quote" element={<QuotePage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}