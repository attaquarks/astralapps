import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeader } from '../ui/SectionHeader'

const steps = ['Discovery', 'Design', 'Build', 'Deploy', 'Maintain']

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
          end: 'bottom 45%',
          scrub: 0.8,
        },
      })

      timeline
        .from('.process-line', { scaleX: 0, transformOrigin: '0% 50%', ease: 'none' })
        .from(
          '.process-step',
          {
            autoAlpha: 0,
            y: 26,
            stagger: 0.12,
          },
          '<0.05',
        )
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true, scope: sectionRef },
  )

  return (
    <section className="section-shell" id="process" ref={sectionRef}>
      <SectionHeader
        eyebrow="Process"
        title="A clear workflow from first signal to maintained system."
        description="Every engagement is shaped around clarity, momentum, and the realities of shipping durable software."
      />

      <div className="relative mt-14">
        <div className="process-line absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-cyan-300 via-emerald-300 to-violet-300 md:block" />
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <div className="process-step glass-card p-5" key={step}>
              <span className="mb-7 grid size-12 place-items-center rounded-lg border border-cyan-300/35 bg-cyan-300/10 text-sm font-semibold text-cyan-200">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-[var(--color-heading)]">{step}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                {processCopy[index]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const processCopy = [
  'Map the product, users, constraints, and automation opportunities.',
  'Shape the interface, architecture, and launch plan before build starts.',
  'Implement the experience with clean components, APIs, and integrations.',
  'Ship the production-ready system with performance and deployment checks.',
  'Improve, monitor, and extend the system as the business evolves.',
]
