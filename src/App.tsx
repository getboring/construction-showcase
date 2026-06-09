import { Component, lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./routes/Layout";
import { featuredProjects, services } from "./lib/data";

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

function RouteErrorBoundary() {
  return (
    <div className="min-h-[60vh] bg-steel-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-display text-4xl text-zinc-50 mb-4">PAGE ERROR.</h1>
        <p className="text-steel-400 text-sm mb-6">Something went wrong loading this page.</p>
        <a
          href="/"
          className="bg-amber-500 hover:bg-amber-400 text-steel-950 font-bold uppercase tracking-widest text-sm px-6 py-3 rounded transition-colors inline-block"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

function LazyRoute({ Component }: { Component: React.LazyExoticComponent<React.ComponentType> }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <LazyRoute Component={HomePage} />,
        loader: () => {
          return { title: "Titan Build Co. | Commercial Construction, Done Right." };
        },
      },
      {
        path: "about",
        element: <LazyRoute Component={AboutPage} />,
        loader: () => {
          return { title: "About | Titan Build Co." };
        },
      },
      {
        path: "services",
        element: <LazyRoute Component={ServicesPage} />,
        loader: () => {
          return { services };
        },
      },
      {
        path: "services/:slug",
        element: <LazyRoute Component={ServiceDetailPage} />,
        loader: ({ params }) => {
          const service = services.find((s) => s.slug === params.slug);
          if (!service) {
            // eslint-disable-next-line @typescript-eslint/only-throw-error -- React Router expects Response for 404
            throw new Response("Service not found", { status: 404 });
          }
          return { service };
        },
      },
      {
        path: "projects",
        element: <LazyRoute Component={ProjectsPage} />,
        loader: () => {
          return { projects: featuredProjects };
        },
      },
      {
        path: "projects/:slug",
        element: <LazyRoute Component={ProjectDetailPage} />,
        loader: ({ params }) => {
          const project = featuredProjects.find((p) => p.slug === params.slug);
          if (!project) {
            // eslint-disable-next-line @typescript-eslint/only-throw-error -- React Router expects Response for 404
            throw new Response("Project not found", { status: 404 });
          }
          return { project };
        },
      },
      {
        path: "process",
        element: <LazyRoute Component={ProcessPage} />,
      },
      {
        path: "fleet",
        element: <LazyRoute Component={FleetPage} />,
      },
      {
        path: "safety",
        element: <LazyRoute Component={SafetyPage} />,
      },
      {
        path: "careers",
        element: <LazyRoute Component={CareersPage} />,
      },
      {
        path: "contact",
        element: <LazyRoute Component={ContactPage} />,
      },
      {
        path: "quote",
        element: <LazyRoute Component={QuotePage} />,
      },
      {
        path: "blog",
        element: <LazyRoute Component={BlogPage} />,
      },
      {
        path: "*",
        element: <LazyRoute Component={NotFoundPage} />,
      },
    ],
  },
]);

export function AppRouter() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}