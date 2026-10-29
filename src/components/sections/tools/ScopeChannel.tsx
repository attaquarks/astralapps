import { useState } from 'react'
import { generateScope, type Scope } from '../../../lib/api'
import { industries } from '../../../data/industries'
import { useIndustry } from '../../../context/IndustryContext'
import { Button } from '../../ui/Button'
import { Tag } from '../../ui/Tag'

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
          aria-pressed={value === opt}
          className={`border px-3.5 py-1.5 text-sm transition ${
            value === opt
              ? 'border-border-strong bg-heading text-bg'
              : 'border-border text-muted hover:border-border-strong hover:text-heading'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

/*
 * Channel SIG·03 — the blueprint wizard. Four questions; a real project scope
 * document with deliverables, timeline, and a rough price. Same endpoint and
 * demo-preview fallback as before.
 */
export function ScopeChannel() {
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

  const questionLabel = 'data block text-[0.7rem] uppercase tracking-[0.18em] text-muted'

  return (
    <div className="channel flex h-full flex-col p-6 md:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="data text-[0.7rem] uppercase tracking-[0.18em] text-muted">SIG·03 — Scope</span>
        {scope?.demo && <Tag>demo preview</Tag>}
      </div>
      <h3 className="mt-3 text-2xl">Four questions. A real scope.</h3>
      <p className="mt-2 text-sm leading-7 text-muted">
        Answer four quick questions and our AI drafts what we'd build, how long it'd take, and a
        rough price — a real document you can act on.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void submit()
        }}
        className="mt-5 flex flex-col gap-5"
      >
        <label className="block">
          <span className={questionLabel}>1 · Industry</span>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="field mt-2 py-2.5"
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

        <div>
          <span className={questionLabel}>2 · Team size</span>
          <div className="mt-2">
            <PillGroup options={teamSizes} value={teamSize} onChange={setTeamSize} />
          </div>
        </div>

        <label className="block">
          <span className={questionLabel}>3 · Biggest time-drain</span>
          <input
            value={timeDrain}
            onChange={(e) => setTimeDrain(e.target.value)}
            placeholder={content.builderPlaceholder.replace(/^e\.g\.\s*/i, '')}
            className="field mt-2"
          />
        </label>

        <div>
          <span className={questionLabel}>4 · Urgency</span>
          <div className="mt-2">
            <PillGroup options={urgencies} value={urgency} onChange={setUrgency} />
          </div>
        </div>

        <Button type="submit" disabled={status === 'loading'} withArrow={status !== 'loading'} className="w-full">
          {status === 'loading' ? 'Drafting your scope…' : 'Generate my scope'}
        </Button>
      </form>

      <div className="mt-5 flex-1">
        {status === 'idle' && (
          <div className="grid h-full place-items-center border border-dashed border-border p-6 text-center">
            <p className="max-w-xs text-sm leading-7 text-muted">
              Your scope document appears here — deliverables, timeline, and a rough price range.
            </p>
          </div>
        )}
        {status === 'loading' && (
          <div className="grid h-full place-items-center border border-border bg-surface p-6">
            <div className="flex items-center gap-2.5">
              <span className="mark-punched size-2 animate-pulse" aria-hidden="true" />
              <span className="data text-sm text-brand">drafting your scope…</span>
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className="border border-border bg-surface p-5">
            <p className="text-sm text-accent" role="alert">
              {error}
            </p>
          </div>
        )}
        {status === 'done' && scope && (
          <div className="animate-pop border border-border bg-surface p-5">
            <span className="data flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-brand">
              <span className="inline-block size-1.5 bg-brand" aria-hidden="true" />
              project_scope
            </span>
            <p className="mt-3 leading-7 text-text">{scope.summary}</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="border border-border bg-bg p-4">
                <div className="data text-lg font-medium text-brand">
                  {scope.timelineWeeks.min}–{scope.timelineWeeks.max} wks
                </div>
                <div className="mt-1 text-xs text-muted">timeline</div>
              </div>
              <div className="border border-border bg-bg p-4">
                <div className="data text-lg font-medium text-heading">
                  {usd(scope.priceRangeUsd.min)}–{usd(scope.priceRangeUsd.max)}
                </div>
                <div className="mt-1 text-xs text-muted">rough range</div>
              </div>
            </div>

            <p className={`${questionLabel} mt-5`}>Deliverables</p>
            <ul className="mt-2 space-y-2">
              {scope.deliverables.map((d) => (
                <li key={d} className="flex gap-2.5 text-sm leading-6 text-text">
                  <span className="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-5 border border-border-strong bg-bg p-4">
              <span className={questionLabel}>First step</span>
              <p className="mt-1 text-sm text-heading">{scope.firstStep}</p>
            </div>

            <div className="mt-5">
              <Button href="#contact" withArrow className="w-full">
                Want us to build this? Pick a time
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
