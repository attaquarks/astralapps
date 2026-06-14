import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeader } from '../ui/SectionHeader'

const steps = [
  { title: 'Discovery', copy: 'Map the product, users, constraints, and automation opportunities.' },
  { title: 'Design', copy: 'Shape the interface, architecture, and launch plan before build starts.' },
  { title: 'Build', copy: 'Implement the experience with clean components, APIs, and integrations.' },
  { title: 'Deploy', copy: 'Ship the production-ready system with performance and deploy checks.' },
  { title: 'Maintain', copy: 'Improve, monitor, and extend the system as the business evolves.' },
]

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('.process-step', { autoAlpha: 1, y: 0 })
        gsap.set('.process-line', { scaleX: 1 })
        return
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            end: 'bottom 55%',
            scrub: 0.8,
          },
        })
        .from('.process-line', { scaleX: 0, transformOrigin: '0% 50%', ease: 'none' })
        .from('.process-step', { autoAlpha: 0, y: 26, stagger: 0.12 }, '<0.05')
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true, scope: sectionRef },
  )

  return (
    <section className="section-shell" id="process" ref={sectionRef}>
      <SectionHeader
        eyebrow="Process"
        title="A clear path from first signal to maintained system."
        description="Every engagement is shaped around clarity, momentum, and the realities of shipping durable software."
      />

      <div className="relative mt-16">
        <div className="process-line absolute left-7 right-7 top-7 hidden h-px bg-[linear-gradient(90deg,var(--brand),var(--accent))] md:block" />
        <div className="grid gap-5 md:grid-cols-5">
          {steps.map((step, index) => (
            <div className="process-step" key={step.title}>
              <span className="relative grid size-14 place-items-center rounded-2xl border border-border-strong bg-bg font-display text-lg font-semibold text-heading">
                <span className="absolute inset-0 rounded-2xl bg-[linear-gradient(145deg,color-mix(in_srgb,var(--brand)_30%,transparent),transparent)]" />
                <span className="relative">{index + 1}</span>
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold text-heading">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
