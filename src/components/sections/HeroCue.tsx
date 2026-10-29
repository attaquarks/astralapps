import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useIndustry } from '../../context/IndustryContext'
import { AutomationBuilder } from '../builder/AutomationBuilder'
import { Button } from '../ui/Button'
import { IndustrySelector } from '../ui/IndustrySelector'

const upNext = [
  { code: 'CH 02', name: 'The console', href: '#proof', line: 'Fire a channel — the AI runs live.' },
  { code: 'CH 03', name: 'The measured week', href: '#measured', line: 'Your hours, itemized.' },
  { code: 'CH 04', name: 'The craft', href: '#services', line: 'What we build, running.' },
]

/*
 * CH 01 — DARK SKY. The opening chapter: the offer in one line, the live
 * study request as the primary action, the constellation field at its
 * sparsest behind. The masked-line entrance waits for the curtain lift (or a
 * fallback timer) so the visitor actually sees the sky resolve.
 */
export function HeroCue() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { content } = useIndustry()

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('.mask-inner', { yPercent: 0 })
        gsap.set('.hero-reveal', { autoAlpha: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({ paused: true, defaults: { duration: 0.9, ease: 'power3.out' } })
        .from('.mask-inner', { yPercent: 110, stagger: 0.09, duration: 1.05, ease: 'power4.out' })
        .from('.hero-reveal', { autoAlpha: 0, y: 26, stagger: 0.09 }, '-=0.55')

      let played = false
      const play = () => {
        if (!played) {
          played = true
          tl.play()
        }
      }
      // First scroll passes the curtain lift; the timer covers a visitor who
      // lingers on the intro.
      ScrollTrigger.create({
        start: 0,
        end: () => window.innerHeight,
        onUpdate: (self) => {
          if (self.progress > 0.1) play()
        },
      })
      const timer = window.setTimeout(play, 3400)

      return () => window.clearTimeout(timer)
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true, scope: sectionRef },
  )

  return (
    <section
      id="hero"
      data-cue="01"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pb-0 pt-28 md:pt-32"
      ref={sectionRef}
    >
      <div className="shell">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl">
            <span className="mask-line">
              <span className="mask-inner">From scattered work</span>
            </span>
            <span className="mask-line">
              <span className="mask-inner">
                to a <span className="text-accent">working constellation.</span>
              </span>
            </span>
          </h1>

          <p className="hero-reveal mt-7 max-w-xl text-base leading-8 text-muted md:text-lg md:leading-9">
            {content.subhead}
          </p>

          {/* The primary action, in its working form: the live study request */}
          <div className="hero-reveal mt-9">
            <IndustrySelector />
          </div>
          <div className="hero-reveal mt-5">
            <AutomationBuilder />
          </div>
          <p className="hero-reveal data mt-4 text-xs uppercase tracking-[0.14em] text-muted">
            No signup · real AI · your blueprint in seconds
          </p>

          <div className="hero-reveal mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="#work" variant="secondary" withArrow>
              See the pricing
            </Button>
            <Button href="#contact" variant="ghost" withArrow>
              Talk to us
            </Button>
          </div>
        </div>
      </div>

      {/* UP NEXT — the chart index, carried by the full-width meridian */}
      <div className="relative mt-auto border-t border-border">
        <span className="meridian -top-px" aria-hidden="true" />
        <div className="shell grid gap-px py-8 sm:grid-cols-3">
          {upNext.map((cue) => (
            <a
              key={cue.href}
              href={cue.href}
              className="hero-reveal group flex items-start gap-4 py-4 sm:flex-col sm:gap-2 sm:py-2"
            >
              <span className="cue-code text-xs text-muted transition-colors group-hover:text-brand">
                {cue.code}
              </span>
              <span>
                <span className="flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-[0.04em] text-heading">
                  {cue.name}
                  <svg
                    className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mt-0.5 block text-sm text-muted">{cue.line}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
