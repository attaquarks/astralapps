# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: owners and operations leads at small-to-mid businesses (target verticals: recruiting agencies, marketing agencies, accounting firms, real-estate teams). Their situation: repetitive manual work (data entry, reporting, lead handling, admin) eats their team's week; they are curious about AI but skeptical of hype and wary of vendors. Their job: find and hire a trustworthy partner who builds AI automations and software that visibly pay for themselves.

Secondary (not primary target): founders/startups needing AI products, web platforms, SaaS dashboards built.

## Product Purpose

The AstralApps portfolio site: the company's storefront and sole lead-generation surface. It must convince a skeptical SMB operator that AstralApps can build reliable AI automations and software for them, and convert them into a booked call or an inquiry. Success = a visitor experiences the studio's AI working live on the site, understands the offer and price, and contacts AstralApps.

## Positioning

Proof-first AI automation studio: the site itself runs the studio's actual AI (automation builder, business-audit scanner, blueprint wizard — real backend calls to an Anthropic proxy), so a visitor sees the product of hiring AstralApps before ever talking to anyone. Supporting claims that distinguish it: transparent published pricing, 2–4 week delivery, clients own everything shipped. A neighboring studio could not truthfully copy the live-tools proof.

## Operating Context

Single-page React site deployed as a static build; three interactive tools call real backend endpoints (`/api/automation-builder`, `/api/business-audit`, `/api/blueprint-wizard`, Express proxy to Anthropic in `server/`) with graceful "demo preview" fallbacks when no API key is configured. Content is industry-aware: a visitor can select their vertical (recruiting / marketing / accounting / real estate) and see tailored copy in several sections. Editable content lives in `src/data/*.ts` (`site.ts`, `services.ts`, `projects.ts`, `pricing.ts`, `industries.ts`, `liveEvents.ts`), marked with TODOs where facts are pending. Contact form POSTs to a Formspree endpoint (`VITE_FORMSPREE_ENDPOINT`); unset = demo mode.

## Capabilities and Constraints

- Preserve working behavior of the three backend AI tools and their demo-preview fallbacks.
- Tech stack fixed: React 19 + TypeScript + Vite, Tailwind CSS v4 (tokens in `src/index.css`), GSAP + ScrollTrigger + @gsap/react, React Three Fiber + drei for the 3D scene.
- AGENTS.md rules bind: GSAP via useGSAP, scoped contexts, cleanup on unmount, transform-based animation, `prefers-reduced-motion` respected; R3F canvases isolated/lazy, mobile performance minded; TypeScript; reusable components; data-driven sections; lint/build checks after implementation.
- Industry personalization (IndustryContext) is existing functionality.
- Real contact details unknown: email `hello@astralapps.com` is placeholder-configured; social links `#`; calendar embed empty; Formspree endpoint unset. Keep placeholders honest and configurable.

## Brand Commitments

- Name: AstralApps. The "astral" identity is binding (space-adjacent naming heritage).
- Feel words (AGENTS.md, binding): futuristic, reliable, intelligent, elegant; premium tech-studio register; nothing childish or overly flashy.
- Dark theme by default (AGENTS.md); a light variant may exist but dark is the canonical face.
- 2026-10 redesign mandate (owner): the incumbent execution — glassmorphism cards, cyan/violet glow, aurora blobs, particle-field hero, Inter — reads as generic AI output and is rejected as the visual world. Honoring the astral identity and feel words must not mean reusing those clichéd devices.

## Evidence on Hand

- Real, working: the three AI tools (backend in `server/`), pricing tiers with concrete numbers (`src/data/pricing.ts`), FAQ copy, ROI calculator math, process steps.
- Illustrative, must stay labeled as such: featured projects ("concept projects", `src/data/projects.ts`), live metrics ("312 hours saved", `liveMetrics` in `src/data/site.ts`), event ticker (`src/data/liveEvents.ts`), per-industry case studies (`src/data/industries.ts` — TODO-marked).
- Absent, must not fabricate: client names, logos, testimonials, real case-study results, press. No photographic assets of real work exist.

## Product Principles

1. Proof over claims — demonstrate the AI working on the site instead of asserting capability.
2. Honest about maturity — illustrative data is labeled; nothing is fabricated into fake client proof.
3. Buyer-confidence devices — published prices, concrete timelines, ownership guarantees do the reassuring.
4. One narrative, few strong beats — the page is a consolidated story, not a stack of every idea.
5. The site is the portfolio — its craft level is the evidence of the studio's engineering quality.

## Accessibility & Inclusion

`prefers-reduced-motion` respected throughout (existing behavior, keep). Standard WCAG AA targets: keyboard access, visible focus, contrast, semantic structure. No product-specific accessibility requirements established beyond standard.
