# AGENTS.md - TITAN Build Co. Construction Showcase

## Project

Production-grade construction UI component library. 13 routed pages + 404, 100+ composable components, fully accessible.

## Stack

- React 19 + TypeScript 6 strict
- Vite 8 + Tailwind CSS v4 (`@theme` tokens in `src/styles/tokens.css`)
- Base UI v1.5.0 (`@base-ui/react`) for all interactive primitives
  - Dialog, AlertDialog, Accordion, Collapsible, Tabs, Select, Checkbox, Switch, Tooltip, Popover, Meter, Progress, Drawer, NavigationMenu, ScrollArea, Slider, Field, Radio/RadioGroup
- GSAP 3.15 for animations (7 hooks in `src/hooks/useGsap.ts`, all check `prefers-reduced-motion`)
- TanStack Form v1.33 + zod v4 (import from `"zod/v4"`, use `z.email()` not `z.string().email()`)
- drizzle-zod for schema -> zod -> types pipeline
- React Router v7 with `createBrowserRouter`, lazy routes, `ScrollRestoration`, `Link` components
- Vitest for testing

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # tsc -b && vite build
npm run typecheck    # tsc -b --noEmit
npm run lint         # eslint .
npm run test         # vitest run
npm run test:watch   # vitest
```

## Key Conventions

- `cn()` from `src/lib/cn.ts` uses clsx + tailwind-merge (deduplicates conflicting Tailwind classes)
- Form error extraction via `getFieldError()` from `src/lib/getFieldError.ts` (never inline `typeof` checks)
- Per-route SEO via `useRouteMeta()` hook (sets `document.title` + OG/Twitter meta)
- JSON-LD structured data via `src/lib/jsonLd.tsx` (organization, localBusiness, project, FAQ)
- All internal links use `<Link>` from react-router-dom (no `<a>` for internal routes)
- Mobile nav uses Base UI Drawer for accessibility
- Project grid filter uses Base UI ToggleGroup (`FilterGroup`)
- HorizontalScroll uses Base UI ScrollArea as reduced-motion fallback
- Money as integer cents, never floating point
- No `any` in TypeScript
- Testimonial/photo nullable fields use `null`, not `undefined`
- Base UI v1.5.0: `data-starting-style`/`data-ending-style` (not `data-open`/`data-close`), `AlertDialog.Close` (not `Cancel`), `Radio.Root`/`Radio.Indicator` + `RadioGroup`, `Drawer.Content` (not `Drawer.Panel`)
- GSAP: always `gsap.context()` with `ctx.revert()` cleanup, `useMemo` on all options objects
- All `<label>` elements use `htmlFor` associated with input `id`
- Cloudflare Pages deployment: `_redirects`, `_headers` (CSP), `_routes.json`

## File Map

- `src/styles/tokens.css` - Tailwind v4 @theme design tokens
- `src/styles/globals.css` - Base UI CSS transitions, reduced-motion, section utilities
- `src/lib/cn.ts` - clsx + tailwind-merge
- `src/lib/data.ts` - Seed data, testimonials, formatCents, formatSqft
- `src/lib/getFieldError.ts` - Form error extraction
- `src/lib/motion.ts` - GSAP easing presets
- `src/lib/useRouteMeta.ts` - Per-route title/OG/Twitter meta management
- `src/lib/jsonLd.tsx` - JSON-LD structured data (Organization, LocalBusiness, Project, FAQ)
- `src/db/schema/index.ts` - 6 Drizzle tables + drizzle-zod schemas + inferred types
- `src/hooks/useGsap.ts` - 7 GSAP hooks (all stabilized, reduced-motion safe)
- `src/App.tsx` - createBrowserRouter with lazy routes + per-route loaders + ErrorBoundary
- `src/routes/Layout.tsx` - Skip-to-content + Header + TrustBar + main + Footer + JSON-LD
- `src/routes/NotFoundPage.tsx` - 404 with proper meta
- `src/components/ui/primitives/` - 22+ base components (incl. Drawer, NavMenu, ScrollArea, Slider, FilterGroup)
- `src/components/ui/forms/` - 9 form components (all labels use htmlFor)
- `src/components/ui/layout/` - Header (Drawer + SimpleNav), Footer, Section, Breadcrumbs
- `src/components/ui/content/` - 10 content components
- `src/components/ui/motion/` - 7 GSAP motion components
- `src/components/ui/patterns/` - 8 pattern components

## Known Gotchas

- `useForm<any>` workaround needed (TanStack Form v1.33 has 12-arg type signature, use `as` cast on defaultValues)
- zod v4 must import from `"zod/v4"` for `.email()` and standard schema support
- GSAP ScrollTrigger must be registered: `gsap.registerPlugin(ScrollTrigger)`
- Base UI Drawer uses `Drawer.Content` (not `Drawer.Panel`), `Drawer.Backdrop`, `Drawer.Title`, `Drawer.Description`
- Base UI `Slider` is for budget range selection in QuoteRequestForm
- Base UI `Toast` (native) used instead of `Snackbar` (not exported in v1.5.0)
- HorizontalScroll uses GSAP ScrollTrigger for animation, with Base UI ScrollArea as reduced-motion fallback
- Header uses Base UI Drawer for mobile nav, `useRef` + `isFirstRender` pattern for route-change close
- All `<label>` elements must have `htmlFor` matching the input `id`
- Cloudflare Pages SPA: `_redirects` routes all paths to index.html, `_headers` adds CSP + security headers
- `createBrowserRouter` with lazy routes in `App.tsx`, `ScrollRestoration` in route wrapper

## Accessibility

- WCAG 2.1 AA target
- Skip-to-content link, ARIA labels, focus management, keyboard navigation
- `prefers-reduced-motion: reduce` at CSS level (globals.css) and JS level (all 7 GSAP hooks)
- Semantic HTML: `<dl>/<dt>/<dd>` for stats, `<address>` in footer, `role="button"` on file upload area
- All labels associated with inputs via `htmlFor`/`id`
- Mobile nav uses Base UI Drawer with proper ARIA attributes
- `eslint-plugin-jsx-a11y` enforced via ESLint config