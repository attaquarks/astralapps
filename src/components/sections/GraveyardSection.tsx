import { useIndustry } from '../../context/IndustryContext'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeader } from '../ui/SectionHeader'

/*
 * #6 — Dead Workflow Graveyard. Headstones for the manual tasks that are
 * burning hours. Hover (or focus) a stone to see the automated version.
 * Content adapts to the selected industry.
 */
export function GraveyardSection() {
  const sectionRef = useReveal<HTMLElement>()
  const { content } = useIndustry()
  const totalHours = content.deadWorkflows.reduce((sum, w) => sum + w.hoursPerWeek, 0)

  return (
    <section className="section-shell" id="graveyard" ref={sectionRef}>
      <SectionHeader
        align="center"
        eyebrow="The workflow graveyard"
        title="Here lies the work nobody should still do by hand."
        description={`These manual tasks bury about ${totalHours} hours of your team's week. Hover a headstone to see it automated.`}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.deadWorkflows.map((workflow) => (
          <article
            key={workflow.task}
            data-reveal
            tabIndex={0}
            className="group relative min-h-60 overflow-hidden rounded-b-xl rounded-t-[2.5rem] border border-border bg-[linear-gradient(180deg,var(--surface-2),var(--surface))] p-6 text-center outline-none transition-colors hover:border-border-strong focus-visible:border-border-strong"
          >
            {/* manual (default) */}
            <div className="flex h-full flex-col items-center transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted">R.I.P.</span>
              <div className="my-4 h-px w-8 bg-border" />
              <p className="text-sm leading-6 text-text line-through decoration-muted/60">{workflow.task}</p>
              <div className="mt-auto pt-5">
                <div className="font-mono text-2xl font-semibold tabular-nums text-muted">
                  {workflow.hoursPerWeek}h
                </div>
                <div className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">buried / week</div>
              </div>
            </div>

            {/* automated (on hover) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand)_18%,transparent),transparent)] p-6 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="grid size-9 place-items-center rounded-full border border-[color-mix(in_srgb,var(--accent)_50%,transparent)] text-brand-soft">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 13l4 4L20 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="mt-3 text-sm leading-6 text-heading">{workflow.automated}</p>
              <span className="mt-3 font-mono text-[0.65rem] uppercase tracking-wider text-brand-soft">
                now automatic
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
