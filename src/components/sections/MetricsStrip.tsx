import { liveMetrics } from '../../data/site'
import { liveEvents } from '../../data/liveEvents'

function TickerGroup() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
      {liveEvents.map((event) => (
        <span key={event.tool + event.event} className="flex items-center gap-2 whitespace-nowrap">
          <span className="size-1.5 rounded-full bg-accent/70" />
          <span className="font-mono text-xs text-muted">
            <span className="text-brand-soft">{event.tool}</span> · {event.event}
          </span>
        </span>
      ))}
    </div>
  )
}

/* #17 — "In production right now" trust strip + a live event ticker (#9). */
export function MetricsStrip() {
  return (
    <section aria-label="Live metrics" className="relative border-y border-border bg-surface/40 py-8">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center gap-2">
          <span className="live-dot size-2 rounded-full bg-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            In production right now
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
          {liveMetrics.map((metric) => (
            <div key={metric.label}>
              <div className="font-display text-3xl font-semibold tabular-nums text-gradient md:text-4xl">
                {metric.value}
              </div>
              <div className="mt-1 text-sm text-muted">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 overflow-hidden border-t border-border pt-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track">
          <TickerGroup />
          <TickerGroup />
        </div>
      </div>
    </section>
  )
}
