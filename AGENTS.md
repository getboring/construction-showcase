# AGENTS.md - TITAN Build Co. Construction Showcase

## Project

Production-grade construction UI component library. 14 routed pages + 404, 77 component files, 130+ exports, fully accessible.

## Stack

- React 19 + TypeScript 6 strict (tsconfig.app.json has `strict: true`)
- Vite 8 + Tailwind CSS v4 (`@theme` tokens in `src/styles/tokens.css`)
- Base UI v1.5.0 (`@base-ui/react`) for all interactive primitives
  - Dialog, AlertDialog, Accordion, Collapsible, Tabs, Select, Checkbox, Switch, Tooltip, Popover, Meter, Progress, Drawer, NavigationMenu, ScrollArea, Slider, Field, Radio/RadioGroup, NumberField, Avatar, Autocomplete, ContextMenu, Menu (DropdownMenu), Toolbar, Toast, PreviewCard
- GSAP 3.15 for animations (7 hooks in `src/hooks/useGsap.ts`, all check `prefers-reduced-motion`)
- TanStack Form v1.33 + zod v4 (import from `"zod/v4"`, use `z.email()` not `z.string().email()`)
- drizzle-zod for schema -> zod -> types pipeline
- React Router v7 with `createBrowserRouter`, lazy routes, `ScrollRestoration`, `Link` components
- Vitest + @testing-library/react for unit tests, Playwright for E2E + visual regression

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # tsc -b && vite build
npm run typecheck    # tsc -b --noEmit
npm run lint         # eslint .
npm run test         # vitest run
npm run test:watch   # vitest
npm run test:coverage # vitest run --coverage
npx playwright test  # E2E + visual tests (auto-starts dev server)
npx playwright test --update-snapshots  # regenerate visual baselines
```

## Key Conventions

- `cn()` from `src/lib/cn.ts` uses clsx + tailwind-merge (deduplicates conflicting Tailwind classes)
- Form error extraction via `getFieldError()` from `src/lib/getFieldError.ts` (never inline `typeof` checks)
- Per-route SEO via `useRouteMeta()` hook (sets `document.title`, OG/Twitter meta, canonical URL, `og:url`)
- JSON-LD structured data via `src/lib/jsonLd.tsx` (Organization, LocalBusiness, Project, FAQ)
- Web Vitals monitoring via `src/lib/webVitals.ts` (LCP, CLS, FCP, TTFB with rating thresholds)
- All internal links use `<Link>` from react-router-dom (no `<a>` for internal routes)
- Desktop nav uses Base UI NavigationMenu mega-menu (Services/Projects dropdowns with `Link` items)
- Mobile nav uses Base UI Drawer for accessibility
- Detail pages use `useLoaderData()` from React Router (loaders handle 404 via `throw new Response`)
- Project grid filter uses Base UI ToggleGroup (`FilterGroup`)
- HorizontalScroll uses Base UI ScrollArea as reduced-motion fallback
- Money as integer cents, never floating point
- No `any` in TypeScript
- Testimonial/photo nullable fields use `null`, not `undefined`
- All `<label>` elements use `htmlFor` associated with input `id`
- Cloudflare Pages deployment: `_redirects`, `_headers` (CSP), `_routes.json`

## Base UI v1.5.0 Conventions

- Transitions: `data-[starting-style]` / `data-[ending-style]` (not `data-open`/`data-close`)
- Dialog: `AlertDialog.Close` (not `Cancel`), `Dialog.Title` + `Dialog.Description` for ARIA
- Radio: `Radio.Root` + `Radio.Indicator` + `RadioGroup`
- Drawer: `Drawer.Content` (not `Drawer.Panel`), `Drawer.Backdrop`, `Drawer.Title`, `Drawer.Description`
- Select: `Select.Root` + `Select.Trigger` + `Select.Portal` + `Select.Positioner` + `Select.Popup` + `Select.Item`
- NavigationMenu: `NavigationMenu.Root` + `.List` + `.Item` + `.Trigger` + `.Content` (uses FloatingPortal)
- Menu (Dropdown): `Menu.Root` + `.Trigger` + `.Portal` + `.Positioner` + `.Popup` + `.Item` + `.CheckboxItem` + `.RadioGroup`
- NumberField: `NumberField.Root` + `.Group` + `.Input` + `.Increment` + `.Decrement`
- Avatar: `Avatar.Root` + `.Image` + `.Fallback` (prop is `delay`, not `delayMs`)
- Autocomplete: `Autocomplete.Root` + `.Trigger` + `.Input` + `.Portal` + `.Backdrop` + `.Positioner` + `.Popup` + `.List` + `.Item` + `.Empty`
- Toast: Use `Toast.createToastManager()` (not `new Toast.Manager()`), pass to `Toast.Provider`
- ContextMenu: `ContextMenu.Root` + `.Trigger` + `.Portal` + `.Positioner` + `.Popup` + `.Item` + `.Separator`
- Toolbar: `Toolbar.Root` + `.Button` + `.Link` + `.Separator` + `.Group`
- Focus: Use `focus-visible:` (not `focus:`) for keyboard-only focus rings
- Group data attrs: Use `group-data-[attr]:` when targeting child elements of a parent with data attributes

## File Map

- `src/styles/tokens.css` - Tailwind v4 @theme design tokens (steel, amber, burgundy, warm, concrete, rust, safety, hazard)
- `src/styles/globals.css` - Base UI CSS transitions, reduced-motion, section utilities, focus-visible ring, blueprint texture
- `src/lib/cn.ts` - clsx + tailwind-merge
- `src/lib/data.ts` - Seed data, navItems, siteConfig, formatCents, formatSqft
- `src/lib/getFieldError.ts` - Form error extraction
- `src/lib/motion.ts` - GSAP easing presets
- `src/lib/useRouteMeta.ts` - Per-route title/OG/Twitter/canonical meta management
- `src/lib/jsonLd.tsx` - JSON-LD `<JsonLd>` component (pure component, no data)
- `src/lib/jsonLd-data.ts` - JSON-LD structured data schemas (Organization, LocalBusiness, Project, FAQ)
- `src/lib/webVitals.ts` - Core Web Vitals observers (LCP, CLS, FCP, TTFB) with rating thresholds
- `src/db/schema/index.ts` - 6 Drizzle tables + drizzle-zod schemas + inferred types
- `src/hooks/useGsap.ts` - 7 GSAP hooks (all stabilized, reduced-motion safe)
- `src/App.tsx` - createBrowserRouter with lazy routes + per-route loaders + ErrorBoundary
- `src/routes/Layout.tsx` - Skip-to-content + Header + TrustBar + main + Footer + JSON-LD
- `src/routes/NotFoundPage.tsx` - 404 with proper meta
- `src/components/ui/primitives/` - 33 exports across 29 files
- `src/components/ui/forms/` - 13 exports across 13 files
- `src/components/ui/layout/` - 8 exports across 8 files (Header, Footer, Section with variant prop, Container, SectionHeader, SectionDivider, PageHero, Breadcrumbs)
- `src/components/ui/content/` - 16 exports across 16 files
- `src/components/ui/motion/` - 7 exports across 7 files
- `src/components/ui/patterns/` - 8 exports across 8 files

## Component Inventory

### Primitives (33 exports)
Button, Badge, Card, Separator, Heading, Text, Tag, IconLink, Link, Skeleton, Avatar, AvatarNative, IconButton, Wordmark, Dialog (Root/Trigger/Content/Title/Description/Close), AlertDialog, Accordion (Item/Group), CollapsibleSection, Tabs (Group/List/Trigger/Panel), Toast + useToast, ToastProvider + useToastManager, Tooltip, Popover, Meter, ProgressBar, NavMenu + SimpleNav, Drawer (Root/Content/Title/Description), ScrollAreaRoot, BudgetSlider, FilterGroup, DropdownMenu + DropdownCheckboxMenu + DropdownRadioMenu, ContextMenu, Toolbar (Root/Button/Link/Separator/Group)

### Forms (13 exports)
Field, Input, Textarea, Select, Checkbox, CheckboxGroup, Switch, RadioGroup, NumberField, NumberFieldNative, FileUpload, Combobox, Fieldset + FormField + Form

### Content (16 exports)
ProjectCard, PreviewCard, PreviewCardHover, ServiceCard + ServiceGrid, EquipmentCard, TestimonialCard, StatBlock + StatGrid, CertBadge, ProcessStep, FeatureBlock, CalloutBanner, ImageLightbox, DataTable + SortIndicator + DataTablePagination, StatusBoard, Checklist, CostEstimator

### Motion (7 exports)
NumberCounters, BeforeAfter, HorizontalScroll, ClipPathReveal, ParallaxEquipment, ScrollTimeline, TextScramble

### Patterns (8 exports)
CTASection, FeaturedProject, Hero, TrustBar, ProjectGrid, ContactForm, QuoteRequestForm, CommandMenu

### Layout (8 exports)
Header, Footer, Section, Container, SectionHeader, SectionDivider + GrainOverlay, PageHero, Breadcrumbs

## Testing

### Vitest (130 tests, 18 files)
- `src/lib/cn.test.ts` - cn() utility
- `src/lib/data.test.ts` - formatCents, formatSqft, siteConfig, navItems, services, featuredProjects, testimonials
- `src/lib/getFieldError.test.ts` - field error extraction
- `src/lib/jsonLd.test.ts` - organization, localBusiness, project, FAQ schema validation
- `src/lib/jsonLd-component.test.tsx` - JsonLd component render + serialization
- `src/lib/useRouteMeta.test.ts` - document.title, meta tags, canonical URLs
- `src/lib/webVitals.test.ts` - getRating thresholds for LCP/CLS/FCP/TTFB
- `src/components/ui/primitives/*.test.tsx` - Badge, Heading, Text, Separator, Tag, Skeleton, Avatar, Card, Button
- `src/components/ui/content/PreviewCard.test.tsx` - render, a11y, link navigation
- `src/components/ui/forms/Input.test.tsx` - Input, Textarea, NumberField with label association

### Playwright (163 tests, 7 spec files, 2 projects)
- `e2e/navigation.spec.ts` - Desktop nav, dropdowns (hover), SPA routing, 404 handling
- `e2e/mobile.spec.ts` - Mobile menu, nav links, page renders, quote form, responsive images, touch targets
- `e2e/forms.spec.ts` - Quote form 3-step wizard, select dropdowns, contact form, command menu (Cmd+K)
- `e2e/seo.spec.ts` - Meta tags, canonical URLs, JSON-LD structured data, semantic HTML
- `e2e/accessibility.spec.ts` - Skip link, headings, alt text, ARIA, keyboard nav, focus management
- `e2e/visual-pages.spec.ts` - Full-page screenshot comparison for all pages (desktop + mobile)
- `e2e/app.spec.ts` - Legacy tests (navigation, SPA, a11y, SEO, mobile)

**Projects**: `desktop-chrome` (1280x720), `mobile-iphone` (iPhone 14)
**Visual baselines**: `e2e/visual-pages.spec.ts-snapshots/`

## Known Gotchas

- `useForm<any>` workaround needed (TanStack Form v1.33 has 12-arg type signature, use `as` cast on defaultValues)
- zod v4 must import from `"zod/v4"` for `.email()` and standard schema support
- GSAP ScrollTrigger must be registered: `gsap.registerPlugin(ScrollTrigger)`
- Base UI NavigationMenu uses FloatingPortal - dropdown links render outside main DOM tree
- Base UI Select options use `role="option"` with `:visible` pseudo-class for interaction
- Base UI Toast: use `Toast.createToastManager()` not `new Toast.Manager()`
- Base UI Avatar: `delay` prop (not `delayMs`)
- Base UI Menu: `keepMounted` prop (not `keepIconMounted`) on CheckboxItemIndicator/RadioItemIndicator
- Header desktop nav uses `NavMenu` (Base UI NavigationMenu mega-menu), with `SimpleNav` as md-only fallback
- Header uses Base UI Drawer for mobile nav, `useRef` + `isFirstRender` pattern for route-change close
- ServiceDetailPage and ProjectDetailPage use `useLoaderData()` (loaders handle 404 via `throw new Response`)
- Cloudflare Pages SPA: `_redirects` routes all paths to index.html, `_headers` adds CSP + security headers
- `createBrowserRouter` with lazy routes in `App.tsx`, `ScrollRestoration` in Layout.tsx
- `useRouteMeta()` dynamically creates `<link rel="canonical">` and sets `og:url`
- Dropdown tests use `hover()` not `click()` to trigger Base UI NavigationMenu content
- Form Select tests need `[role="option"]:visible` to avoid stale hidden options
- Quote form step 2 requires 20+ character scope before advancing

## Accessibility

- WCAG 2.1 AA target
- Skip-to-content link, ARIA labels, focus management, keyboard navigation
- `prefers-reduced-motion: reduce` at CSS level (globals.css) and JS level (all 7 GSAP hooks)
- Semantic HTML: `<dl>/<dt>/<dd>` for stats, `<address>` in footer, `role="button"` on file upload area
- All labels associated with inputs via `htmlFor`/`id` (Input, Textarea, NumberField, Checkbox, Switch, RadioGroup)
- Mobile nav uses Base UI Drawer with proper ARIA attributes
- RadioGroup uses `role="radiogroup"` + `aria-labelledby`
- Custom checkboxes in Checklist use `role="checkbox"` + `aria-checked` + `aria-label`
- `eslint-plugin-jsx-a11y` enforced via ESLint config
- Playwright E2E tests verify skip link, heading hierarchy, image alt text, ARIA attributes, keyboard navigation

## Brand Design System

Heritage color palette merged from JA Street & Associates original brand into modern dark TITAN aesthetic.

- **Amber** (`#f59e0b`): Primary CTAs, interactive highlights, section-label markers
- **Burgundy** (`#7a1e1f`): Heritage trust accent for section labels, trust bar, footer bg, secondary accents
- **Warm** (`#faf9f7`): Alternating light sections for readability (services, testimonials, heritage)
- **Blueprint**: Subtle technical drawing grid texture in Hero background (`globals.css: .bg-blueprint`)
- **Section variants**: `<Section variant="dark">` (default), `<Section variant="warm">`, `<Section variant="burgundy">`
- **TestimonialCard variants**: `variant="dark"` (dark bg) or `variant="warm"` (white bg with burgundy borders)
- Footer uses `bg-burgundy-950` with warm-toned text instead of cold steel
