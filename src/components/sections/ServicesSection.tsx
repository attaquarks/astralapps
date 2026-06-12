import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { services } from '../../data/services'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeader } from '../ui/SectionHeader'

const accentClasses = {
  amber: 'from-amber-200 to-orange-300',
  blue: 'from-sky-200 to-blue-300',
  cyan: 'from-cyan-200 to-teal-300',
  mint: 'from-emerald-200 to-lime-300',
  rose: 'from-rose-200 to-pink-300',
  violet: 'from-violet-200 to-fuchsia-300',
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      gsap.from('.service-card', {
        autoAlpha: 0,
        y: 34,
        scale: 0.97,
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true, scope: sectionRef },
  )

  return (
    <section className="section-shell" id="services" ref={sectionRef}>
      <SectionHeader
        eyebrow="Services"
        title="Product capability across AI, web, automation, and integrations."
        description="AstralApps builds the intelligent layers, interfaces, and systems that turn modern companies into faster operators."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article className="service-card glass-card group p-6" key={service.title}>
            <span
              className={`mb-8 block h-1.5 w-14 rounded-full bg-gradient-to-r ${accentClasses[service.accent]}`}
            />
            <h3 className="text-xl font-semibold text-[var(--color-heading)]">{service.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
              {service.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
