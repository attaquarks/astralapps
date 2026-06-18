import { useState } from 'react'
import { useIndustry } from '../../context/IndustryContext'
import { useReveal } from '../../hooks/useReveal'

function PlusMark({ className }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute z-20 text-border-strong ${className ?? ''}`} aria-hidden="true">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  )
}

const promises = ['Built on the tools you already use', 'You own everything we ship', 'Live in 2–4 weeks']

/*
 * #6 — the "graveyard" of manual work, editorial style.
 * A numbered list of the tasks your team does by hand; expand one to see how
 * it gets automated. Content adapts to the selected industry.
 */
export function GraveyardSection() {
  const sectionRef = useReveal<HTMLElement>()
  const { content } = useIndustry()
  const [open, setOpen] = useState<number | null>(0)
  const totalHours = content.deadWorkflows.reduce((sum, w) => sum + w.hoursPerWeek, 0)

  return (
    <section className="section-shell" id="graveyard" ref={sectionRef}>
      <div className="glass-card relative overflow-hidden">
        <PlusMark className="left-2.5 top-2.5" />
        <PlusMark className="right-2.5 top-2.5" />
        <PlusMark className="bottom-2.5 left-2.5" />
        <PlusMark className="bottom-2.5 right-2.5" />

        {/* header */}
        <div data-reveal className="relative grid gap-10 border-b border-border p-7 md:grid-cols-[1.25fr_0.75fr] md:p-12">
          <PlusMark className="bottom-0 left-2.5 -translate-y-1/2" />
          <PlusMark className="bottom-0 right-2.5 -translate-y-1/2" />
          <div>
            <h2 className="max-w-md text-4xl font-semibold leading-[1.04] tracking-tight text-heading md:text-[3.25rem]">
              Put your busywork <span className="serif text-[1.06em] font-normal">to rest.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-muted">
              The repetitive tasks your team still does by hand — and the hours they quietly cost
              every single week.
            </p>
          </div>

          {/* abstract "tasks, handled" graphic */}
          <div className="relative flex items-center md:justify-end">
            <div className="relative w-full max-w-[15rem]">
              <div className="space-y-2.5">
                <div className="h-9 rounded-full border border-border bg-surface-2" />
                <div className="flex h-14 flex-col justify-center gap-2 rounded-2xl border border-border-strong bg-surface-2 px-4 shadow-sm">
                  <span className="h-1.5 w-3/4 rounded-full bg-border-strong" />
                  <span className="h-1.5 w-1/2 rounded-full bg-border" />
                </div>
                <div className="h-7 w-2/3 rounded-full border border-border bg-surface-2" />
              </div>
              <span className="absolute -left-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-heading text-bg">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* body: intro + numbered list */}
        <div className="grid md:grid-cols-[0.82fr_1.18fr]">
          <div data-reveal className="relative border-b border-border p-7 md:border-b-0 md:border-r md:p-10">
            <h3 className="text-lg font-semibold tracking-tight text-heading">Ready to retire these?</h3>
            <p className="mt-3 max-w-xs text-sm leading-7 text-muted">
              We automate them on top of your existing stack — usually within a few weeks.
            </p>
            <ul className="mt-7 space-y-3.5">
              {promises.map((promise) => (
                <li key={promise} className="flex items-center gap-3 text-sm text-text">
                  <span className="grid size-5 place-items-center rounded-full border border-border-strong text-heading">
                    <svg className="size-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 13l4 4L20 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {promise}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-heading px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-90"
            >
              Automate these
              <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div data-reveal>
            {content.deadWorkflows.map((workflow, i) => {
              const isOpen = open === i
              return (
                <div key={workflow.task} className="border-b border-border last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-bg"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-md bg-bg font-sans text-sm tabular-nums text-muted">
                      {i + 1}
                    </span>
                    <span className="flex-1 font-medium leading-snug text-heading">{workflow.task}</span>
                    <span className="shrink-0 font-sans text-sm tabular-nums text-muted">
                      {workflow.hoursPerWeek}h / wk
                    </span>
                    <svg
                      className={`size-4 shrink-0 text-muted transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="pb-5 pl-[3.5rem] pr-6">
                        <p className="text-sm leading-7 text-muted">
                          <span className="serif text-base text-muted">automated —&nbsp;</span>
                          {workflow.automated}
                        </p>
                        <p className="mt-2 text-xs font-medium tracking-wide text-brand">
                          SAVES ~{workflow.hoursPerWeek}H EVERY WEEK
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="px-6 py-4 text-right">
              <span className="font-sans text-sm text-muted">
                ~<span className="tabular-nums text-text">{totalHours}h</span> buried every week
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
