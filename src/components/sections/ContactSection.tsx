import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Button } from '../ui/Button'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion) return

      gsap.from('.contact-reveal', {
        autoAlpha: 0,
        y: 34,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true, scope: sectionRef },
  )

  return (
    <section className="section-shell pb-16" id="contact" ref={sectionRef}>
      <div className="relative overflow-hidden rounded-lg border border-[var(--color-border-strong)] bg-[linear-gradient(135deg,var(--color-surface-strong),var(--color-surface))] p-7 md:p-12">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-300/12 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="contact-reveal mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Contact
            </p>
            <h2 className="contact-reveal max-w-3xl text-3xl font-semibold leading-tight text-[var(--color-heading)] md:text-6xl">
              Ready to build something intelligent?
            </h2>
            <p className="contact-reveal mt-6 text-lg leading-8 text-[var(--color-text-muted)]">
              Email: hello@astralapps.example
            </p>
          </div>
          <div className="contact-reveal">
            <Button href="mailto:hello@astralapps.example">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
