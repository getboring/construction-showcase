# TITAN Build Co. - Construction Showcase

Production-grade construction UI component library built with React 19, Base UI v1.5.0, Tailwind v4, and GSAP.

14 routed pages + 404. 77 component files. 130+ exports. 130 Vitest tests. 163 Playwright tests (E2E + visual regression). Fully accessible (WCAG 2.1 AA).

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 6 (strict, `strict: true`) |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 with `@theme` design tokens |
| Primitives | Base UI v1.5.0 (`@base-ui/react`) |
| Animation | GSAP 3.15 (scroll-linked, entrance, reduced-motion safe) |
| Forms | TanStack Form v1.33 + zod v4 |
| Schema | drizzle-zod (schema -> zod -> types pipeline) |
| Routing | React Router v7 (lazy routes, per-route loaders, ScrollRestoration in Layout) |
| Unit Tests | Vitest + @testing-library/react |
| E2E Tests | Playwright (desktop-chrome + mobile-iphone projects) |

## Scripts

```bash
npm run dev            # Start dev server (Vite)
npm run build          # Type-check + production build
npm run preview        # Preview production build
npm run typecheck      # TypeScript check (no emit)
npm run lint           # ESLint
npm run test           # Run Vitest tests (130 tests)
npm run test:watch     # Vitest watch mode
npm run test:coverage  # Vitest with coverage
npx playwright test    # Run Playwright tests (163 tests, auto-starts dev server)
npx playwright test --update-snapshots  # Regenerate visual baselines
```

## Architecture

```
src/
├── components/ui/
│   ├── primitives/   # 33 exports (Button, Dialog, Accordion, NavMenu, Drawer, DropdownMenu, etc.)
│   ├── forms/        # 13 exports (Field, Input, Select, Combobox, NumberFieldNative, etc.)
│   ├── layout/       # 8 exports (Header, Footer, Section, Breadcrumbs, etc.)
│   ├── content/      # 16 exports (ProjectCard, DataTable, Checklist, CostEstimator, etc.)
│   ├── motion/       # 7 exports (BeforeAfter, NumberCounters, ClipPathReveal, etc.)
│   └── patterns/     # 8 exports (Hero, ContactForm, QuoteRequestForm, CommandMenu, etc.)
├── hooks/
│   └── useGsap.ts    # 7 stabilized GSAP hooks (prefers-reduced-motion safe)
├── routes/           # 14 pages + 404 (all lazy-loaded with per-route loaders)
├── lib/
│   ├── cn.ts             # clsx + tailwind-merge
│   ├── data.ts           # Seed data, navItems, formatCents, formatSqft
│   ├── motion.ts         # GSAP easing presets
│   ├── getFieldError.ts  # Form error extraction
│   ├── useRouteMeta.ts   # Per-route title/OG/Twitter/canonical meta management
│   ├── jsonLd.tsx        # JSON-LD <JsonLd> component (renders script tag)
│   ├── jsonLd-data.ts    # JSON-LD structured data schemas (Organization, LocalBusiness, etc.)
│   └── webVitals.ts      # Core Web Vitals observers (LCP, CLS, FCP, TTFB)
├── db/schema/            # 6 Drizzle tables + drizzle-zod schemas + types
└── styles/
    ├── tokens.css    # @theme design tokens (steel, amber, concrete, rust, safety, hazard)
    └── globals.css   # Base UI transitions, reduced-motion, focus-visible, section utilities
```

## Component Library

### Primitives (33 exports)
Base UI headless primitives + custom composites. All interactive components use Base UI v1.5.0 with `data-[starting-style]`/`data-[ending-style]` transitions.

| Component | Base UI | Notes |
|-----------|---------|-------|
| Button | - | Polymorphic (`as` prop), variants: primary/outline/ghost/danger |
| Dialog | `Dialog` | Root/Trigger/Content/Title/Description/Close |
| AlertDialog | `AlertDialog` | Confirmation dialogs |
| Accordion | `Accordion` | Item/Group with `group-data-[panel-open]:rotate-180` |
| Tabs | `Tabs` | Group/List/Trigger/Panel |
| Drawer | `Drawer` | Mobile nav (Root/Content/Title/Description) |
| NavigationMenu | `NavigationMenu` | Desktop mega-menu (Services/Projects dropdowns) |
| DropdownMenu | `Menu` | Standard/dropdown checkbox/dropdown radio variants |
| ContextMenu | `ContextMenu` | Right-click context menus |
| Select | `Select` | Custom Combobox wrapper |
| NumberField | `NumberField` | Native Base UI with increment/decrement |
| Avatar | `Avatar` | Root/Image/Fallback with `delay` prop |
| Toast | - | Custom provider + `Toast.createToastManager()` |
| Toolbar | `Toolbar` | Root/Button/Link/Separator/Group |
| Tooltip | `Tooltip` | Hover tooltips |
| Popover | `Popover` | Click popovers |
| Meter | `Meter` | Value meters with labeled tracks |
| Progress | `Progress` | Progress bars with labels |
| ScrollArea | `ScrollArea` | Custom scrollbar |
| Slider | `Slider` | Budget range selection |
| ToggleGroup | - | Filter pills with `aria-pressed` |

### Forms (13 exports)
All labels use `htmlFor`/`id` association. Error display via `getFieldError()`.

| Component | Base UI | Notes |
|-----------|---------|-------|
| Input | - | Native `<input>` with `id = id \|\| name` |
| Textarea | - | Native `<textarea>` with same pattern |
| Select | `Select` | Dropdown select with groups |
| Combobox | `Select` | Grouped select with search styling |
| Checkbox | `Checkbox` | Root/Indicator |
| CheckboxGroup | `Checkbox` | Fieldset + legend + multiple checkboxes |
| Switch | `Switch` | Toggle switches |
| RadioGroup | `Radio` | Root/Indicator + RadioGroup |
| NumberField | - | Native `<input type="number">` |
| NumberFieldNative | `NumberField` | Base UI with increment/decrement buttons |
| FileUpload | - | Drag-and-drop file upload area |
| Field | `Field` | Label/Description/Error wrapper |
| Fieldset | `Fieldset` | Legend + grouped fields |

### Content (16 exports)
Data display and card components.

| Component | Notes |
|-----------|-------|
| ProjectCard | Project grid cards with image, stats, link |
| PreviewCard / PreviewCardHover | Base UI PreviewCard for hover previews |
| ServiceCard / ServiceGrid | Service listing cards |
| EquipmentCard | Fleet equipment display |
| TestimonialCard | Client testimonials |
| StatBlock / StatGrid | `<dl>/<dt>/<dd>` stat displays |
| CertBadge | Certification badges |
| ProcessStep | 6-phase process timeline |
| FeatureBlock | Feature comparison blocks |
| CalloutBanner | CTA callout banners |
| ImageLightbox | Dialog-based image lightbox |
| DataTable + SortIndicator + Pagination | Sortable, paginated data tables |
| StatusBoard | Project status board |
| Checklist | Interactive checklist with progress |
| CostEstimator | Cost estimation table |

### Motion (7 exports)
GSAP-powered animations with `prefers-reduced-motion` support.

| Component | Animation |
|-----------|-----------|
| NumberCounters | Animated number counters |
| BeforeAfter | Image comparison slider |
| HorizontalScroll | Horizontal scroll container |
| ClipPathReveal | Clip-path entrance animation |
| ParallaxEquipment | Parallax equipment showcase |
| ScrollTimeline | Scroll-linked timeline |
| TextScramble | Text scramble/decode effect |

### Patterns (8 exports)
Page-level composed patterns.

| Component | Description |
|-----------|-------------|
| Hero | Homepage hero with animated background |
| TrustBar | Trust indicators bar |
| ProjectGrid | Filterable project grid |
| FeaturedProject | Featured project spotlight |
| CTASection | Call-to-action section |
| ContactForm | Contact form with validation |
| QuoteRequestForm | 3-step quote wizard |
| CommandMenu | Cmd+K search (Base UI Autocomplete) |

## Testing

### Vitest (130 tests)
Unit and component tests across 18 files. jsdom environment for component tests, node for pure unit tests.

- Library tests: cn, data, getFieldError, jsonLd, useRouteMeta, webVitals
- Component tests: Badge, Heading, Text, Separator, Tag, Skeleton, Avatar, Card, Button, PreviewCard, Input

### Playwright (163 tests)
E2E and visual regression tests across 7 spec files. Two projects: `desktop-chrome` (1280x720) and `mobile-iphone` (iPhone 14).

| Spec File | Tests | Coverage |
|-----------|-------|----------|
| `navigation.spec.ts` | 24 | Desktop nav, dropdowns (hover), SPA routing, 404 |
| `mobile.spec.ts` | 15 | Mobile menu, drawer, page renders, form, images, touch targets |
| `forms.spec.ts` | 12 | Quote wizard (3 steps), contact form, Cmd+K search |
| `seo.spec.ts` | 9 | Meta tags, canonical URLs, JSON-LD, semantic HTML |
| `accessibility.spec.ts` | 13 | Skip link, headings, alt text, ARIA, keyboard, focus |
| `visual-pages.spec.ts` | 100 | Full-page screenshots (11 main + 11 detail + 404 + header/footer) |
| `app.spec.ts` | 1 | Legacy tests |

## Accessibility

- WCAG 2.1 AA target
- Skip-to-content link on every page
- All interactive components use Base UI primitives with ARIA attributes
- `prefers-reduced-motion: reduce` handled at CSS and JS levels
- Semantic HTML: `<dl>/<dt>/<dd>`, `<address>`, `role="radiogroup"`, `aria-current`, `aria-label`
- All labels associated with inputs via `htmlFor`/`id`
- Custom checkboxes use `role="checkbox"` + `aria-checked` + `aria-label`
- Mobile nav uses Base UI Drawer with focus trap
- `eslint-plugin-jsx-a11y` enforced via ESLint config

## SEO

- Per-route meta via `useRouteMeta()` hook (title, description, OG/Twitter, canonical URL, `og:url`)
- JSON-LD structured data on every page (Organization, LocalBusiness, Project, FAQ)
- `robots.txt` and `sitemap.xml` in public/
- Font preload with `rel="preload"` in `index.html`

## Deployment

- Cloudflare Pages with `_redirects` (SPA routing), `_headers` (CSP + security), `_routes.json` (CDN caching)
- Build output: ~552KB JS (177KB gzip), 58KB CSS (10KB gzip)

## Brand

| Token | Value |
|-------|-------|
| Backgrounds | zinc-950 / steel-950 |
| Primary accent | amber-500 (CTAs, highlights) |
| Heritage accent | burgundy-600 `#7a1e1f` (trust indicators, section labels, footer, warm sections) |
| Warm sections | warm-50 `#faf9f7` (alternating content sections for readability) |
| Blueprint texture | Subtle grid overlay on hero (technical drawing feel) |
| Display font | Bebas Neue |
| Body font | Inter |
| Mono font | JetBrains Mono |
| Design tokens | `src/styles/tokens.css` (steel, amber, burgundy, warm, concrete, rust, safety, hazard) |
