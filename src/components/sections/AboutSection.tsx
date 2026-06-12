import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const proofPoints = ['AI-native product thinking', 'Clean engineering systems', 'Launch-focused delivery']

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      gsap.from('.about-reveal', {
        autoAlpha: 0,
        y: 36,
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true, scope: sectionRef },
  )

  return (
    <section className="section-shell" id="about" ref={sectionRef}>
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="about-reveal">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
            About AstralApps
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-[var(--color-heading)] md:text-5xl">
            We design and build software that feels intelligent from the first interaction.
          </h2>
        </div>
        <div className="about-reveal glass-card p-6 md:p-8">
          <p className="text-lg leading-9 text-[var(--color-text-muted)]">
            AstralApps helps founders and teams transform ambitious product ideas into elegant,
            reliable digital systems. We combine strategy, AI workflows, interface design, and
            full-stack engineering to ship products that are useful, fast, and memorable.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4 text-sm font-medium leading-6 text-[var(--color-heading)]"
                key={point}
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
