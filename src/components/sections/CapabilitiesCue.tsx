import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { services, type Service } from '../../data/services'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeader } from '../ui/SectionHeader'
import { ServiceDemo, type DemoKind } from '../ui/ServiceDemo'

const iconProps = {
  className: 'size-5',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const serviceIcons: Record<Service['icon'], ReactNode> = {
  ai: (
    <svg {...iconProps}>
      <path d="M12 3l1.5 4L18 8.5 13.5 10 12 14l-1.5-4L6 8.5 10.5 7 12 3z" />
      <path d="M18 14l.7 1.8L20.5 16l-1.8.7L18 18.5l-.7-1.8L15.5 16l1.8-.2L18 14z" />
    </svg>
  ),
  web: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
    </svg>
  ),
  automation: (
    <svg {...iconProps}>
      <path d="M21 12a9 9 0 1 1-2.6-6.3" />
      <path d="M21 4v4h-4" />
    </svg>
  ),
  chat: (
    <svg {...iconProps}>
      <path d="M21 11.5a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 11.5z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </svg>
  ),
  dashboard: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  ),
  api: (
    <svg {...iconProps}>
      <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
      <path d="M13 6l-2 12" />
    </svg>
  ),
}

const demoFor: Record<Service['icon'], DemoKind> = {
  ai: 'fill',
  web: 'bars',
  automation: 'route',
  chat: 'chat',
  dashboard: 'bars',
  api: 'route',
}

const steps = [
  { title: 'Discovery', copy: 'Map the product, users, constraints, and automation opportunities.' },
  { title: 'Design', copy: 'Shape the interface, architecture, and launch plan before build starts.' },
  { title: 'Build', copy: 'Implement the experience with clean components, APIs, and integrations.' },
  { title: 'Deploy', copy: 'Ship the production-ready system with performance and deploy checks.' },
  { title: 'Maintain', copy: 'Improve, monitor, and extend the system as the business evolves.' },
]

/*
 * CH 04 — CONSTELLATION. The craft: what the studio builds, each service
 * demonstrated running, and the checklist — the path from first signal
 * to maintained system.
 */
export function CapabilitiesCue() {
  const sectionRef = useReveal<HTMLElement>()
  const processRef = useRef<HTMLDivElement>(null)
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
            trigger: processRef.current,
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
    <section id="services" data-cue="04" className="band wash-signal" ref={sectionRef}>
      <div className="shell">
        <SectionHeader
          title="Automation across AI, web, ops & integrations."
          description="AstralApps combines strategy, AI workflows, interface design, and full-stack engineering — elegant, reliable digital systems that are useful, fast, and yours. Hover any channel to watch the kind of system we build, running."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} data-reveal className="channel group p-5 transition-colors hover:border-border-strong">
              <ServiceDemo kind={demoFor[service.icon]} />
              <div className="mt-5 flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center border border-border text-brand">
                  {serviceIcons[service.icon]}
                </span>
                <h3 className="text-lg normal-case">{service.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{service.description}</p>
            </article>
          ))}
        </div>

        {/* The checklist — how an engagement runs */}
        <div ref={processRef} className="mt-20">
          <h3 className="text-2xl md:text-3xl">From first signal to maintained system.</h3>
          <div className="relative mt-12">
            <div className="process-line absolute left-7 right-7 top-7 hidden h-px bg-brand/50 md:block" />
            <div className="grid gap-6 md:grid-cols-5">
              {steps.map((step, index) => (
                <div className="process-step" key={step.title}>
                  <span className="cue-code relative grid size-14 place-items-center border border-border-strong bg-bg-2 text-lg text-heading">
                    {index + 1}
                  </span>
                  <h4 className="mt-5 text-lg normal-case">{step.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
