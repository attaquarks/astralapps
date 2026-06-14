import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type RevealOptions = {
  /** elements to reveal within the scope (default: any [data-reveal]) */
  selector?: string
  y?: number
  stagger?: number
  /** ScrollTrigger start position */
  start?: string
  duration?: number
}

/*
 * Single source of truth for the "fade + rise on scroll" reveal used by every
 * section. Replaces the GSAP/ScrollTrigger/reduced-motion boilerplate that was
 * copy-pasted across all of them. Returns a ref to attach to the section.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options: RevealOptions = {}) {
  const { selector = '[data-reveal]', y = 32, stagger = 0.1, start = 'top 78%', duration = 0.8 } =
    options
  const scope = useRef<T>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const targets = root.querySelectorAll<HTMLElement>(selector)
      if (!targets.length) return

      if (prefersReducedMotion) {
        gsap.set(targets, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.from(targets, {
        autoAlpha: 0,
        y,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: 'play none none reverse',
        },
      })
    },
    { dependencies: [prefersReducedMotion], revertOnUpdate: true, scope },
  )

  return scope
}
