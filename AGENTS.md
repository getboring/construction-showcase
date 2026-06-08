# AGENTS.md - TITAN Build Co. Construction Showcase

## Project

Production-grade construction UI component library. 13 routed pages, 100+ composable components, fully accessible.

## Stack

- React 19 + TypeScript 6 strict
- Vite 8 + Tailwind CSS v4 (`@theme` tokens in `src/styles/tokens.css`)
- Base UI v1.5.0 (`@base-ui/react`) for all interactive primitives
- GSAP 3.15 for animations (7 hooks in `src/hooks/useGsap.ts`, all check `prefers-reduced-motion`)
- TanStack Form v1.33 + zod v4 (import from `"zod/v4"`, use `z.email()` not `z.string().email()`)
- drizzle-zod for schema -> zod -> types pipeline
- React Router v7 with lazy routes
- Vitest for testing

## Key Conventions

- `cn()` from `src/lib/cn.ts` uses clsx + tailwind-merge (deduplicates conflicting Tailwind classes)
- Form error extraction via `getFieldError()` from `src/lib/getFieldError.ts` (never inline `typeof` checks)
- `packages/core` pattern: never throw, return `{ success: true, data } | { success: false, error: { code, message } }`
- Money as integer cents, never floating point
- No `any` in TypeScript
- Testimonial/photo nullable fields use `null`, not `undefined`
- Base UI v1.5.0: `data-starting-style`/`data-ending-style` (not `data-open`/`data-close`), `AlertDialog.Close` (not `Cancel`), `Radio.Root`/`Radio.Indicator` + `RadioGroup`
- GSAP: always `gsap.context()` with `ctx.revert()` cleanup, `useMemo` on all options objects

## Commands

```bash
npm run dev          # Vite dev server
npm run build        # tsc -b && vite build
npm run typecheck    # tsc -b --noEmit
npm run lint         # eslint .
npm run test         # vitest run
npm run test:watch   # vitest
```

## File Map

- `src/styles/tokens.css` - Tailwind v4 @theme design tokens
- `src/styles/globals.css` - Base UI CSS transitions, reduced-motion, section utilities
- `src/lib/cn.ts` - clsx + tailwind-merge
- `src/lib/data.ts` - Seed data, testimonials, formatCents, formatSqft
- `src/lib/getFieldError.ts` - Form error extraction
- `src/lib/motion.ts` - GSAP easing presets
- `src/db/schema/index.ts` - 6 Drizzle tables + drizzle-zod schemas + inferred types
- `src/hooks/useGsap.ts` - 7 GSAP hooks (all stabilized, reduced-motion safe)
- `src/App.tsx` - React.lazy routes + ErrorBoundary + BrowserRouter
- `src/routes/Layout.tsx` - Skip-to-content + Header + TrustBar + main + Outlet + Footer
- `src/components/ui/primitives/` - 19 base components
- `src/components/ui/forms/` - 9 form components
- `src/components/ui/layout/` - Header, Footer, Section, Breadcrumbs
- `src/components/ui/content/` - 10 content components
- `src/components/ui/motion/` - 7 GSAP motion components
- `src/components/ui/patterns/` - 8 pattern components

## Known Gotchas

- `useForm<any>` workaround needed (TanStack Form v1.33 has 12-arg type signature, use `as` cast on defaultValues)
- zod v4 must import from `"zod/v4"` for `.email()` and standard schema support
- `@tanstack/zod-form-adapter` is NOT used (TanStack Form v1.33+ supports standard schema natively)
- GSAP ScrollTrigger must be registered: `gsap.registerPlugin(ScrollTrigger)`
- Base UI `Meter`/`Progress` use wrapper `<div>` for label/value (render-prop children pattern)
- `toastId` counter hoisted to module scope to avoid stale closures
- Form JSX: `getFieldError(err)` must use `{}` curly braces in JSX, not bare text

## Accessibility

- WCAG 2.1 AA target
- Skip-to-content link, ARIA labels, focus management, keyboard navigation
- `prefers-reduced-motion: reduce` at CSS level (globals.css) and JS level (all 7 GSAP hooks)
- Semantic HTML: `<dl>/<dt>/<dd>` for stats, `<address>` in footer, `role="separator"`, `aria-current="page"`, `aria-pressed`, `aria-expanded`