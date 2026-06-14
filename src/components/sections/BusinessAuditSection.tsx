import { useState } from 'react'
import { auditBusiness, type Audit } from '../../lib/api'
import { useReveal } from '../../hooks/useReveal'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

type Status = 'idle' | 'loading' | 'done' | 'error'

export function BusinessAuditSection() {
  const sectionRef = useReveal<HTMLElement>()
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
    <section className="section-shell" id="audit" ref={sectionRef}>
      <SectionHeader
        align="center"
        eyebrow="Instant business audit"
        title="Paste your website. See what you could automate."
        description="Our AI reads your site and returns the workflows you're most likely doing by hand — with the hours they're costing you."
      />

      <div data-reveal className="mx-auto mt-10 max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void run()
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-border-strong bg-surface-2 px-4 py-1 backdrop-blur-xl focus-within:border-[color-mix(in_srgb,var(--brand)_55%,transparent)]">
            <span className="font-mono text-sm text-muted">https://</span>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourcompany.com"
              aria-label="Your website URL"
              className="w-full bg-transparent py-2.5 text-base text-heading outline-none placeholder:text-muted"
            />
          </div>
          <Button type="submit" size="lg" withArrow={status !== 'loading'} disabled={status === 'loading'}>
            {status === 'loading' ? 'Auditing…' : 'Run the audit'}
          </Button>
        </form>

        {status === 'loading' && (
          <div className="glass-card mt-5 rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <span className="live-dot size-2 rounded-full bg-accent" />
              <span className="font-mono text-sm text-brand-soft">scanning your site…</span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="glass-card mt-5 rounded-2xl p-6">
            <p className="text-sm text-rose-300">{error}</p>
          </div>
        )}
      </div>

      {status === 'done' && audit && (
        <div className="animate-pop mx-auto mt-6 max-w-3xl">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-soft">
                  ▸ opportunities_report
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-heading">{audit.company}</h3>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-semibold tabular-nums text-gradient">~{totalHours}h</div>
                <div className="text-xs text-muted">manual / week</div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">{audit.summary}</p>

            <div className="mt-6 space-y-3">
              {audit.opportunities.map((opp, i) => (
                <div key={i} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-display font-semibold text-heading">{opp.title}</h4>
                    <span className="shrink-0 rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-brand-soft">
                      ~{opp.hoursPerWeek}h/wk
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-6 text-muted">{opp.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {opp.tools.map((t) => (
                      <span key={t} className="rounded-md border border-border bg-bg px-2 py-0.5 font-mono text-xs text-text">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                {audit.demo ? 'Demo preview — add an API key for a live audit.' : 'Want these handled for you?'}
              </p>
              <Button href="#contact" withArrow>
                Book a call
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
