import { useEffect, useState } from 'react'
import { Header } from './components/layout/Header'
import { AboutSection } from './components/sections/AboutSection'
import { ContactSection } from './components/sections/ContactSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProcessSection } from './components/sections/ProcessSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { ServicesSection } from './components/sections/ServicesSection'

export type ThemeMode = 'dark' | 'light'

function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header theme={theme} onThemeChange={setTheme} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
