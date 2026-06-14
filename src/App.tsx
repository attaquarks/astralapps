import { useEffect, useState } from 'react'
import { IndustryProvider } from './context/IndustryContext'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { MetricsStrip } from './components/sections/MetricsStrip'
import { BeforeAfterSection } from './components/sections/BeforeAfterSection'
import { GraveyardSection } from './components/sections/GraveyardSection'
import { TimelineSection } from './components/sections/TimelineSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { BusinessAuditSection } from './components/sections/BusinessAuditSection'
import { WorkSection } from './components/sections/WorkSection'
import { TechMarquee } from './components/sections/TechMarquee'
import { ProcessSection } from './components/sections/ProcessSection'
import { RoiSection } from './components/sections/RoiSection'
import { PricingSection } from './components/sections/PricingSection'
import { BlueprintWizardSection } from './components/sections/BlueprintWizardSection'
import { FaqSection } from './components/sections/FaqSection'
import { RefusalSection } from './components/sections/RefusalSection'
import { ContactSection } from './components/sections/ContactSection'

export type ThemeMode = 'dark' | 'light'

/* Read the theme the pre-paint script in index.html already resolved (light default). */
function getInitialTheme(): ThemeMode {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('astral-theme', theme)
    } catch {
      /* storage unavailable — non-fatal */
    }
  }, [theme])

  return (
    <IndustryProvider>
      <div className="relative min-h-screen text-text">
        <Header theme={theme} onThemeChange={setTheme} />
        <main>
          {/* Hook — the site is the demo */}
          <HeroSection />
          <MetricsStrip />
          {/* Story */}
          <BeforeAfterSection />
          <GraveyardSection />
          <TimelineSection />
          {/* Capability + interactive proof */}
          <ServicesSection />
          <BusinessAuditSection />
          <WorkSection />
          <TechMarquee />
          <ProcessSection />
          {/* Conversion */}
          <RoiSection />
          <PricingSection />
          <BlueprintWizardSection />
          {/* Trust + close */}
          <FaqSection />
          <RefusalSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </IndustryProvider>
  )
}

export default App
