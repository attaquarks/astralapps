import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { cueBus } from '../../lib/cueBus'
import { startDecode } from '../../lib/decode'
import { getLenis } from '../../lib/lenis'

const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*
 * Intro curtain: full black, the mark and a decode-animated wordmark centered,
 * a very small scroll cue at the bottom right. The visitor's first viewport of
 * scroll lifts the curtain away (scrubbed) and reveals the site underneath —
 * the curtain's inner layer lags for depth. Lift progress is written to the
 * chart bus so the fixed chrome (header, rail) can gate on it.
 */
export function IntroCurtain() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (reduced || !rootRef.current) return

      const cleanupDecode = startDecode(rootRef.current, {
        duration: 1700,
        stagger: 140,
        scrambleLength: 10,
      })

      gsap.from('[data-curtain-mark]', { autoAlpha: 0, scale: 0.92, duration: 1.1, ease: 'power3.out' })
      gsap.from('[data-curtain-caption]', { autoAlpha: 0, y: 10, duration: 0.9, delay: 0.7, ease: 'power3.out' })

      const st = ScrollTrigger.create({
        start: 0,
        end: () => window.innerHeight,
        scrub: 0.6,
        onUpdate: (self) => {
          cueBus.setLift(self.progress)
        },
      })

      gsap
        .timeline({ scrollTrigger: st })
        .to(rootRef.current, { yPercent: -100, ease: 'power2.in' }, 0)
        .to('[data-curtain-inner]', { yPercent: 26, ease: 'power2.in' }, 0)
        .to('[data-curtain-inner]', { autoAlpha: 0, ease: 'power1.in' }, 0.55)

      return () => cleanupDecode()
    },
    { scope: rootRef },
  )

  if (reduced) return null

  const advance = () => {
    const target = window.innerHeight * 1.15
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(target)
    else window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <div ref={rootRef} className="curtain" aria-hidden="true">
      <div
        data-curtain-inner
        className="flex h-full w-full flex-col items-center justify-center gap-7 px-6"
      >
        <img
          data-curtain-mark
          src="/favicon.svg"
          alt=""
          width={96}
          height={92}
          className="h-24 w-auto"
        />
        <div role="text" aria-label="AstralApps" className="text-center">
          <p
            data-decode
            className="font-display text-[clamp(2.4rem,7vw,4.4rem)] font-semibold uppercase leading-none tracking-[0.14em] text-heading"
          >
            Astral<span className="text-brand">Apps</span>
          </p>
        </div>
        <p data-curtain-caption className="max-w-xs text-center text-sm leading-6 text-muted">
          AI automation studio — every tool on this page runs live.
        </p>
      </div>

      <button
        type="button"
        data-curtain-cue
        onClick={advance}
        tabIndex={-1}
        className="absolute bottom-6 right-6 flex flex-col items-center gap-2 text-brand transition-opacity hover:opacity-80"
      >
        <span className="cue-code text-[0.58rem] tracking-[0.3em] text-muted">Scroll</span>
        <svg className="scroll-cue-chevron size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="h-7 w-px bg-border-strong" aria-hidden="true" />
      </button>
    </div>
  )
}
