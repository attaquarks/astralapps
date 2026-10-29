import { useState } from 'react'
import { auditBusiness, type Audit } from '../../../lib/api'
import { Button } from '../../ui/Button'
import { Tag } from '../../ui/Tag'

type Status = 'idle' | 'loading' | 'done' | 'error'

/*
 * Channel SIG·02 — the instant business audit. Paste a website; the AI returns
 * the workflows most likely done by hand, with their hours. Same endpoint and
 * demo-preview fallback as before.
 */
export function AuditChannel() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [audit, setAudit] = useState<Audit | null>(null)
  const [error, setError] = useState('')

  async function run() {
    if (url.trim().length < 3 || status === 'loading') return
    setStatus('loading')
    setError('')
    try {
      setAudit(await auditBusiness(url.trim()))
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setStatus('error')
    }
  }

  const totalHours = audit?.opportunities.reduce((sum, o) => sum + (o.hoursPerWeek || 0), 0) ?? 0

  return (
    <div className="channel flex h-full flex-col p-6 md:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="data text-[0.7rem] uppercase tracking-[0.18em] text-muted">SIG·02 — Audit</span>
        {audit?.demo && <Tag>demo preview</Tag>}
      </div>
      <h3 className="mt-3 text-2xl">Point it at your website.</h3>
      <p className="mt-2 text-sm leading-7 text-muted">
        Our AI reads your site and returns the workflows you're most likely doing by hand — with
        the hours they're costing you.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          void run()
        }}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <div className="field flex flex-1 items-center gap-1.5 py-0">
          <span className="data text-sm text-muted">https://</span>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourcompany.com"
            aria-label="Your website URL"
            className="w-full bg-transparent py-2.5 text-base text-heading outline-none placeholder:text-muted"
          />
        </div>
        <Button type="submit" disabled={status === 'loading'} withArrow={status !== 'loading'}>
          {status === 'loading' ? 'Auditing…' : 'Run the audit'}
        </Button>
      </form>

      <div className="mt-5 flex-1">
        {status === 'loading' && (
          <div className="border border-border bg-surface p-5">
            <div className="flex items-center gap-2.5">
              <span className="mark-punched size-2 animate-pulse" aria-hidden="true" />
              <span className="data text-sm text-brand">scanning your site…</span>
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

        {status === 'done' && audit && (
          <div className="animate-pop border border-border bg-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="data flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-brand">
                  <span className="inline-block size-1.5 bg-brand" aria-hidden="true" />
                  opportunities_report
                </span>
                <h4 className="mt-2 font-display text-lg font-semibold normal-case text-heading">
                  {audit.company}
                </h4>
              </div>
              <div className="text-right">
                <div className="data text-2xl font-medium text-brand">~{totalHours}h</div>
                <div className="text-xs text-muted">manual / week</div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">{audit.summary}</p>

            <ul className="mt-4 space-y-3">
              {audit.opportunities.map((opp, i) => (
                <li key={i} className="border border-border bg-bg p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h5 className="font-display text-base font-semibold normal-case text-heading">
                      {opp.title}
                    </h5>
                    <span className="data shrink-0 text-xs text-brand">~{opp.hoursPerWeek}h/wk</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{opp.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {opp.tools.map((t) => (
                      <span key={t} className="data border border-border px-2 py-0.5 text-xs text-text">
                        {t}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                {audit.demo ? 'Demo preview — add an API key for a live audit.' : 'Want these handled for you?'}
              </p>
              <Button href="#contact" withArrow>
                Book a call
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
