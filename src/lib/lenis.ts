import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

/*
 * Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger and Lenis
 * share one clock. Skipped entirely under prefers-reduced-motion — native
 * scroll stays. The instance is a module singleton so header/footer/curtain
 * can scroll to anchors without prop drilling.
 */

let instance: Lenis | null = null

export function initLenis(): Lenis | null {
  if (instance || typeof window === 'undefined') return instance
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  instance = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    anchors: true,
  })

  instance.on('scroll', ScrollTrigger.update)
  const raf = (time: number) => instance?.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  return instance
}

export function getLenis(): Lenis | null {
  return instance
}

/** Scroll to an anchor id, through Lenis when active, natively otherwise. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset: -88 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
