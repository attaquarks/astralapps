import { useState } from 'react'
import { buildAutomation, type Blueprint } from '../../lib/api'
import { industries } from '../../data/industries'
import { useIndustry } from '../../context/IndustryContext'
import { Typewriter } from '../ui/Typewriter'
import { BlueprintResult } from './BlueprintResult'

type Status = 'idle' | 'loading' | 'done' | 'error'

const genericExamples = [
  'When a lead fills out our form, qualify it with AI and route hot ones to Slack',
  'Every Friday, compile our key metrics into a report and email it to the team',
  'When an invoice arrives by email, extract the line items and enter them into our books',
]

const loadingLines = ['analyzing the task', 'mapping the workflow', 'estimating time saved & cost']

export function AutomationBuilder() {
  const { content, industryId } = useIndustry()
  const industryName = industries.find((i) => i.id === industryId)?.label

  const [task, setTask] = useState('')
  const [focused, setFocused] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null)
  const [error, setError] = useState('')

  const examples = [content.builderPlaceholder.replace(/^e\.g\.\s*/i, ''), ...genericExamples].slice(0, 4)

  async function submit() {
    const trimmed = task.trim()
    if (trimmed.length < 5 || status === 'loading') return
    setStatus('loading')
    setError('')
    try {
      const result = await buildAutomation(trimmed, industryName)
      setBlueprint(result)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  function reset() {
    setStatus('idle')
    setBlueprint(null)
    setTask('')
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void submit()
        }}
      >
        <div className="relative rounded-2xl border border-border-strong bg-surface-2 p-1.5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-colors focus-within:border-[color-mix(in_srgb,var(--brand)_55%,transparent)]">
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void submit()
              }
            }}
            rows={2}
            aria-label="Describe a manual task your team does every week"
            className="block w-full resize-none bg-transparent px-4 py-3.5 pr-14 text-lg leading-7 text-heading outline-none"
          />

          {task === '' && (
            <div className="pointer-events-none absolute inset-x-0 top-0 px-5 py-[0.95rem] text-lg leading-7 text-muted">
              {focused ? (
                <span className="opacity-70">Describe a task your team does by hand every week…</span>
              ) : (
                <Typewriter phrases={examples} className="text-muted" />
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || task.trim().length < 5}
            aria-label="Build automation blueprint"
            className="absolute bottom-2.5 right-2.5 grid size-10 place-items-center rounded-xl bg-heading text-bg transition hover:opacity-90 disabled:opacity-40"
          >
            {status === 'loading' ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
              <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted">Try:</span>
          {examples.slice(0, 2).map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setTask(example)}
              className="truncate rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted transition hover:border-border-strong hover:text-heading"
            >
              {example.length > 52 ? `${example.slice(0, 52)}…` : example}
            </button>
          ))}
        </div>
      </form>

      {/* Result area */}
      {status !== 'idle' && (
        <div className="mt-5">
          {status === 'loading' && (
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <span className="live-dot size-2 rounded-full bg-accent" />
                <span className="font-mono text-sm text-brand-soft">building your blueprint…</span>
              </div>
              <div className="mt-4 space-y-2">
                {loadingLines.map((line, i) => (
                  <div
                    key={line}
                    className="animate-pop font-mono text-sm text-muted"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    ▸ {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {status === 'done' && blueprint && <BlueprintResult blueprint={blueprint} onReset={reset} />}

          {status === 'error' && (
            <div className="glass-card rounded-2xl p-6">
              <p className="text-sm text-rose-300">{error}</p>
              <button
                type="button"
                onClick={() => void submit()}
                className="mt-3 text-sm font-medium text-brand-soft hover:text-heading"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
