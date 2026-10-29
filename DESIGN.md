---
name: AstralApps
description: Proof-first AI automation studio — the site is a star chart being drawn while the studio's own AI runs live.
colors:
  violet-night: "#050409"
  violet-deep: "#0a0714"
  field-ground: "#070510"
  surface: "#0e0b1a"
  surface-2: "#141024"
  iris: "#863bff"
  lavender-reading: "#c9b4ff"
  signal-ice: "#47bfff"
  logo-lavender: "#ede6ff"
  heading: "#f1eefa"
  body-text: "#d6d1e6"
  muted: "#9d95ba"
  hairline: "rgba(201, 180, 255, 0.13)"
  hairline-strong: "rgba(201, 180, 255, 0.3)"
  dawn-ground: "#e9e5f4"
  dawn-ink: "#14101f"
  dawn-iris: "#6d2bf0"
  dawn-signal: "#0b7fc4"
typography:
  display:
    fontFamily: "Saira Condensed, Arial Narrow, sans-serif"
    fontSize: "3.4rem"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Saira Condensed, Arial Narrow, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "0.005em"
  body:
    fontFamily: "Saira, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "Saira Stencil One, Saira Condensed, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 400
    letterSpacing: "0.14em"
  data:
    fontFamily: "Chivo Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.02em"
rounded:
  none: "0px"
  hairline: "2px"
  pill: "9999px"
spacing:
  band: "6.5rem"
  band-desktop: "9rem"
  shell: "76rem"
  gutter: "1.25rem"
  gutter-desktop: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.heading}"
    textColor: "{colors.violet-night}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.heading}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  field-input:
    backgroundColor: "color-mix(in srgb, {colors.surface} 80%, transparent)"
    textColor: "{colors.heading}"
    rounded: "{rounded.none}"
    padding: "11px 16px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
---

# Design System: AstralApps

## Overview

**Creative North Star: "The Charting Room"**

The page is a star chart being drawn in real time. A persistent WebGL constellation field — drifting star-nodes with pale halos, proximity link-lines, thin rising signal beams — sits behind every section, and its link formation and brightness are driven by scroll progress: the sky itself carries the before/after story of manual chaos resolving into an automated system. The palette is the logo's own (violet core, pale lavender reading accent, ice-blue signal color) on a deep violet-black ground; one opaque lavender-white dawn band is the payoff. Type is a signage system: condensed uppercase display, stencil chapter codes, and mono reserved strictly for measurement. Chrome and furniture are machined, flat, and hairline — depth lives inside the canvas, never in box shadows.

State is carried by concrete marks, never by color alone: a punched square for selected/committed, a struck line for finished/removed, an ice tape-flag for open/current. The site opens on a black intro curtain (mark + decode-animated wordmark + a very small scroll cue) that lifts on first scroll.

**Key Characteristics:**
- One persistent responsive environment (the field), not per-section backgrounds
- Logo-derived palette: violet commits, lavender reads, ice signals
- Chapter rail + header readout name the current state in text (01–06)
- Flat hairline channels with a machined top edge; zero border-radius furniture
- Lenis smooth scroll; GSAP scrubbed choreography; masked-line heading reveals

## Colors

A violet-black instrument ground borrowed wholesale from the logo mark; color does narrative work — violet commits, lavender reads, ice signals.

### Primary
- **Iris** (#863bff): the logo core. Filled commits, selection tint, chapter washes; never body text on dark (contrast).
- **Lavender Reading** (#c9b4ff): the pale-violet reading accent on dark — links, active nav underline, channel top edges, "with automation" text.

### Secondary
- **Signal Ice** (#47bfff): the live/signal color — caret, struck lines, tape flags, the automation drain bar, headline emphasis words. If a state means "alive or energized," it is ice.
- **Logo Lavender** (#ede6ff): the mark's highlight; used in the canvas (node color) and as the dark-band selection text color.

### Tertiary
- **Dawn Iris** (#6d2bf0): the iris family darkened for the light band, where it carries buttons, links, and the ROI slider on lavender-white ground.
- **Dawn Signal** (#0b7fc4): the ice family darkened for marks on the light band.

### Neutral
- **Violet Night** (#050409): the page ground (html). No pink exists anywhere in the system.
- **Field Ground** (#070510): the canvas clear color — a half-step lighter so the field reads as depth, not void.
- **Surface / Surface 2** (#0e0b1a / #141024): channel fills, light-to-dark top-to-bottom.
- **Heading** (#f1eefa): near-white with a lavender cast; also the primary button fill (ink inverts with the band).
- **Body Text** (#d6d1e6) / **Muted** (#9d95ba): reading copy and secondary text, both violet-cast grays.
- **Hairline / Hairline Strong** (rgba(201,180,255,0.13/0.3)): all borders, window dressing, and dividers.
- **Dawn Ground** (#e9e5f4) + **Dawn Ink** (#14101f): the one light band; every semantic token flips locally inside it.

### Named Rules
**The Logo Rule.** The palette is the favicon's own: iris #863bff, lavender #ede6ff, ice #47bfff on violet-black. Any accent the logo does not contain — especially pink — is out of system.
**The Signal Rule.** Ice is a signal, not a decoration: caret, marks, live meters, emphasis words. Never large fills.
**The Light-Payoff Rule.** The dawn band is the system's single opaque light surface. It appears once (delivery/pricing) as the "automated day" state; never use it for decoration elsewhere.

## Typography

**Display Font:** Saira Condensed (self-hosted via @fontsource), uppercase
**Body Font:** Saira (self-hosted)
**Label Font:** Saira Stencil One (chapter codes / instrument labels)
**Data Font:** Chivo Mono (tabular numerals, measurement)

**Character:** Wayfinding signage for a charting instrument — compressed caps with wide-tracked stencil codes and strictly tabular data.

### Hierarchy
- **Display** (600, 3.4rem, 0.98): h2 section titles, one masked line per reveal; hero h1 runs 5–7rem by breakpoint.
- **Headline** (600, 1.125–2rem): h3 channel and block titles, normal-case allowed inside channels.
- **Body** (400, 1rem, 1.9): reading copy, 65–75ch measure.
- **Label** (400 stencil, 0.58–0.72rem, 0.14em+, uppercase): chapter codes (CH 01–06), tool codes (SIG·01–03), rail names.
- **Data** (400 mono, 0.68–0.75rem, tabular): hours, prices, honesty tags, ticker.

### Named Rules
**The Measurement Rule.** Chivo Mono is for measurement, codes, and tabular numerals only — never for prose or as a "technical" costume.
**The No-Kicker Rule.** No eyebrow or kicker labels above headings; the heading carries its own weight, and the chapter designation lives in the rail.

## Layout

One continuous scroll narrative in six named chapters, tracked by a fixed right-edge rail (lg+) and the header readout. Sections are full-bleed bands on the persistent field; content sits in a 76rem shell with 1.25rem/2.5rem gutters. Band rhythm is 6.5rem (9rem desktop) block padding; more space above a heading than below. Chapter atmosphere comes from per-band washes (iris, firstlight, signal, dawn) — absolute-positioned gradients behind content, never on content itself. The STAR CHART chapter is a 210vh pinned scrub; grids use explicit `minmax(0, …)` tracks so nothing clips at mobile widths.

## Elevation & Depth

No box shadows anywhere. Depth is owned by the WebGL field (z-spread, camera dolly, pointer parallax, additive-blended nodes and beams), by the grain overlay, and by the reading vignette that keeps text legible over stars. Panels separate by hairline borders and tonal surface steps, never by elevation. The intro curtain is the one true overlay (z-70), and it lifts away on first scroll.

### Named Rules
**The Canvas-Light Rule.** Light lives inside the canvas — nodes, links, beams carry their own additive glow. CSS never fakes it: no glow halos, no colored box-shadows.

## Shapes

Zero-radius furniture: buttons, channels, inputs, tags, and the rail are square with 1px hairline borders. The channel's one softness is its machined top edge — a 1px brand-tinted line via ::before. The only radius in the system is the browser scrollbar thumb (pill) and 2px focus rounding. State marks are geometric primitives: a 0.5rem punched square, a 2px struck line, a 0.7rem triangle flag.

## Components

### Buttons
- **Shape:** square (0 radius), min-height 44px
- **Primary:** heading fill, ground text ("day on blackout"), uppercase 0.08em tracking; hover drops to 85% opacity
- **Secondary:** hairline-strong border, heading text; hover fills surface
- **Ghost:** no border, muted text; hover to heading
- **With arrow:** inline SVG arrow (1.8 stroke), nudges +2px on hover

### Cards / Channels
- **Corner Style:** square
- **Background:** surface-2 → surface vertical gradient inside `.channel`; surface on the dawn band
- **Border:** 1px hairline; hover steps to hairline-strong
- **Signature edge:** machined 1px brand-tinted top edge (::before)
- **Internal Padding:** 20px (32px on feature channels)

### Inputs / Fields
- **Style:** 1px hairline, 80% surface fill, no radius
- **Focus:** border shifts to 60% brand
- **Error:** border to signal-ice (aria-invalid)
- **Placeholder:** muted violet-gray

### Navigation
- Fixed header, transparent until scroll (then 92% ground, hairline bottom); links uppercase 0.06em with a 1px lavender underline on active; CueReadout prints `CH 0n · NAME` with a punched mark. Mobile: full-screen overlay menu.

### Signature Components
- **The field** (persistent R3F canvas): star-nodes (lavender/ice/violet, pulsing cores + halos), proximity links that form with scroll progress, rising signal beams, pointer gravity + pointer links, deterministic seed for a stable chart.
- **The intro curtain**: fixed z-70 black layer; mark + decode wordmark + caption centered, scroll cue bottom-right; scrubbed lift over the first viewport with inner parallax; skipped entirely under reduced motion.
- **The chart rail**: fixed right-edge chapter index (lg+); active chapter = punched square + printed name.
- **Marks**: punched (selected), struck (done), tape-flag (current/open) — state as mark, ice-carried.

## Do's and Don'ts

### Do:
- **Do** drive atmosphere from the chart bus: one scroll writes chapter, progress, and lift; the field, rail, readout, and washes all subscribe.
- **Do** keep every interactive truth text-equivalent: the rail names chapters, the readout names state, honesty tags label illustrative data.
- **Do** author headings as masked lines (`mask-line`/`mask-inner`) and reveal from yPercent 110 with power4.out.
- **Do** respect prefers-reduced-motion everywhere: static field (frameloop demand, full links), no curtain, no decode, no scrub — settled frames only.

### Don't:
- **Don't** introduce pink or any hue outside the logo family (iris / lavender / ice on violet-black, with the dawn-band inversions).
- **Don't** use glass, blur decoration, gradient text, glow box-shadows, or kickers/eyebrows — all out of system.
- **Don't** animate layout properties; transform/opacity only, scoped useGSAP contexts, cleanup on unmount.
- **Don't** paint a second background per section — the field is the one environment; washes tint it, they never replace it.
