/*
 * Chart bus — the single source of truth for the star chart's current state.
 * ScrollTriggers in App write to it; the chapter rail, header readout, and the
 * constellation field subscribe. Kept outside React state so scroll updates
 * never re-render the page tree.
 */

export type Cue = {
  /** section anchor id, e.g. "hero" */
  id: string
  /** 1-based chart position, e.g. 1 */
  index: number
  /** state name shown in the readout, e.g. "DARK SKY" */
  name: string
}

export const CUES: Cue[] = [
  { id: 'hero', index: 1, name: 'DARK SKY' },
  { id: 'proof', index: 2, name: 'FIRST SIGNAL' },
  { id: 'measured', index: 3, name: 'STAR CHART' },
  { id: 'services', index: 4, name: 'CONSTELLATION' },
  { id: 'work', index: 5, name: 'ORBIT' },
  { id: 'contact', index: 6, name: 'CONTACT' },
]

type CueState = {
  cue: Cue
  /** overall progress through the chart, 0..1 — drives link formation */
  progress: number
  /** intro curtain lift, 0..1 — gates the fixed chrome until first scroll */
  lift: number
}

let state: CueState = { cue: CUES[0], progress: 0, lift: 0 }
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

export const cueBus = {
  get: () => state,
  setCue(cue: Cue) {
    if (state.cue.id === cue.id) return
    state = { ...state, cue }
    emit()
  },
  setProgress(progress: number) {
    const next = Math.min(1, Math.max(0, progress))
    if (Math.abs(next - state.progress) < 0.001) return
    state = { ...state, progress: next }
    emit()
  },
  setLift(lift: number) {
    const next = Math.min(1, Math.max(0, lift))
    const settled = next === 0 || next === 1
    if (!settled && Math.abs(next - state.lift) < 0.01) return
    state = { ...state, lift: next }
    emit()
  },
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}

/** Snapshot factory for useSyncExternalStore. */
export function getCueState(): CueState {
  return state
}
