/*
 * Tiny looping "the automation actually working" demos for the service
 * channels. Recessed instrument screens with signal motion — CSS only,
 * respects reduced motion.
 */
export type DemoKind = 'fill' | 'route' | 'bars' | 'chat'

function FillDemo() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {['Name', 'Email', 'Stage'].map((field, i) => (
        <div key={field} className="flex items-center gap-2.5">
          <span className="data w-11 shrink-0 text-[0.6rem] uppercase tracking-wide text-muted">
            {field}
          </span>
          <div className="h-1.5 flex-1 overflow-hidden bg-border">
            <span
              className="anim-fill block h-full bg-brand"
              style={{ animationDelay: `${i * 0.45}s` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function RouteDemo() {
  return (
    <div className="relative flex h-full items-center justify-between px-1">
      <span className="absolute left-[14%] right-[14%] top-1/2 h-px -translate-y-1/2 bg-border-strong" />
      <span className="anim-travel absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 bg-accent" />
      {['Form', 'AI', 'Slack'].map((node) => (
        <span
          key={node}
          className="data relative z-10 border border-border-strong bg-surface-2 px-2 py-1 text-[0.6rem] uppercase text-heading"
        >
          {node}
        </span>
      ))}
    </div>
  )
}

function BarsDemo() {
  return (
    <div className="flex h-full items-end justify-center gap-2 pb-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="anim-bar w-3.5 bg-brand"
          style={{ height: '78%', animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  )
}

function ChatDemo() {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <span className="data self-end border border-border bg-surface-2 px-2.5 py-1 text-[0.65rem] text-heading">
        Can we reschedule?
      </span>
      <div className="data self-start border border-border-strong bg-surface-2 px-2.5 py-2">
        <div className="h-1.5 w-16 overflow-hidden bg-border">
          <span className="anim-fill block h-full bg-brand" />
        </div>
      </div>
    </div>
  )
}

export function ServiceDemo({ kind }: { kind: DemoKind }) {
  return (
    <div className="relative h-24 overflow-hidden border border-border bg-bg p-3">
      {kind === 'fill' && <FillDemo />}
      {kind === 'route' && <RouteDemo />}
      {kind === 'bars' && <BarsDemo />}
      {kind === 'chat' && <ChatDemo />}
    </div>
  )
}
