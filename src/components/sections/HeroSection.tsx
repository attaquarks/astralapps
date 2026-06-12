import { lazy, Suspense, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Button } from '../ui/Button'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const AstralScene = lazy(() =>
  import('../three/AstralScene').then((module) => ({ default: module.AstralScene })),
)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('.hero-reveal', { autoAlpha: 1, y: 0 })
        return
      }

      const timeline = gsap.timeline({
        defaults: { duration: 0.9, ease: 'power3.out' },
      })

      timeline
        .from('.hero-reveal', {
          autoAlpha: 0,
          y: 28,
          stagger: 0.12,
        })
        .from(
          '.hero-orbit',
          {
            autoAlpha: 0,
            scale: 0.86,
            rotation: -12,
            transformOrigin: '50% 50%',
          },
          '<0.15',
        )
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true, scope: sectionRef },
  )

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
      id="hero"
      ref={sectionRef}
    >
      <Suspense fallback={<div className="absolute inset-0" />}>
        <AstralScene />
      </Suspense>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_36%,var(--color-hero-aura),transparent_34%),linear-gradient(180deg,transparent_0%,var(--color-bg)_92%)]" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-10 md:grid-cols-[1fr_0.82fr] md:px-8 md:pb-20 md:pt-20">
        <div className="max-w-4xl">
          <p className="hero-reveal mb-6 text-base font-semibold text-cyan-300">AstralApps</p>
          <h1 className="hero-reveal max-w-5xl text-4xl font-semibold leading-[1.06] text-[var(--color-heading)] sm:text-5xl md:text-6xl lg:text-7xl">
            We build intelligent apps, automations, and digital experiences.
          </h1>
          <p className="hero-reveal mt-7 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            Premium software systems for teams that need AI products, web platforms, SaaS
            dashboards, and dependable integrations built with care.
          </p>
          <div className="hero-reveal mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>

        <div className="hero-reveal relative hidden min-h-[500px] items-center justify-center md:flex">
          <div className="hero-orbit absolute size-[430px] rounded-full border border-cyan-200/18" />
          <div className="hero-orbit absolute size-[310px] rotate-45 rounded-full border border-violet-200/18" />
          <div className="glass-card relative w-full max-w-sm p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--color-heading)]">Project Galaxy</span>
              <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
            </div>
            <div className="space-y-3">
              {['AI Agents', 'Automations', 'SaaS Platforms'].map((label, index) => (
                <div
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4"
                  key={label}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--color-heading)]">{label}</span>
                    <span className="text-xs text-cyan-300">0{index + 1}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-track)]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-violet-300"
                      style={{ width: `${72 - index * 14}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
