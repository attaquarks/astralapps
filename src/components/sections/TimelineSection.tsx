import { useIndustry } from '../../context/IndustryContext'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeader } from '../ui/SectionHeader'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

/*
 * #7 — Side-by-side live timeline. The same Mon–Fri, with and without
 * automation. The right column is basically empty by Tuesday.
 */
export function TimelineSection() {
  const sectionRef = useReveal<HTMLElement>()
  const { content } = useIndustry()

  const rows = days.map((day, i) => ({
    day,
    manual: content.deadWorkflows[i]?.task ?? 'Overflow from everything earlier in the week',
    hours: content.deadWorkflows[i]?.hoursPerWeek ?? 4,
    auto: i === 0 ? 'Approve the few exceptions the AI flagged' : 'Free — focus on clients, strategy & growth',
  }))

  return (
    <section className="section-shell" id="timeline" ref={sectionRef}>
      <SectionHeader
        align="center"
        eyebrow="A week, two ways"
        title="Same week. One team drowning, one team shipping."
        description="Watch what your team's Monday-to-Friday looks like once the busywork runs itself."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {/* Without */}
        <div data-reveal className="rounded-2xl border border-border bg-surface p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="size-2 rounded-full bg-rose-400/80" />
            <h3 className="font-display font-semibold text-heading">Without automation</h3>
          </div>
          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row.day} className="flex items-center gap-3 rounded-xl border border-border bg-bg p-3">
                <span className="w-9 shrink-0 font-mono text-xs uppercase text-muted">{row.day}</span>
                <span className="flex-1 text-sm text-text">{row.manual}</span>
                <span className="shrink-0 font-mono text-xs text-rose-300/90">{row.hours}h</span>
              </div>
            ))}
          </div>
        </div>

        {/* With */}
        <div data-reveal className="rounded-2xl border border-[color-mix(in_srgb,var(--brand)_30%,transparent)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--brand)_10%,transparent),transparent)] p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="live-dot size-2 rounded-full bg-accent" />
            <h3 className="font-display font-semibold text-heading">With automation</h3>
          </div>
          <div className="space-y-2">
            {rows.map((row, i) => (
              <div
                key={row.day}
                className={`flex items-center gap-3 rounded-xl border border-border p-3 ${i === 0 ? 'bg-surface' : 'bg-transparent'}`}
              >
                <span className="w-9 shrink-0 font-mono text-xs uppercase text-muted">{row.day}</span>
                <span className={`flex-1 text-sm ${i === 0 ? 'text-text' : 'text-brand-soft'}`}>{row.auto}</span>
                <svg className="size-4 shrink-0 text-brand-soft" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 13l4 4L20 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
