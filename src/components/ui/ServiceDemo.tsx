/*
 * Tiny looping "the automation actually working" demos for the service cards (#8).
 * No screenshots — moving mock UI. All animation is CSS (respects reduced-motion).
 */
export type DemoKind = 'fill' | 'route' | 'bars' | 'chat'

function FillDemo() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      {['Name', 'Email', 'Stage'].map((field, i) => (
        <div key={field} className="flex items-center gap-2">
          <span className="w-12 shrink-0 font-mono text-[0.6rem] uppercase text-muted">{field}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
            <span
              className="anim-fill block h-full rounded-full bg-[linear-gradient(90deg,var(--brand),var(--accent))]"
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
      <span className="absolute left-[12%] right-[12%] top-1/2 h-px -translate-y-1/2 bg-border" />
      <span className="anim-travel absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--glow)]" />
      {['Form', 'AI', 'Slack'].map((node) => (
        <span
          key={node}
          className="relative z-10 rounded-md border border-border bg-surface px-2 py-1 font-mono text-[0.6rem] text-text"
        >
          {node}
        </span>
      ))}
    </div>
  )
}

function BarsDemo() {
  return (
    <div className="flex h-full items-end justify-center gap-1.5 pb-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="anim-bar w-3 rounded-t bg-[linear-gradient(180deg,var(--brand-soft),var(--accent))]"
          style={{ height: '72%', animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  )
}

function ChatDemo() {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <span className="self-end rounded-lg rounded-br-sm bg-surface px-2.5 py-1 text-[0.65rem] text-text">
        Can we reschedule?
      </span>
      <div className="self-start rounded-lg rounded-bl-sm border border-border bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] px-2.5 py-1.5">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface">
          <span className="anim-fill block h-full rounded-full bg-brand-soft" />
        </div>
      </div>
    </div>
  )
}

export function ServiceDemo({ kind }: { kind: DemoKind }) {
  return (
    <div className="signal-grid relative h-24 overflow-hidden rounded-xl border border-border bg-bg p-3">
      {kind === 'fill' && <FillDemo />}
      {kind === 'route' && <RouteDemo />}
      {kind === 'bars' && <BarsDemo />}
      {kind === 'chat' && <ChatDemo />}
    </div>
  )
}
