# AGENTS.md

## Project identity

This project is the official portfolio website for AstralApps, a software/AI company. The goal is to create a premium, animated, modern portfolio website that showcases projects using Three.js, React Three Fiber, GSAP, and polished UI animations.

## Tech stack

Use:
- React with TypeScript
- Vite or Next.js, depending on the existing project
- Tailwind CSS for styling
- Three.js through @react-three/fiber
- @react-three/drei for helpers
- GSAP and @gsap/react for animation
- GSAP ScrollTrigger for scroll-linked animations
- Optional: @react-three/postprocessing for bloom and cinematic effects
- Optional: Lenis for smooth scroll, only if needed

Do not use:
- jQuery
- Heavy animation libraries that duplicate GSAP
- Unnecessary state management unless required
- Large 3D assets without optimization

## Animation rules

When implementing animation:
- Prefer GSAP timelines for sequenced DOM animations.
- Prefer ScrollTrigger for scroll-based animation.
- Use @gsap/react `useGSAP` in React components.
- Scope GSAP animations to component refs.
- Always clean up animations on unmount.
- Register GSAP plugins once.
- Prefer transform properties such as x, y, scale, rotation, opacity/autoAlpha.
- Avoid animating layout-heavy properties like top, left, width, height.
- Respect `prefers-reduced-motion`.

## Three.js rules

When implementing 3D:
- Prefer React Three Fiber components over imperative raw Three.js unless necessary.
- Keep Canvas isolated in a dedicated scene component.
- Use Drei helpers where useful.
- Use GLTF/GLB models only if optimized.
- Dispose geometries/materials where needed.
- Avoid excessive lights, shadows, and high-poly models.
- Keep mobile performance in mind.
- Use lazy loading for heavy 3D sections.
- Add fallback UI while 3D assets load.

## Visual direction

Design style:
- Premium tech company portfolio
- Dark theme by default
- Space/astral-inspired visual language
- Clean typography
- Smooth cinematic transitions
- Subtle glow, particles, gradients, and glassmorphism
- Avoid childish or overly flashy animation

Brand direction:
- Company name: AstralApps
- Feel: futuristic, reliable, intelligent, elegant
- Website should make the company look capable of building AI products, automations, SaaS apps, and web platforms.

## Pages/sections

Implement:
1. Hero section
2. About AstralApps
3. Services
4. Featured projects
5. Process / workflow
6. Contact section

## Code quality

- Use TypeScript.
- Use reusable components.
- Keep animation logic separated where possible.
- Avoid one giant component.
- Keep data-driven sections, especially projects and services.
- Use clean file organization.
- Add comments only where animation/3D logic is non-obvious.
- Run lint/build checks after implementation.

## Skills usage

When working on GSAP animation, use the installed GSAP skills:
- gsap-core
- gsap-timeline
- gsap-scrolltrigger
- gsap-react
- gsap-performance

When working on Three.js/R3F, use the installed Three.js skills:
- threejs-fundamentals
- threejs-animation
- threejs-loaders
- threejs-postprocessing
- threejs-interaction
- three-best-practices

Always prefer skill guidance over guessing APIs.