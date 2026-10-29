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

/*
 * The study request: the primary action of the whole plot. Describe the work;
 * the AI returns the blueprint live. Logic unchanged — same endpoint, same
 * demo-preview fallback.
 */
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
        <div className="channel flex items-stretch gap-2 p-2 transition-colors focus-within:border-border-strong">
          <span className="data hidden select-none items-center border-r border-border pr-3 pl-2 text-[0.68rem] uppercase tracking-[0.14em] text-muted sm:flex">
            SIG·01
          </span>
          <div className="relative flex-1">
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
              className="block w-full resize-none bg-transparent px-3 py-2.5 text-base leading-7 text-heading outline-none"
            />
            {task === '' && (
              <div className="pointer-events-none absolute inset-x-0 top-0 px-3 py-2.5 text-base leading-7 text-muted">
                {focused ? (
                  <span className="opacity-80">Describe a task your team does by hand every week…</span>
                ) : (
                  <Typewriter phrases={examples} className="text-muted" />
                )}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={status === 'loading' || task.trim().length < 5}
            aria-label="Build automation blueprint"
            className="grid min-h-11 shrink-0 place-items-center self-stretch bg-heading px-5 text-bg transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === 'loading' ? (
              <span className="size-4 animate-spin rounded-full border-2 border-bg/40 border-t-bg" />
            ) : (
              <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.08em]">
                Run
                <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="data text-xs uppercase tracking-[0.14em] text-muted">Try:</span>
          {examples.slice(0, 2).map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setTask(example)}
              className="data truncate border border-border px-3 py-1 text-xs text-muted transition hover:border-border-strong hover:text-heading"
            >
              {example.length > 52 ? `${example.slice(0, 52)}…` : example}
            </button>
          ))}
        </div>
      </form>

      {/* Result area — renders in-band, right under the request */}
      {status !== 'idle' && (
        <div className="mt-5">
          {status === 'loading' && (
            <div className="channel p-6">
              <div className="flex items-center gap-2.5">
                <span className="mark-punched size-2 animate-pulse" aria-hidden="true" />
                <span className="data text-sm text-brand">running the study…</span>
              </div>
              <div className="mt-4 space-y-2">
                {loadingLines.map((line, i) => (
                  <div
                    key={line}
                    className="data animate-pop text-sm text-muted"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    <span className="mr-2 inline-block size-1.5 bg-brand" aria-hidden="true" />
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {status === 'done' && blueprint && <BlueprintResult blueprint={blueprint} onReset={reset} />}

          {status === 'error' && (
            <div className="channel p-6">
              <p className="text-sm text-accent" role="alert">
                {error}
              </p>
              <button
                type="button"
                onClick={() => void submit()}
                className="mt-3 text-sm font-medium text-brand hover:text-heading"
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
