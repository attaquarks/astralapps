import { liveMetrics } from '../../data/site'
import { liveEvents } from '../../data/liveEvents'
import { useReveal } from '../../hooks/useReveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'
import { AuditChannel } from './tools/AuditChannel'
import { ScopeChannel } from './tools/ScopeChannel'

function TickerGroup() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
      {liveEvents.map((event) => (
        <span key={event.tool + event.event} className="data flex items-center gap-2 whitespace-nowrap text-xs">
          <span className="size-1.5 shrink-0 bg-brand" />
          <span className="text-heading">{event.tool}</span>
          <span className="text-muted">· {event.event}</span>
        </span>
      ))}
    </div>
  )
}

/*
 * CH 02 — FIRST SIGNAL. The console. Two live AI channels fire here, and the
 * meters report the studio's state (honestly labeled illustrative until real
 * numbers exist).
 */
export function ConsoleCue() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section id="proof" data-cue="02" className="band wash-iris" ref={sectionRef}>
      <div className="shell">
        <SectionHeader
          title="The console. Fire a channel, watch it run."
          description="Two of the studio's actual tools, live on this page. No forms that go nowhere — the same AI we build client systems with, answering you right now."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:items-start">
          <div data-reveal>
            <AuditChannel />
          </div>
          <div data-reveal>
            <ScopeChannel />
          </div>
        </div>

        {/* Meters — the studio's dashboard strip */}
        <div data-reveal className="channel mt-14">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
            <span className="data flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-muted">
              <span className="mark-punched size-1.5 animate-pulse" aria-hidden="true" />
              In production right now
            </span>
            <Tag>illustrative — demo data</Tag>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-5 py-6 md:grid-cols-4">
            {liveMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="data text-3xl font-medium text-heading md:text-4xl">{metric.value}</div>
                <div className="mt-1 text-sm text-muted">{metric.label}</div>
              </div>
            ))}
          </div>
          <div className="overflow-hidden border-t border-border px-5 py-3.5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="marquee-track">
              <TickerGroup />
              <TickerGroup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
