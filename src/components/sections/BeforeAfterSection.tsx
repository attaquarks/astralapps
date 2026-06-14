import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { useIndustry } from '../../context/IndustryContext'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const stages = [
  '9:00 Monday — dozens of things waiting to be done by hand.',
  'Triggers fire. Data moves between tools. Replies draft themselves.',
  'Your team reviews the exceptions instead of doing the work.',
  'What used to eat the whole week now takes an afternoon.',
]

export function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const stageRef = useRef<HTMLParagraphElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { content } = useIndustry()

  const startHours = content.deadWorkflows.reduce((sum, w) => sum + w.hoursPerWeek, 0)
  const endHours = Math.max(1.5, Math.round(startHours * 0.08 * 10) / 10)

  useGSAP(
    () => {
      const setFrame = (p: number) => {
        const hours = startHours + (endHours - startHours) * p
        if (numberRef.current) numberRef.current.textContent = hours.toFixed(1)
        if (barRef.current) barRef.current.style.width = `${(1 - p) * 100}%`
        if (stageRef.current) {
          const idx = Math.min(stages.length - 1, Math.floor(p * stages.length))
          stageRef.current.textContent = stages[idx]
        }
      }

      if (prefersReducedMotion) {
        setFrame(1)
        return
      }

      const proxy = { p: 0 }
      setFrame(0)
      gsap.to(proxy, {
        p: 1,
        ease: 'none',
        onUpdate: () => setFrame(proxy.p),
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })
    },
    { dependencies: [prefersReducedMotion, startHours], revertOnUpdate: true, scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="story" className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto w-full max-w-3xl px-5 text-center md:px-8">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-brand-soft">
            Before → after
          </span>
          <div className="mt-6 flex items-end justify-center gap-2">
            <span ref={numberRef} className="font-display text-7xl font-semibold tabular-nums text-gradient md:text-8xl">
              {startHours.toFixed(1)}
            </span>
            <span className="pb-3 font-display text-2xl text-muted">h</span>
          </div>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            hours / week on manual work
          </p>

          <div className="mx-auto mt-8 h-1.5 max-w-md overflow-hidden rounded-full bg-border">
            <span
              ref={barRef}
              className="block h-full rounded-full bg-[linear-gradient(90deg,var(--brand),var(--accent))]"
              style={{ width: '100%' }}
            />
          </div>

          <p ref={stageRef} className="mx-auto mt-8 min-h-[3.5rem] max-w-xl text-lg leading-8 text-text">
            {stages[0]}
          </p>

          <p className="mt-6 font-mono text-xs text-muted">↓ keep scrolling</p>
        </div>
      </div>
    </section>
  )
}
