import { useSyncExternalStore } from 'react'
import { cueBus, getCueState } from '../../lib/cueBus'

/* Header instrument: the current chapter, read like a console display. */
export function CueReadout() {
  const { cue } = useSyncExternalStore(cueBus.subscribe, getCueState)

  return (
    <span className="data hidden items-center gap-2.5 text-xs uppercase tracking-[0.16em] text-muted md:inline-flex">
      <span aria-hidden="true" className="mark-punched size-1.5" />
      <span>
        CH 0{cue.index} · <span className="text-heading">{cue.name}</span>
      </span>
    </span>
  )
}
