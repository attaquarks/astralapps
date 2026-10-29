import { Suspense, lazy, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from './lib/gsap'
import { CUES, cueBus } from './lib/cueBus'
import { initLenis } from './lib/lenis'
import { IndustryProvider } from './context/IndustryContext'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { CueRail } from './components/rig/CueRail'
import { IntroCurtain } from './components/sections/IntroCurtain'
import { HeroCue } from './components/sections/HeroCue'
import { ConsoleCue } from './components/sections/ConsoleCue'
import { MeasuredWeekCue } from './components/sections/MeasuredWeekCue'
import { CapabilitiesCue } from './components/sections/CapabilitiesCue'
import { DeliveryCue } from './components/sections/DeliveryCue'
import { CloseCue } from './components/sections/CloseCue'

const FieldScene = lazy(() => import('./components/three/FieldScene'))

/*
 * The star chart: six named chapters, tracked by ScrollTriggers that write the
 * current chapter and overall progress to the chart bus. The rail, the header
 * readout, and the constellation field subscribe — scroll updates never
 * re-render content. Lenis drives smooth scroll on the GSAP clock; the field
 * is one persistent fixed scene behind every section.
 */
function App() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      initLenis()

      CUES.forEach((cue) => {
        const section = document.getElementById(cue.id)
        if (!section) return
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => cueBus.setCue(cue),
          onEnterBack: () => cueBus.setCue(cue),
        })
      })

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => cueBus.setProgress(self.progress),
      })
    },
    { scope: rootRef },
  )

  return (
    <IndustryProvider>
      <div ref={rootRef} className="min-h-screen text-text">
        {/* The persistent field: the scene paints its own ground; a reading
            vignette keeps text legible over the stars. */}
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
          <Suspense fallback={null}>
            <FieldScene />
          </Suspense>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(5,4,9,0.55) 0%, rgba(5,4,9,0) 24%, rgba(5,4,9,0) 70%, rgba(5,4,9,0.7) 100%)',
            }}
          />
        </div>
        <div className="grain" aria-hidden="true" />

        <Header />
        <CueRail />
        <main className="relative z-10">
          <HeroCue />
          <ConsoleCue />
          <MeasuredWeekCue />
          <CapabilitiesCue />
          <DeliveryCue />
          <CloseCue />
        </main>
        <Footer />

        <IntroCurtain />
      </div>
    </IndustryProvider>
  )
}

export default App
