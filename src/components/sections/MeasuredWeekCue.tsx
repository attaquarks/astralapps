import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../../lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useIndustry } from '../../context/IndustryContext'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'
import { Button } from '../ui/Button'

const stages = [
  '9:00 Monday — dozens of things waiting to be done by hand.',
  'Triggers fire. Data moves between tools. Replies draft themselves.',
  'Your team reviews the exceptions instead of doing the work.',
  'What used to eat the whole week now takes an afternoon.',
]

const promises = ['Built on the tools you already use', 'You own everything we ship', 'Live in 2–4 weeks']
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

/*
 * CH 03 — STAR CHART. The measured week: a scroll-scrubbed counter that
 * dims the manual hours out of the visitor's week, then the same workload
 * itemized and a week, two ways. Industry data drives all of it.
 */

function BeforeAfterRig() {
  const sectionRef = useRef<HTMLDivElement>(null)
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
    <div ref={sectionRef} className="relative h-[210vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <span className="meridian bottom-[22%]" aria-hidden="true" />
        <div className="mx-auto w-full max-w-3xl px-5 text-center md:px-8">
          <div className="flex items-end justify-center gap-3">
            <span ref={numberRef} className="font-display text-8xl font-semibold tabular-nums text-heading md:text-9xl">
              {startHours.toFixed(1)}
            </span>
            <span className="pb-4 font-display text-3xl text-muted">h</span>
          </div>
          <p className="data mt-2 text-xs uppercase tracking-[0.2em] text-muted">
            hours / week on manual work
          </p>

          {/* the dimmer: manual work fades out of the week */}
          <div className="mx-auto mt-9 h-2 w-full max-w-md border border-border bg-surface p-0.5">
            <span ref={barRef} className="block h-full bg-accent transition-none" style={{ width: '100%' }} />
          </div>

          <p ref={stageRef} className="mx-auto mt-9 min-h-[3.5rem] max-w-xl text-lg leading-8 text-text">
            {stages[0]}
          </p>

          <p className="data mt-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
            Keep scrolling — the sky connects
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  )
}

function WorkloadLedger() {
  const { content } = useIndustry()
  const [open, setOpen] = useState<number | null>(0)
  const totalHours = content.deadWorkflows.reduce((sum, w) => sum + w.hoursPerWeek, 0)

  return (
    <div className="channel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
        <h3 className="text-xl">The workload, itemized.</h3>
        <Tag>illustrative — industry averages</Tag>
      </div>

      <div>
        {content.deadWorkflows.map((workflow, i) => {
          const isOpen = open === i
          return (
            <div key={workflow.task} className="border-b border-border last:border-b-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-surface"
              >
                <span className="data grid size-7 shrink-0 place-items-center border border-border text-xs text-muted">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm font-medium leading-snug text-heading">{workflow.task}</span>
                <span className={`data shrink-0 text-sm ${isOpen ? 'text-brand' : 'text-muted'}`}>
                  {workflow.hoursPerWeek}h / wk
                </span>
                <span className={`mark-flag shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <div className="pb-5 pl-[4.25rem] pr-6">
                    <p className="text-sm leading-7 text-muted">
                      <span className="text-heading">automated — </span>
                      {workflow.automated}
                    </p>
                    <p className="data mt-2 text-xs uppercase tracking-[0.14em] text-brand">
                      SAVES ~{workflow.hoursPerWeek}H EVERY WEEK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="px-6 py-4 text-right">
          <span className="data text-sm text-muted">
            ~<span className="text-heading">{totalHours}h</span> buried every week
          </span>
        </div>
      </div>
    </div>
  )
}

function WeekTwoWays() {
  const { content } = useIndustry()

  const rows = days.map((day, i) => ({
    day,
    manual: content.deadWorkflows[i]?.task ?? 'Overflow from everything earlier in the week',
    hours: content.deadWorkflows[i]?.hoursPerWeek ?? 4,
    auto: i === 0 ? 'Approve the few exceptions the AI flagged' : 'Free — focus on clients, strategy & growth',
  }))

  return (
    <div className="flex flex-col gap-5">
      <div className="channel flex-1 p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="size-2 bg-accent" aria-hidden="true" />
          <h3 className="text-lg">Without automation</h3>
        </div>
        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.day} className="flex items-center gap-3 border border-border bg-bg p-3">
              <span className="data w-9 shrink-0 text-xs uppercase text-muted">{row.day}</span>
              <span className="flex-1 text-sm text-text">{row.manual}</span>
              <span className="data shrink-0 text-xs text-accent">{row.hours}h</span>
            </div>
          ))}
        </div>
      </div>

      <div className="channel flex-1 p-5">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="mark-punched size-2" aria-hidden="true" />
          <h3 className="text-lg">With automation</h3>
        </div>
        <div className="space-y-2">
          {rows.map((row, i) => (
            <div
              key={row.day}
              className={`flex items-center gap-3 border border-border p-3 ${i === 0 ? 'bg-surface' : 'border-dashed bg-transparent'}`}
            >
              <span className="data w-9 shrink-0 text-xs uppercase text-muted">{row.day}</span>
              <span className={`flex-1 text-sm ${i === 0 ? 'text-text' : 'text-brand'}`}>{row.auto}</span>
              {i > 0 && <span className="mark-struck data shrink-0 text-xs text-muted">busy</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MeasuredWeekCue() {
  const sectionRef = useReveal<HTMLElement>()
  const { content } = useIndustry()

  return (
    <section id="measured" data-cue="03" className="band wash-firstlight" ref={sectionRef}>
      <div className="shell">
        <SectionHeader title={content.headline} description="Watch the hours leave your week — then see exactly where they were going, itemized task by task." />
      </div>

      <BeforeAfterRig />

      <div className="shell">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div data-reveal>
            <WorkloadLedger />
          </div>
          <div data-reveal>
            <WeekTwoWays />
          </div>
        </div>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-5">
          {promises.map((promise) => (
            <span key={promise} className="flex items-center gap-2.5 text-sm text-text">
              <span className="mark-punched size-2" aria-hidden="true" />
              {promise}
            </span>
          ))}
          <Button href="#contact" withArrow className="sm:ml-auto">
            Automate these
          </Button>
        </div>
      </div>
    </section>
  )
}
