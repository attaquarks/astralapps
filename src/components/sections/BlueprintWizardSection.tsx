import { useState } from 'react'
import { generateScope, type Scope } from '../../lib/api'
import { industries } from '../../data/industries'
import { useIndustry } from '../../context/IndustryContext'
import { useReveal } from '../../hooks/useReveal'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

type Status = 'idle' | 'loading' | 'done' | 'error'

const teamSizes = ['1–5', '6–20', '21–50', '50+']
const urgencies = ['ASAP', 'This quarter', 'Just exploring']

const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

function PillGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
            value === opt
              ? 'border-[color-mix(in_srgb,var(--brand)_55%,transparent)] bg-[color-mix(in_srgb,var(--brand)_14%,transparent)] text-heading'
              : 'border-border text-muted hover:border-border-strong hover:text-heading'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export function BlueprintWizardSection() {
  const sectionRef = useReveal<HTMLElement>()
  const { content } = useIndustry()

  const [industry, setIndustry] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [timeDrain, setTimeDrain] = useState('')
  const [urgency, setUrgency] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [scope, setScope] = useState<Scope | null>(null)
  const [error, setError] = useState('')

  async function submit() {
    if (timeDrain.trim().length < 3 || status === 'loading') return
    setStatus('loading')
    setError('')
    try {
      setScope(await generateScope({ industry, teamSize, timeDrain: timeDrain.trim(), urgency }))
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <section className="section-shell" id="blueprint" ref={sectionRef}>
      <SectionHeader
        eyebrow="Your blueprint in 60 seconds"
        title="Four questions. A real project scope."
        description="Answer four quick questions and our AI drafts what we'd build, how long it'd take, and a rough price — a real document you can act on."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
        <form
          data-reveal
          onSubmit={(e) => {
            e.preventDefault()
            void submit()
          }}
          className="glass-card rounded-2xl p-6 md:p-7"
        >
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">1 · Industry</span>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-heading outline-none focus:border-[color-mix(in_srgb,var(--brand)_55%,transparent)]"
            >
              <option value="">Select…</option>
              {industries.map((i) => (
                <option key={i.id} value={i.label}>
                  {i.label}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </label>

          <div className="mt-5">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">2 · Team size</span>
            <div className="mt-2">
              <PillGroup options={teamSizes} value={teamSize} onChange={setTeamSize} />
            </div>
          </div>

          <label className="mt-5 block">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">3 · Biggest time-drain</span>
            <input
              value={timeDrain}
              onChange={(e) => setTimeDrain(e.target.value)}
              placeholder={content.builderPlaceholder.replace(/^e\.g\.\s*/i, '')}
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-heading outline-none placeholder:text-muted focus:border-[color-mix(in_srgb,var(--brand)_55%,transparent)]"
            />
          </label>

          <div className="mt-5">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">4 · Urgency</span>
            <div className="mt-2">
              <PillGroup options={urgencies} value={urgency} onChange={setUrgency} />
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" size="lg" withArrow={status !== 'loading'} disabled={status === 'loading'} className="w-full">
              {status === 'loading' ? 'Drafting your scope…' : 'Generate my scope'}
            </Button>
          </div>
        </form>

        <div data-reveal>
          {status === 'idle' && (
            <div className="grid h-full place-items-center rounded-2xl border border-dashed border-border p-8 text-center">
              <p className="max-w-xs text-sm leading-7 text-muted">
                Your scope document will appear here — deliverables, timeline, and a rough price range.
              </p>
            </div>
          )}
          {status === 'loading' && (
            <div className="glass-card grid h-full place-items-center rounded-2xl p-8">
              <div className="flex items-center gap-2">
                <span className="live-dot size-2 rounded-full bg-accent" />
                <span className="font-mono text-sm text-brand-soft">drafting your scope…</span>
              </div>
            </div>
          )}
          {status === 'error' && (
            <div className="glass-card rounded-2xl p-6">
              <p className="text-sm text-rose-300">{error}</p>
            </div>
          )}
          {status === 'done' && scope && (
            <div className="glass-card animate-pop rounded-2xl p-6 md:p-7">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-soft">▸ project_scope</span>
              <p className="mt-3 leading-7 text-text">{scope.summary}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="font-mono text-lg font-semibold tabular-nums text-gradient">
                    {scope.timelineWeeks.min}–{scope.timelineWeeks.max} wks
                  </div>
                  <div className="mt-1 text-xs text-muted">timeline</div>
                </div>
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="font-mono text-lg font-semibold tabular-nums text-heading">
                    {usd(scope.priceRangeUsd.min)}–{usd(scope.priceRangeUsd.max)}
                  </div>
                  <div className="mt-1 text-xs text-muted">rough range</div>
                </div>
              </div>

              <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">Deliverables</p>
              <ul className="mt-2 space-y-2">
                {scope.deliverables.map((d) => (
                  <li key={d} className="flex gap-2 text-sm leading-6 text-text">
                    <svg className="mt-1 size-3.5 shrink-0 text-brand-soft" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 13l4 4L20 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-border bg-[color-mix(in_srgb,var(--brand)_10%,transparent)] p-4">
                <span className="font-mono text-xs uppercase tracking-wide text-muted">First step</span>
                <p className="mt-1 text-sm text-heading">{scope.firstStep}</p>
              </div>

              <div className="mt-6">
                <Button href="#contact" withArrow className="w-full">
                  Want us to build this? Pick a time
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
