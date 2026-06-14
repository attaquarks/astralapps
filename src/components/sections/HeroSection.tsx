import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { AutomationBuilder } from '../builder/AutomationBuilder'
import { IndustrySelector } from '../ui/IndustrySelector'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('.hero-reveal', { autoAlpha: 1, y: 0 })
        return
      }
      gsap
        .timeline({ defaults: { duration: 0.8, ease: 'power3.out' } })
        .from('.hero-reveal', { autoAlpha: 0, y: 24, stagger: 0.1, delay: 0.1 })
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true, scope: sectionRef },
  )

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20"
      id="hero"
      ref={sectionRef}
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center md:px-8">
        <span className="hero-reveal inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted">
          <span className="live-dot size-1.5 rounded-full bg-brand" />
          AI automation studio
        </span>

        <h1 className="hero-reveal mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-heading sm:text-5xl lg:text-[3.7rem]">
          Watch your busywork become an{' '}
          <span className="serif text-[1.12em] font-normal">automation.</span>
        </h1>

        <p className="hero-reveal mx-auto mt-5 max-w-xl text-base leading-8 text-muted md:text-lg">
          Describe any task your team does by hand every week. Our AI designs the system that does it
          for them — live, right now.
        </p>

        <div className="hero-reveal mt-7 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.18em] text-muted">I run a…</span>
          <IndustrySelector className="justify-center" />
        </div>

        <div className="hero-reveal mt-7 text-left">
          <AutomationBuilder />
        </div>

        <p className="hero-reveal mt-5 text-xs tracking-wide text-muted">
          No signup · real AI · your blueprint in seconds
        </p>
      </div>
    </section>
  )
}
