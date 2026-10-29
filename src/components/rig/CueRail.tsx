import { useSyncExternalStore } from 'react'
import { CUES, cueBus, getCueState } from '../../lib/cueBus'

/*
 * The chart rail: a fixed instrument edge naming the current chapter. Deep
 * links (#hero, #proof, …) stay text-equivalent — every chapter is a real
 * anchor, and the active state is a punched mark plus printed name, never
 * color alone.
 */
export function CueRail() {
  const { cue } = useSyncExternalStore(cueBus.subscribe, getCueState)

  return (
    <nav
      aria-label="Star chart — chapters"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {CUES.map((entry) => {
        const active = entry.id === cue.id
        return (
          <a
            key={entry.id}
            href={`#${entry.id}`}
            aria-current={active ? 'true' : undefined}
            aria-label={`Chapter 0${entry.index} — ${entry.name}`}
            className="group flex items-center gap-3"
          >
            <span
              className={`cue-code text-[0.72rem] transition-colors ${
                active ? 'text-heading' : 'text-muted opacity-0 group-hover:opacity-100'
              }`}
            >
              {active ? entry.name : `0${entry.index}`}
            </span>
            <span
              aria-hidden="true"
              className={`grid size-3 place-items-center border transition-colors ${
                active ? 'border-heading' : 'border-border-strong group-hover:border-muted'
              }`}
            >
              {active && <span className="mark-punched size-1.5" />}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
