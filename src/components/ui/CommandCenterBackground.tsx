import { feedPayloads } from '../../data/liveEvents'

/* One slowly-scrolling column of blurred JSON. Content is duplicated so the
   translateY(-50%) loop is seamless. */
function FeedColumn({ offset, style }: { offset: number; style: React.CSSProperties }) {
  // rotate the payloads so columns don't read identically
  const items = [...feedPayloads.slice(offset), ...feedPayloads.slice(0, offset)]
  const lines = [...items, ...items]
  return (
    <div className="animate-feed flex flex-col gap-4" style={style}>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block whitespace-nowrap font-mono text-[11px] leading-relaxed text-brand-soft"
        >
          {line}
        </span>
      ))}
    </div>
  )
}

const columns = [
  { left: '4%', offset: 0, duration: '52s', delay: '0s' },
  { left: '30%', offset: 3, duration: '67s', delay: '-15s' },
  { left: '58%', offset: 6, duration: '46s', delay: '-28s' },
  { left: '83%', offset: 9, duration: '60s', delay: '-8s' },
]

/*
 * Persistent "running system" backdrop behind the whole app (#9/#10/#11):
 * a faint signal grid + columns of blurred webhook/JSON logs. Decorative only.
 */
export function CommandCenterBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="signal-grid absolute inset-0 opacity-70" />

      <div className="absolute inset-0 opacity-[0.16] blur-[1.5px]">
        {columns.map((column) => (
          <div key={column.left} className="absolute top-0 h-[200%]" style={{ left: column.left }}>
            <FeedColumn
              offset={column.offset}
              style={{ animationDuration: column.duration, animationDelay: column.delay }}
            />
          </div>
        ))}
      </div>

      {/* keep the center readable; let the system show at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,color-mix(in_srgb,var(--bg)_72%,transparent),transparent_85%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--bg),transparent)]" />
    </div>
  )
}
