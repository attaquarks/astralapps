/*
 * Text decode/scramble reveal — ported from the pinned ThreeUI
 * articleHeadingDecode source (MIT, MengTo/threeui @ 3265804) with the motion
 * language preserved: an ease-out reveal budget, a live scramble head, and a
 * sparse tail flicker, resolved per text node. Reduced motion: no-op.
 */

export const DECODE_POOL = "#%&@$/\\<>*+=~ABCDEFGHKMNPRSTUVWXYZ0123456789"

export type DecodeOptions = {
  duration: number
  stagger: number
  scrambleLength: number
  preserveChance: number
  tailChance: number
}

export const DECODE_DEFAULTS: DecodeOptions = {
  duration: 1400,
  stagger: 90,
  scrambleLength: 8,
  preserveChance: 0.08,
  tailChance: 0.04,
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
const easeOut = (value: number) => 1 - Math.pow(1 - value, 2)

function decodeElement(element: HTMLElement, delay: number, options: DecodeOptions, originals: Map<Text, string>, frames: Set<number>) {
  const nodes: Array<{ node: Text; original: string }> = []
  const walk = (node: Node) => {
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE && child.textContent?.trim()) {
        const text = child as Text
        const original = text.textContent ?? ""
        originals.set(text, original)
        nodes.push({ node: text, original })
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child)
      }
    }
  }
  walk(element)

  const total = nodes.reduce((sum, node) => sum + node.original.length, 0)
  const start = performance.now() + delay
  const frame = (now: number) => {
    const progress = clamp((now - start) / Math.max(1, options.duration), 0, 1)
    if (now < start) {
      frames.add(requestAnimationFrame(frame))
      return
    }

    let budget = Math.floor(easeOut(progress) * total)
    for (const textNode of nodes) {
      const length = textNode.original.length
      const revealed = clamp(budget, 0, length)
      budget -= revealed
      if (revealed >= length) {
        textNode.node.textContent = textNode.original
        continue
      }

      let output = textNode.original.slice(0, revealed)
      const scrambleLength = Math.min(length - revealed, Math.round(options.scrambleLength))
      for (let index = 0; index < scrambleLength; index += 1) {
        const original = textNode.original[revealed + index]
        output +=
          original === " " || Math.random() < options.preserveChance
            ? original
            : DECODE_POOL[(Math.random() * DECODE_POOL.length) | 0]
      }
      output += textNode.original
        .slice(revealed + scrambleLength)
        .replace(/\S/g, (character) => (Math.random() < options.tailChance ? DECODE_POOL[(Math.random() * DECODE_POOL.length) | 0] : character))
      textNode.node.textContent = output
    }

    if (progress < 1) frames.add(requestAnimationFrame(frame))
  }
  frames.add(requestAnimationFrame(frame))
}

/** Decode every [data-decode] descendant. Returns a cleanup restoring originals. */
export function startDecode(root: HTMLElement, options: Partial<DecodeOptions> = {}): () => void {
  const opts = { ...DECODE_DEFAULTS, ...options }
  const frames = new Set<number>()
  const originals = new Map<Text, string>()
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (!reduced) {
    root.querySelectorAll<HTMLElement>("[data-decode]").forEach((element, index) => {
      decodeElement(element, index * opts.stagger, opts, originals, frames)
    })
  }

  return () => {
    frames.forEach(cancelAnimationFrame)
    originals.forEach((original, node) => {
      node.textContent = original
    })
  }
}
