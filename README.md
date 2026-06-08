# TITAN Build Co. - Construction Showcase

Production-grade construction UI component library built with React 19, Base UI, Tailwind v4, and GSAP.

## Stack

- **React 19** + TypeScript 6 (strict)
- **Vite 8** for bundling and dev server
- **Tailwind CSS v4** with `@theme` design tokens
- **Base UI v1.5.0** (`@base-ui/react`) headless primitives
- **GSAP 3.15** for scroll-linked and entrance animations
- **TanStack Form v1.33** with zod v4 validation
- **drizzle-zod** for schema-driven type pipeline
- **React Router v7** with lazy-loaded routes
- **Vitest** for unit testing

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Type-check + build
npm run preview      # Preview production build
npm run typecheck    # TypeScript check (no emit)
npm run lint         # ESLint
npm run test         # Run tests
npm run test:watch   # Watch mode
```

## Architecture

```
src/
├── components/ui/
│   ├── primitives/   # 19 base components (Button, Dialog, Accordion, etc.)
│   ├── forms/        # 9 form components (Field, Input, Select, etc.)
│   ├── layout/       # Header, Footer, Section, Breadcrumbs
│   ├── content/      # ProjectCard, ServiceCard, TestimonialCard, etc.
│   ├── motion/       # 7 GSAP components (BeforeAfter, NumberCounters, etc.)
│   └── patterns/     # Hero, ContactForm, QuoteRequestForm, CommandMenu
├── hooks/
│   └── useGsap.ts    # 7 stabilized GSAP hooks (prefers-reduced-motion safe)
├── routes/           # 13 pages + 404 (all lazy-loaded)
├── lib/
│   ├── cn.ts         # clsx + tailwind-merge
│   ├── data.ts       # Seed data + shared testimonials
│   ├── motion.ts     # GSAP easing presets
│   └── getFieldError.ts  # Form error extraction
├── db/schema/        # Drizzle tables + drizzle-zod schemas
└── styles/
    ├── tokens.css    # @theme design tokens (steel, amber, concrete, rust)
    └── globals.css   # Base UI transitions, reduced-motion, utilities
```

## Accessibility

- WCAG 2.1 AA compliant
- All interactive components use Base UI primitives with ARIA attributes
- Skip-to-content link, focus management in mobile drawer
- `prefers-reduced-motion: reduce` handled at both CSS and JS levels
- Semantic HTML throughout (`<dl>`, `<address>`, `role="separator"`, `aria-current`, etc.)

## Brand

- Backgrounds: zinc-950 / steel-950
- Accents: amber-500
- Display font: Bebas Neue
- Body font: Inter
- Mono font: JetBrains Mono