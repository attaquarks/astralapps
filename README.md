# AstralApps

The portfolio site for **AstralApps** — a software studio building AI products, web
platforms, SaaS dashboards, and automation systems.

Premium, animated, single-page marketing site with a brand-aligned 3D hero, scroll
animations, light/dark theming, a working contact form, and fully responsive navigation.

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (design tokens in [`src/index.css`](src/index.css))
- **Spline** (`@splinetool/react-spline`) — the 3D robot guide
- **GSAP** + **ScrollTrigger** + **@gsap/react** (scroll/reveal animations)

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run lint     # eslint
npm run preview  # preview the production build
```

## Making it "real" — where to edit

All editable content lives in [`src/data/`](src/data/) and is marked with `TODO`
comments. You generally won't need to touch component code to update copy.

| What | File |
| --- | --- |
| Name, tagline, email, nav, **social links**, stats, marquee | [`src/data/site.ts`](src/data/site.ts) |
| Featured work / case studies | [`src/data/projects.ts`](src/data/projects.ts) |
| Services list | [`src/data/services.ts`](src/data/services.ts) |

Things to replace before launch:

- Real **email** and **social profile URLs** (currently `#`) in `site.ts`
- Real **projects** in `projects.ts` (set `link` to make a card clickable)
- The hero **availability** badge text in [`HeroSection.tsx`](src/components/sections/HeroSection.tsx)

## Contact form

The form in the Contact section POSTs to a [Formspree](https://formspree.io) endpoint.

1. Create a form on Formspree and copy its endpoint.
2. `cp .env.example .env` and set `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxx`.

Without an endpoint the form runs in **demo mode** (validates and shows the success state,
but doesn't send). Swap in any other provider by editing
[`ContactForm.tsx`](src/components/sections/ContactForm.tsx).

## Theming

Colors are CSS variables in [`src/index.css`](src/index.css) (brand violet `#863bff` →
blue `#47bfff`, derived from the logo). Light/dark is resolved before first paint by a
small script in [`index.html`](index.html), persisted to `localStorage`, and defaults to
the visitor's OS preference. Animations respect `prefers-reduced-motion`.

## Structure

```
src/
  components/
    layout/        Header (+ mobile menu), Footer
    sections/      Hero, TechMarquee, About, Services, Projects, Process, Contact
    ui/            Button, Logo, Icon, SectionHeader, ThemeToggle, AuroraBackground
    RobotGuide.tsx Spline robot — large in the hero, then a floating guide
  data/            site / projects / services  ← edit content here
  hooks/           useReveal, useScrollSpy, useMediaQuery, usePrefersReducedMotion
```

## The robot guide

The Spline robot in [`RobotGuide.tsx`](src/components/RobotGuide.tsx) starts large in
the hero, then shrinks into a floating companion that shows a short tip per section as
you scroll (edit the `tips` map to change the copy, or `SCENE` to swap the Spline scene).
It's desktop-only (hidden on mobile and under `prefers-reduced-motion` for performance)
and can be dismissed with the × on its speech bubble.
